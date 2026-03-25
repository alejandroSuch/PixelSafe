import { useTranslation } from 'react-i18next';

export function SavingsBadge({ percent }: { percent: number }) {
  const { t } = useTranslation();

  return (
    <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-medium text-white shadow">
      {t('images.savings', { percent })}
    </span>
  );
}
