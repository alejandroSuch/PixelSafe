import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';

interface Props {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, message, onConfirm, onCancel }: Props) {
  const { t } = useTranslation();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <h3 id="confirm-title" className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" ref={cancelRef} onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {t('actions.confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
}
