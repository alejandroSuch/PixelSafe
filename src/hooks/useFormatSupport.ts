import { useEffect, useState } from 'react';
import type { OutputFormat } from '../types/image.types';
import { getSupportedFormats } from '../services/format-support.service';

export function useFormatSupport() {
  const [formats, setFormats] = useState<OutputFormat[]>(['image/jpeg', 'image/png']);

  useEffect(() => {
    getSupportedFormats().then(setFormats);
  }, []);

  return formats;
}
