import { useTranslation } from 'react-i18next';
import { BuyMeACoffee } from '../common/BuyMeACoffee';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-500 dark:text-gray-400 sm:flex-row">
        <p>{t('privacy.description')}</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/alejandroSuch/PixelSafe"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 dark:hover:text-gray-200"
          >
            {t('footer.github')}
          </a>
          <BuyMeACoffee />
        </div>
      </div>
    </footer>
  );
}
