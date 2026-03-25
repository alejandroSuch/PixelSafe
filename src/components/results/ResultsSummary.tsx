import { useTranslation } from 'react-i18next';
import { useImages } from '../../context/ImageContext';
import { formatBytes, savingsPercent } from '../../utils/file.utils';

export function ResultsSummary() {
  const { t } = useTranslation();
  const { images } = useImages();

  const done = images.filter((img) => img.status === 'done' && img.result);
  if (done.length === 0) return null;

  const totalOriginal = done.reduce((sum, img) => sum + img.originalSize, 0);
  const totalOptimized = done.reduce((sum, img) => sum + img.result!.size, 0);
  const totalSaved = totalOriginal - totalOptimized;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{t('results.title')}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <th className="pb-2 pr-4">{t('results.file')}</th>
              <th className="pb-2 pr-4">{t('results.originalSize')}</th>
              <th className="pb-2 pr-4">{t('results.newSize')}</th>
              <th className="pb-2">{t('results.reduction')}</th>
            </tr>
          </thead>
          <tbody>
            {done.map((img) => {
              const pct = savingsPercent(img.originalSize, img.result!.size);
              return (
                <tr key={img.id} className="border-b border-gray-50 dark:border-gray-700/50">
                  <td className="max-w-[150px] truncate py-1.5 pr-4 text-gray-700 dark:text-gray-300">{img.original.name}</td>
                  <td className="py-1.5 pr-4 text-gray-500 dark:text-gray-400">{formatBytes(img.originalSize)}</td>
                  <td className="py-1.5 pr-4 text-gray-500 dark:text-gray-400">{formatBytes(img.result!.size)}</td>
                  <td className={`py-1.5 font-medium ${pct > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                    {pct > 0 ? `${pct}%` : t('images.alreadyOptimal')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalSaved > 0 && (
        <p className="mt-3 text-xs font-medium text-green-700 dark:text-green-400">
          {t('results.totalSaved', { saved: formatBytes(totalSaved) })}
        </p>
      )}
    </div>
  );
}
