import { toast } from 'react-toastify';

const toastAlert = (message) => {
  toast.error(message, { className: 'ToastAlert' });
};

export default toastAlert;
