import Input from 'components/Input/Input';
import {FormikProps} from 'formik';
import React from 'react';

type Props = {
  formik: FormikProps<any>;
};

const PersonalDetailsForm: React.FC<Props> = ({formik}) => {
  return (
    <form className={` w-full space-y-5`} onSubmit={formik.handleSubmit}>
      <Input
        formik={formik}
        type="text"
        name="firstName"
        id="firstName"
        label="First Name"
        placeholder="First name"
      />
      <Input
        formik={formik}
        type="text"
        name="lastName"
        id="lasttName"
        label="Last Name"
        placeholder="Last name"
      />

      <Input
        formik={formik}
        type="email"
        name="email"
        id="email"
        label="Email Address"
        placeholder="your@email.com"
      />
    </form>
  );
};

export default PersonalDetailsForm;
