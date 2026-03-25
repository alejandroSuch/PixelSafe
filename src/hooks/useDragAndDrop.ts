import { useCallback, useState } from 'react';
import { useImages } from '../context/ImageContext';
import { ACCEPTED_TYPES } from '../utils/constants';
import { generateId } from '../utils/file.utils';
import { isAnimatedGif, getImageDimensions } from '../utils/image.utils';
import type { ImageFile } from '../types/image.types';

export function useDragAndDrop() {
  const { images, dispatch, notifySkipped } = useImages();
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const validFiles = Array.from(files).filter((f) => ACCEPTED_TYPES.includes(f.type));
      if (validFiles.length === 0) return;

      const imageFiles: ImageFile[] = [];
      let skipped = 0;

      for (const file of validFiles) {
        const isHeic = file.type === 'image/heic' || file.type === 'image/heif';
        const animated = await isAnimatedGif(file);

        let width = 0;
        let height = 0;
        let heicFailed = false;

        try {
          const dims = await getImageDimensions(file);
          width = dims.width;
          height = dims.height;
        } catch {
          if (isHeic) {
            heicFailed = true;
          } else {
            continue;
          }
        }

        // Duplicate detection: same name + same size + same dimensions
        const isDuplicate = images.some(
          (img) => img.original.name === file.name && img.originalSize === file.size && img.width === width && img.height === height,
        );
        if (isDuplicate) {
          skipped++;
          continue;
        }

        const hasError = animated || heicFailed;
        const errorKey = animated ? 'animated_gif_not_supported' : heicFailed ? 'heicNotSupported' : undefined;

        imageFiles.push({
          id: generateId(),
          original: file,
          preview: heicFailed ? '' : URL.createObjectURL(file),
          originalSize: file.size,
          width,
          height,
          status: hasError ? 'error' : 'pending',
          progress: 0,
          isAnimatedGif: animated,
          error: errorKey,
        });
      }

      if (imageFiles.length > 0) {
        dispatch({ type: 'ADD', payload: imageFiles });
      }

      if (skipped > 0) {
        notifySkipped(skipped);
      }
    },
    [dispatch, images, notifySkipped],
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  return { isDragging, addFiles, onDragOver, onDragLeave, onDrop };
}
