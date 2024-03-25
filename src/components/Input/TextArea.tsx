import {FormikProps} from 'formik';
import React from 'react';

/**
 * Props for the Input component
 */
type Props = {
  label: string; // The label for the input field
  id: string; // The id for the input field
  name: string; // The name for the input field
  placeholder: string; // The placeholder for the input field
  formik: FormikProps<any>; // The Formik props for the input field
  rows: number;
};

/**
 * A reusable Input component that can be used in forms
 * @param label
 * @param id
 * @param name
 * @param placeholder
 * @param formik
 * @param rows
 */
const TextArea: React.FC<Props> = ({
  label,
  id,
  name,
  rows,
  placeholder,
  formik,
}) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[color:var(--variable-collection-blue-2)] sm:text-sm sm:leading-6"
        value={formik.values[name]}
        placeholder={placeholder}
        rows={rows}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        onReset={formik.handleReset}
      />
    </div>
  );
};

export default TextArea;
