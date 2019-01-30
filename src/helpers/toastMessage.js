import { toast } from 'react-toastify';

export const toastAlert = (message) => {
  toast.error(message, { className: 'ToastAlert' });
};

export const toastNotice = (message) => {
  toast.success(message, { className: 'ToastNotice' });
};
