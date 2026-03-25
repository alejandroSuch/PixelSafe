import { useCallback, useRef, useState } from 'react';
import { useImages } from '../context/ImageContext';
import { useSettings } from '../context/SettingsContext';
import { processQueue } from '../services/image-processor.service';

export function useImageProcessor() {
  const { images, dispatch } = useImages();
  const { settings } = useSettings();
  const [isProcessing, setIsProcessing] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const process = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    abortRef.current = new AbortController();

    dispatch({ type: 'RESET_STATUS' });

    await processQueue(
      images.map((img) => (img.isAnimatedGif ? img : { ...img, status: 'pending' as const })),
      settings,
      (id, status, result, error) => {
        dispatch({ type: 'UPDATE_STATUS', payload: { id, status, result, error } });
      },
      abortRef.current.signal,
    );

    setIsProcessing(false);
  }, [images, settings, dispatch, isProcessing]);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setIsProcessing(false);
  }, []);

  return { isProcessing, process, cancel };
}
