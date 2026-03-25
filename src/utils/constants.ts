import type { OutputFormat } from '../types/image.types';
import type { OptimizationSettings } from '../types/settings.types';

export const MAX_MEGAPIXELS = 20;
export const MAX_PIXEL_COUNT = MAX_MEGAPIXELS * 1_000_000;

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];
export const ACCEPTED_EXTENSIONS = '.jpg,.jpeg,.png,.webp,.gif,.heic,.heif';

export const OUTPUT_FORMATS: { label: string; value: OutputFormat }[] = [
  { label: 'JPEG', value: 'image/jpeg' },
  { label: 'PNG', value: 'image/png' },
  { label: 'WebP', value: 'image/webp' },
];

export const DEFAULT_SETTINGS: OptimizationSettings = {
  quality: 0.8,
  format: 'image/jpeg',
  resize: null,
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'de', label: 'Deutsch' },
  { code: 'cs', label: 'Čeština' },
] as const;
