import type { WorkerRequest, WorkerResponse } from '../types/worker.types';
import type { OptimizationSettings } from '../types/settings.types';
import type { ImageFile, ProcessedImage } from '../types/image.types';
import { computeDimensions } from '../utils/image.utils';

type OnProgress = (id: string, status: ImageFile['status'], result?: ProcessedImage, error?: string) => void;

let worker: Worker | null = null;

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('../workers/image-processor.worker.ts', import.meta.url), { type: 'module' });
  }
  return worker;
}

function supportsOffscreenCanvas(): boolean {
  return typeof OffscreenCanvas !== 'undefined';
}

async function processInMainThread(request: WorkerRequest): Promise<WorkerResponse> {
  try {
    const bitmap = await createImageBitmap(request.file);
    const { width, height } = computeDimensions(bitmap.width, bitmap.height, request.resize);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, request.format, request.quality);
    });

    if (!blob) throw new Error('Failed to encode image');

    return { id: request.id, success: true, blob, width, height };
  } catch (err) {
    return { id: request.id, success: false, error: (err as Error).message };
  }
}

function processInWorker(request: WorkerRequest): Promise<WorkerResponse> {
  return new Promise((resolve) => {
    const w = getWorker();
    const handler = (e: MessageEvent<WorkerResponse>) => {
      if (e.data.id === request.id) {
        w.removeEventListener('message', handler);
        resolve(e.data);
      }
    };
    w.addEventListener('message', handler);
    w.postMessage(request);
  });
}

export async function processQueue(
  images: ImageFile[],
  settings: OptimizationSettings,
  onProgress: OnProgress,
  signal?: AbortSignal,
): Promise<void> {
  const processable = images.filter((img) => img.status === 'pending' && !img.isAnimatedGif);
  const useWorker = supportsOffscreenCanvas();

  for (const img of processable) {
    if (signal?.aborted) break;

    onProgress(img.id, 'processing');

    const request: WorkerRequest = {
      id: img.id,
      file: img.original,
      quality: settings.quality,
      format: settings.format,
      resize: settings.resize,
    };

    const response = useWorker ? await processInWorker(request) : await processInMainThread(request);

    if (response.success && response.blob) {
      // Keep original if optimized version is larger
      const keepOriginal = response.blob.size >= img.originalSize;
      const finalBlob = keepOriginal ? img.original : response.blob;
      const url = URL.createObjectURL(finalBlob);
      onProgress(img.id, 'done', {
        blob: finalBlob,
        url,
        size: finalBlob.size,
        width: keepOriginal ? img.width : response.width!,
        height: keepOriginal ? img.height : response.height!,
        format: keepOriginal ? (img.original.type as typeof settings.format) : settings.format,
      });
    } else {
      onProgress(img.id, 'error', undefined, response.error ?? 'Unknown error');
    }
  }
}
