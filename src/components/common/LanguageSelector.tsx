import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../../utils/constants';

export function LanguageSelector() {
  const { t, i18n } = useTranslation();

  return (
    <select
      value={i18n.language?.split('-')[0] ?? 'en'}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      aria-label={t('settings.language')}
      className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
