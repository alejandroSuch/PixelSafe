import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useImages } from '../../context/ImageContext';
import { ACCEPTED_EXTENSIONS } from '../../utils/constants';
import { DropOverlay } from './DropOverlay';

export function DropZone() {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDragging, addFiles, onDragOver, onDragLeave, onDrop } = useDragAndDrop();
  const { skippedCount } = useImages();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="relative">
      <div
        role="button"
        tabIndex={0}
        aria-label={t('dropzone.title')}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={handleKeyDown}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
            : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
        }`}
      >
        {isDragging && <DropOverlay />}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          multiple
          onChange={handleChange}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="space-y-2">
          <div className="text-4xl text-gray-400" aria-hidden="true">📁</div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">{t('dropzone.title')}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('dropzone.subtitle')}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{t('dropzone.formats')}</p>
        </div>
      </div>

      {skippedCount > 0 && (
        <p className="mt-2 text-center text-xs text-amber-600 dark:text-amber-400 animate-fade-in-out">
          {t('dropzone.duplicatesSkipped', { count: skippedCount })}
        </p>
      )}
    </div>
  );
}
