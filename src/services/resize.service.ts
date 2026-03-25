import type { ResizeConfig } from '../types/settings.types';
import { computeDimensions } from '../utils/image.utils';

export function calculateTargetDimensions(
  srcWidth: number,
  srcHeight: number,
  config: ResizeConfig | null,
): { width: number; height: number } {
  return computeDimensions(srcWidth, srcHeight, config);
}
