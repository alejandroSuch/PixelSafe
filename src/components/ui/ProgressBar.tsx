export function ProgressBar() {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600" role="progressbar" aria-label="Processing">
      <div className="h-full animate-pulse rounded-full bg-indigo-500 dark:bg-indigo-400" style={{ width: '100%' }} />
    </div>
  );
}
