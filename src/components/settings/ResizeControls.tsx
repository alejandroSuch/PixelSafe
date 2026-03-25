import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ResizeConfig, ResizeMode } from '../../types/settings.types';
import { useImages } from '../../context/ImageContext';

interface Props {
  value: ResizeConfig | null;
  onChange: (value: ResizeConfig | null) => void;
}

const MODES: ResizeMode[] = ['width', 'height', 'percentage', 'maxDimension'];

export function ResizeControls({ value, onChange }: Props) {
  const { t } = useTranslation();
  const { images } = useImages();
  const enabled = value !== null;

  const { maxWidth, maxHeight, maxDim } = useMemo(() => {
    if (images.length === 0) return { maxWidth: 1920, maxHeight: 1080, maxDim: 1920 };
    return {
      maxWidth: Math.max(...images.map((img) => img.width)),
      maxHeight: Math.max(...images.map((img) => img.height)),
      maxDim: Math.max(...images.map((img) => Math.max(img.width, img.height))),
    };
  }, [images]);

  const toggle = () => {
    onChange(enabled ? null : { mode: 'maxDimension', value: maxDim, maintainAspectRatio: true });
  };

  const update = (partial: Partial<ResizeConfig>) => {
    if (!value) return;
    onChange({ ...value, ...partial });
  };

  const isPercentage = value?.mode === 'percentage';
  const showSecondary = (value?.mode === 'width' || value?.mode === 'height') && !value?.maintainAspectRatio;
  const unit = isPercentage ? t('settings.percent') : t('settings.pixels');
  const minValue = 1;
  const maxValue = isPercentage ? 100 : undefined;
  const primaryLabel = value?.mode === 'width' ? t('settings.width') : value?.mode === 'height' ? t('settings.height') : t('settings.value');
  const secondaryLabel = value?.mode === 'width' ? t('settings.height') : t('settings.width');

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
        <input type="checkbox" checked={enabled} onChange={toggle} className="accent-indigo-600" />
        {t('settings.resizeEnabled')}
      </label>
      {enabled && value && (
        <div className="space-y-2 pl-5">
          <div>
            <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">{t('settings.mode')}</label>
            <select
              value={value.mode}
              onChange={(e) => {
                const mode = e.target.value as ResizeMode;
                let newValue: number;
                if (mode === 'percentage') {
                  newValue = value.mode === 'percentage' ? value.value : 100;
                  newValue = Math.min(newValue, 100);
                } else if (mode === 'width') {
                  newValue = maxWidth;
                } else if (mode === 'height') {
                  newValue = maxHeight;
                } else {
                  newValue = maxDim;
                }
                update({ mode, value: newValue });
              }}
              className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            >
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {t(`settings.modes.${m}`)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
              {primaryLabel} ({unit})
            </label>
            <input
              type="number"
              min={minValue}
              max={maxValue}
              value={value.value}
              onChange={(e) => {
                let v = parseInt(e.target.value) || minValue;
                v = Math.max(minValue, v);
                if (maxValue) v = Math.min(maxValue, v);
                update({ value: v });
              }}
              className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          {showSecondary && (
            <div>
              <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                {secondaryLabel} ({t('settings.pixels')})
              </label>
              <input
                type="number"
                min={1}
                value={value.secondaryValue ?? ''}
                placeholder={t('settings.auto')}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  update({ secondaryValue: isNaN(v) ? undefined : Math.max(1, v) });
                }}
                className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
          )}
          {value.mode !== 'percentage' && (
            <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <input
                type="checkbox"
                checked={value.maintainAspectRatio}
                onChange={(e) => update({ maintainAspectRatio: e.target.checked })}
                className="accent-indigo-600"
              />
              {t('settings.maintainAspectRatio')}
            </label>
          )}
        </div>
      )}
    </div>
  );
}
