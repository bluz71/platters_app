import { toast } from 'react-toastify';

const toastNotice = (message) => {
  toast.success(message, { className: 'ToastNotice' });
};

export default toastNotice;
