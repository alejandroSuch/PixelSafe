import { useTranslation } from 'react-i18next';
import { useFormatSupport } from '../../hooks/useFormatSupport';
import { useImages } from '../../context/ImageContext';
import type { OutputFormat } from '../../types/image.types';
import { OUTPUT_FORMATS } from '../../utils/constants';

interface Props {
  value: OutputFormat;
  onChange: (value: OutputFormat) => void;
}

export function FormatSelector({ value, onChange }: Props) {
  const { t } = useTranslation();
  const supported = useFormatSupport();
  const { images } = useImages();

  const hasPngWithTransparency = images.some((img) => img.original.type === 'image/png');
  const showTransparencyWarning = hasPngWithTransparency && value === 'image/jpeg';

  return (
    <div>
      <label className="mb-1 block text-xs text-gray-600 dark:text-gray-400">{t('settings.format')}</label>
      <div className="flex gap-2" role="radiogroup" aria-label={t('settings.format')}>
        {OUTPUT_FORMATS.filter((f) => supported.includes(f.value)).map((f) => (
          <button
            key={f.value}
            role="radio"
            aria-checked={value === f.value}
            onClick={() => onChange(f.value)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              value === f.value
                ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {showTransparencyWarning && (
        <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400" role="status">
          {t('settings.transparencyWarning')}
        </p>
      )}
    </div>
  );
}
