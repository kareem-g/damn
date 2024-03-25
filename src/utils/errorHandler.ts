import {toast, ToastContent} from 'react-toastify';

const ErrorHandler = (data: any) => {
  if (data.meta.rejectedWithValue && data.meta.requestStatus === 'rejected') {
    const {payload} = data;
    console.log(data);
    if (Array.isArray(data.payload)) {
      (payload as string[]).forEach((item: any) => {
        for (const property in item) {
          toast.error(item[property].toUpperCase());
        }
      });
    } else {
      if (typeof payload === 'string' || payload instanceof String) {
        if (payload.includes('Cannot read properties')) {
          toast.error(
            'Something Went Wrong, Please Contact The Developers Team' as ToastContent
          );
        } else {
          toast.error(payload as ToastContent);
        }
      } else if (payload?.response?.data?.statusCode === 401) {
        toast.error(
          'Authentication failed, you are not allowed to do this action, SignIn First.!'
        );
      } else {
        if (payload.message) {
          toast.error(payload.message);
        } else {
          toast.error('Error, Something gone Wrong...');
        }
      }
    }
  }
};

export default ErrorHandler;
