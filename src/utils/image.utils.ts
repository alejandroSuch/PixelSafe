import type { ResizeConfig } from '../types/settings.types';
import { MAX_PIXEL_COUNT } from './constants';

export function isImageTooLarge(width: number, height: number): boolean {
  return width * height > MAX_PIXEL_COUNT;
}

export function computeDimensions(
  srcWidth: number,
  srcHeight: number,
  config: ResizeConfig | null,
): { width: number; height: number } {
  if (!config) return { width: srcWidth, height: srcHeight };

  const aspectRatio = srcWidth / srcHeight;

  switch (config.mode) {
    case 'width': {
      const w = Math.round(config.value);
      const h = config.maintainAspectRatio ? Math.round(w / aspectRatio) : Math.round(config.secondaryValue ?? srcHeight);
      return { width: w, height: h };
    }
    case 'height': {
      const h = Math.round(config.value);
      const w = config.maintainAspectRatio ? Math.round(h * aspectRatio) : Math.round(config.secondaryValue ?? srcWidth);
      return { width: w, height: h };
    }
    case 'percentage': {
      const scale = config.value / 100;
      return { width: Math.round(srcWidth * scale), height: Math.round(srcHeight * scale) };
    }
    case 'maxDimension': {
      const max = config.value;
      if (srcWidth <= max && srcHeight <= max) return { width: srcWidth, height: srcHeight };
      if (srcWidth >= srcHeight) {
        return { width: max, height: Math.round(max / aspectRatio) };
      }
      return { width: Math.round(max * aspectRatio), height: max };
    }
  }
}

const GIF_HEADER = [0x47, 0x49, 0x46]; // "GIF"

export async function isAnimatedGif(file: File): Promise<boolean> {
  if (file.type !== 'image/gif') return false;

  const buffer = await file.slice(0, Math.min(file.size, 1024 * 1024)).arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // Check GIF header
  if (bytes[0] !== GIF_HEADER[0] || bytes[1] !== GIF_HEADER[1] || bytes[2] !== GIF_HEADER[2]) {
    return false;
  }

  // Count graphic control extension blocks — more than 1 means animated
  let frameCount = 0;
  for (let i = 0; i < bytes.length - 3; i++) {
    if (bytes[i] === 0x00 && bytes[i + 1] === 0x21 && bytes[i + 2] === 0xf9) {
      frameCount++;
      if (frameCount > 1) return true;
    }
  }
  return false;
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}
