import { useTranslation } from 'react-i18next';

export function GlobalDropOverlay() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-600/20 backdrop-blur-sm">
      <div className="rounded-2xl border-2 border-dashed border-indigo-500 bg-white/90 px-12 py-10 text-center shadow-xl dark:bg-gray-800/90">
        <div className="text-5xl">📁</div>
        <p className="mt-3 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          {t('dropzone.title')}
        </p>
      </div>
    </div>
  );
}
