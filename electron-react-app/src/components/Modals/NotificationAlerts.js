import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showAlert = (message, type, containerId) => {
  console.log('Show ALert ' + message);
  var data = {
    containerId: containerId,
    autoClose: 3000,
    closeOnClick: true,
  };
  if (type === 'success') {
    toast.success(message, data);
  } else if (type === 'error') {
    toast.error(message, data);
  } else {
    toast.info(message, data);
  }
};
