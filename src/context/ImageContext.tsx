import { createContext, useCallback, useContext, useReducer, useRef, useState, type ReactNode, type Dispatch } from 'react';
import { imageReducer, type ImageAction } from './imageReducer';
import type { ImageFile } from '../types/image.types';

interface ImageContextValue {
  images: ImageFile[];
  dispatch: Dispatch<ImageAction>;
  skippedCount: number;
  notifySkipped: (count: number) => void;
}

const ImageContext = createContext<ImageContextValue | null>(null);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, dispatch] = useReducer(imageReducer, []);
  const [skippedCount, setSkippedCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const notifySkipped = useCallback((count: number) => {
    clearTimeout(timerRef.current);
    setSkippedCount(count);
    timerRef.current = setTimeout(() => setSkippedCount(0), 3000);
  }, []);

  return (
    <ImageContext.Provider value={{ images, dispatch, skippedCount, notifySkipped }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const ctx = useContext(ImageContext);
  if (!ctx) throw new Error('useImages must be used within ImageProvider');
  return ctx;
}
