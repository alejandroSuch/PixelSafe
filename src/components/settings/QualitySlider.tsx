import { useTranslation } from 'react-i18next';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export function QualitySlider({ value, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <div>
      <label className="mb-1 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span>{t('settings.quality')}</span>
        <span className="font-medium">{Math.round(value * 100)}%</span>
      </label>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </div>
  );
}
