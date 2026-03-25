import { useTranslation } from 'react-i18next';
import type { ImageFile } from '../../types/image.types';
import { formatBytes, savingsPercent } from '../../utils/file.utils';
import { useImages } from '../../context/ImageContext';
import { downloadSingle } from '../../services/download.service';
import { ProgressBar } from '../ui/ProgressBar';

interface Props {
  image: ImageFile;
}

export function ImageCard({ image }: Props) {
  const { t } = useTranslation();
  const { dispatch } = useImages();

  const savings = image.result ? savingsPercent(image.originalSize, image.result.size) : 0;
  const alreadyOptimal = image.status === 'done' && image.result && savings <= 0;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
        <img
          src={image.result?.url ?? image.preview}
          alt={image.original.name}
          className="h-full w-full object-contain"
        />
        {image.status === 'done' && savings > 0 && (
          <div className="absolute right-2 top-2">
            <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-medium text-white shadow">
              {t('images.savings', { percent: savings })}
            </span>
          </div>
        )}
        {alreadyOptimal && (
          <div className="absolute right-2 top-2">
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white shadow">
              {t('images.alreadyOptimal')}
            </span>
          </div>
        )}
      </div>
      <div className="space-y-2 p-3">
        <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200" title={image.original.name}>
          {image.original.name}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{formatBytes(image.originalSize)}</span>
          <span>{t('images.dimensions', { width: image.width, height: image.height })}</span>
        </div>

        {image.status === 'processing' && <ProgressBar />}

        {image.status === 'done' && image.result && (
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-green-600 dark:text-green-400">
              {alreadyOptimal ? t('images.keptOriginal') : formatBytes(image.result.size)}
            </span>
            <button
              onClick={() => downloadSingle(image)}
              className="rounded bg-indigo-600 px-2 py-1 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              aria-label={`${t('actions.download')} ${image.original.name}`}
            >
              {t('actions.download')}
            </button>
          </div>
        )}

        {image.status === 'error' && (
          <p className="text-xs text-red-500 dark:text-red-400" role="alert">
            {image.error ? t(`errors.${image.error}`, { defaultValue: image.error }) : t('errors.processingFailed')}
          </p>
        )}

        <button
          onClick={() => dispatch({ type: 'REMOVE', payload: image.id })}
          className="w-full text-center text-xs text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
          aria-label={`${t('actions.remove')} ${image.original.name}`}
        >
          {t('actions.remove')}
        </button>
      </div>
    </div>
  );
}
