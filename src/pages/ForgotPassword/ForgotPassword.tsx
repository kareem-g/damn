import {Logo} from 'assets/icons';
import Input from 'components/Input/Input';
import {useFormik} from 'formik';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch} from 'store/hook';

import React from 'react';
import {ResetPassword} from 'middlewares/resetPassword.middleware';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values, formikHelpers) => {
      dispatch(ResetPassword({email: values.email})).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          formikHelpers.resetForm();
          navigate('/');
        }
      });
    },
  });
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to={'/'}>
          <Logo className="mx-auto h-10 w-auto" />
        </Link>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 capitalize">
          Reset Your Email's Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <Input
            label="Email Address"
            id="email"
            formik={formik}
            name="email"
            placeholder="Email Address"
            type="email"
          />

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[color:var(--variable-collection-blue-2)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[color:var(--variable-collection-blue-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--variable-collection-blue-2)]">
              Send Email!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
