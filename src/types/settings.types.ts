import type { OutputFormat } from './image.types';

export interface OptimizationSettings {
  quality: number;
  format: OutputFormat;
  resize: ResizeConfig | null;
}

export type ResizeMode = 'width' | 'height' | 'percentage' | 'maxDimension';

export interface ResizeConfig {
  mode: ResizeMode;
  value: number;
  secondaryValue?: number;
  maintainAspectRatio: boolean;
}
