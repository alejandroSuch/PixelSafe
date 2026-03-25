import { useTranslation } from 'react-i18next';

export function BuyMeACoffee() {
  const { t } = useTranslation();

  return (
    <a
      href="https://buymeacoffee.com/alejandrosuch"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-400"
    >
      <span aria-hidden="true">☕</span>
      <span>{t('footer.buyMeACoffee')}</span>
    </a>
  );
}
