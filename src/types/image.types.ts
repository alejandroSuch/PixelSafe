export interface ImageFile {
  id: string;
  original: File;
  preview: string;
  originalSize: number;
  width: number;
  height: number;
  status: 'pending' | 'processing' | 'done' | 'error';
  progress: number;
  result?: ProcessedImage;
  error?: string;
  isAnimatedGif: boolean;
}

export interface ProcessedImage {
  blob: Blob;
  url: string;
  size: number;
  width: number;
  height: number;
  format: OutputFormat;
}

export type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';
