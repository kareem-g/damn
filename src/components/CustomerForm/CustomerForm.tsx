import Select from 'components/Input/Select';
import {FormikProps} from 'formik';
import React from 'react';

interface Props {
  participantInformation: {requiredField: any}[];
  extraCustomerData: {requiredField: any; id: string}[];
  formik: FormikProps<any>;
}

const CustomerForm: React.FC<Props> = ({
  participantInformation,
  extraCustomerData,
  formik,
}) => {
  // const formSchema = Yup.object().shape({
  //   firstname: Yup.string().required('First name is required'),
  //   lastname: Yup.string().required('Last name is required'),
  //   email: Yup.string()
  //     .email('Invalid email address')
  //     .required('Email is required'),

  //   extra_customer_data: Yup.object().test(
  //     'extraDataTest',
  //     'At least one set of extra customer data must be provided',
  //     (value) => {
  //       // Check if there's at least one "extra_customer_data" property
  //       return Object.keys(value).length > 0;
  //     }
  //   ),
  // });

  if (participantInformation.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-5">
      <div className="mt-3 flex flex-col space-y-2">
        {extraCustomerData.length > 0 ? (
          <>
            <div className="relative w-fit mt-[-1.00px] [font-family:var(--bold-14px-font-family)] font-[number:var(--bold-14px-font-weight)] text-[color:var(--variable-collection-dark2)] text-[length:var(--bold-14px-font-size)] tracking-[var(--bold-14px-letter-spacing)] leading-[var(--bold-14px-line-height)] whitespace-nowrap [font-style:var(--bold-14px-font-style)]">
              Extra Customer Data
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
              {extraCustomerData.map((item, index) => {
                if (typeof item.requiredField.enum === 'object') {
                  return <Select item={item.requiredField} key={index} />;
                } else {
                  return (
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type="text"
                      id={`extra_customer_data.${item.id}.${item.requiredField.fieldId}`}
                      name={`extra_customer_data.${item.id}.${item.requiredField.fieldId}`}
                      placeholder={`${
                        item.requiredField?.title === 'dateOfBirth'
                          ? 'MM/DD/YYYY'
                          : item.requiredField?.title
                      }`}
                      key={item.id}
                      value={
                        formik.values.extra_customer_data?.[item.id]?.[
                          item.requiredField.fieldId
                        ]
                      }
                      onChange={formik.handleChange}
                    />
                  );
                }
              })}
            </div>
          </>
        ) : null}
        {/* <button
            type="submit"
            className="rounded-lg p-4 font-bold text-md text-white bg-[#1e90ff]">
            Submit
          </button> */}
      </div>
    </div>
  );
};

export default CustomerForm;
