import type { OutputFormat } from './image.types';
import type { ResizeConfig } from './settings.types';

export interface WorkerRequest {
  id: string;
  file: File;
  quality: number;
  format: OutputFormat;
  resize: ResizeConfig | null;
}

export interface WorkerResponse {
  id: string;
  success: boolean;
  blob?: Blob;
  width?: number;
  height?: number;
  error?: string;
}
