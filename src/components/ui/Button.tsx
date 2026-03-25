import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

const styles = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:disabled:bg-indigo-800',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
  danger: 'bg-red-50 text-red-600 hover:bg-red-100 disabled:bg-red-50 disabled:text-red-300 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  function Button({ variant = 'primary', children, className = '', ...props }, ref) {
    return (
      <button
        ref={ref}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${styles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
