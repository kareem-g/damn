import {Logo} from 'assets/icons';
import Input from 'components/Input/Input';
import {useFormik} from 'formik';
import {AuthenticateUserWithGoogle} from 'middlewares/authenticateUserWithGoogle.middleware';
import {CreateNewUserAccount} from 'middlewares/createUserAccount.middleware';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useAppDispatch} from 'store/hook';

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleRegisterWithGoogle = () => {
    dispatch(AuthenticateUserWithGoogle()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    });
  };
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
      name: '',
      confirmPassword: '',
    },
    onSubmit(values, formikHelpers) {
      if (values.confirmPassword === values.password) {
        dispatch(
          CreateNewUserAccount({
            email: values.email,
            password: values.password,
            name: values.name,
          })
        ).then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            formikHelpers.resetForm();
            navigate('/');
          } else {
            toast.error(res.payload.message);
          }
        });
      } else {
        toast.error('Password is not the same');
      }
    },
  });
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to={'/'}>
          <Logo className="mx-auto h-10 w-auto" />
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" noValidate onSubmit={formik.handleSubmit}>
            <Input
              label="Full Name"
              id="name"
              formik={formik}
              name="name"
              placeholder="Full Name"
              type="text"
            />
            <Input
              label="Email Address"
              id="email"
              formik={formik}
              name="email"
              placeholder="Email Address"
              type="email"
            />
            <Input
              label="Password"
              id="password"
              formik={formik}
              name="password"
              placeholder="Password"
              type="password"
            />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              formik={formik}
              name="confirmPassword"
              placeholder="Type your password again..."
              type="password"
            />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[color:var(--variable-collection-blue-2)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Register
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex w-full items-center justify-center my-5">
              <button
                onClick={handleRegisterWithGoogle}
                className="flex w-3/4 items-center justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 outline outline-[#24292F]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                <span className="text-sm font-semibold leading-6">Google</span>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account ?{' '}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Registration;
