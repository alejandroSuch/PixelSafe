import { computeDimensions } from '../utils/image.utils';
import type { WorkerRequest, WorkerResponse } from '../types/worker.types';

self.addEventListener('message', async (e: MessageEvent<WorkerRequest>) => {
  const { id, file, quality, format, resize } = e.data;

  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = computeDimensions(bitmap.width, bitmap.height, resize);

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await canvas.convertToBlob({ type: format, quality });

    const response: WorkerResponse = { id, success: true, blob, width, height };
    self.postMessage(response);
  } catch (err) {
    const response: WorkerResponse = { id, success: false, error: (err as Error).message };
    self.postMessage(response);
  }
});
