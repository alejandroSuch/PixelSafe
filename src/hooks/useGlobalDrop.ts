import { useCallback, useEffect, useState } from 'react';
import { useDragAndDrop } from './useDragAndDrop';

export function useGlobalDrop() {
  const { addFiles } = useDragAndDrop();
  const [isGlobalDragging, setIsGlobalDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const onDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragCounter((c) => c + 1);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragCounter((c) => c - 1);
  }, []);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragCounter(0);
      if (e.dataTransfer?.files) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles],
  );

  useEffect(() => {
    setIsGlobalDragging(dragCounter > 0);
  }, [dragCounter]);

  useEffect(() => {
    window.addEventListener('dragenter', onDragEnter);
    window.addEventListener('dragleave', onDragLeave);
    window.addEventListener('dragover', onDragOver);
    window.addEventListener('drop', onDrop);
    return () => {
      window.removeEventListener('dragenter', onDragEnter);
      window.removeEventListener('dragleave', onDragLeave);
      window.removeEventListener('dragover', onDragOver);
      window.removeEventListener('drop', onDrop);
    };
  }, [onDragEnter, onDragLeave, onDragOver, onDrop]);

  return { isGlobalDragging };
}
