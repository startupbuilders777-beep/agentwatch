'use client';

import { useApp } from '@/context/AppContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast animate-slide-in"
          onClick={() => removeToast(toast.id)}
        >
          <span className="text-xl">
            {toast.type === 'success' && '✅'}
            {toast.type === 'error' && '❌'}
            {toast.type === 'info' && 'ℹ️'}
          </span>
          <span className="text-white">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
