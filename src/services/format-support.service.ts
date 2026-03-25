import type { OutputFormat } from '../types/image.types';

const cache = new Map<OutputFormat, boolean>();

export async function isFormatSupported(format: OutputFormat): Promise<boolean> {
  if (cache.has(format)) return cache.get(format)!;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, format, 0.5);
  });

  const supported = blob !== null && blob.type === format;
  cache.set(format, supported);
  return supported;
}

export async function getSupportedFormats(): Promise<OutputFormat[]> {
  const formats: OutputFormat[] = ['image/jpeg', 'image/png', 'image/webp'];
  const results = await Promise.all(formats.map((f) => isFormatSupported(f).then((ok) => (ok ? f : null))));
  return results.filter((f): f is OutputFormat => f !== null);
}
