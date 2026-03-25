import { useDarkMode } from '../../hooks/useDarkMode';

export function ThemeToggle() {
  const { theme, setTheme } = useDarkMode();

  const next = () => {
    const order = ['system', 'light', 'dark'] as const;
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  };

  const icon = theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '💻';
  const label = theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'System';

  return (
    <button
      onClick={next}
      className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
      aria-label={`Theme: ${label}`}
      title={label}
    >
      {icon}
    </button>
  );
}
