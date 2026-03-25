export function generateId(): string {
  return crypto.randomUUID();
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function getExtension(format: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };
  return map[format] ?? 'bin';
}

export function getOutputFilename(originalName: string, format: string): string {
  const baseName = originalName.replace(/\.[^.]+$/, '');
  return `${baseName}.${getExtension(format)}`;
}

export function savingsPercent(original: number, optimized: number): number {
  if (original === 0) return 0;
  return Math.round(((original - optimized) / original) * 100);
}
