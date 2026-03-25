import { useTranslation } from 'react-i18next';
import { useSettings } from '../../context/SettingsContext';
import { QualitySlider } from './QualitySlider';
import { FormatSelector } from './FormatSelector';
import { ResizeControls } from './ResizeControls';

export function SettingsPanel() {
  const { t } = useTranslation();
  const { settings, updateSettings } = useSettings();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-sm font-semibold text-gray-800 dark:text-gray-200">{t('settings.title')}</h2>
      <div className="space-y-4">
        <QualitySlider
          value={settings.quality}
          onChange={(quality) => updateSettings({ quality })}
        />
        <FormatSelector
          value={settings.format}
          onChange={(format) => updateSettings({ format })}
        />
        <ResizeControls
          value={settings.resize}
          onChange={(resize) => updateSettings({ resize })}
        />
      </div>
    </div>
  );
}
