import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeToggle } from '../common/ThemeToggle';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="PixelSafe" className="h-9 w-9" />
          <div>
            <h1 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{t('app.title')}</h1>
            <p className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">{t('app.tagline')}</p>
          </div>
          <span className="hidden rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-400 sm:inline-flex">
            {t('privacy.badge')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
