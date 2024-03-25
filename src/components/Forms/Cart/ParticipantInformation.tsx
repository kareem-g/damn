import Input from 'components/Input/Input';
import {FormikProps} from 'formik';
import React from 'react';

import Select from 'components/Input/Select';

type Props = {
  formik: FormikProps<any>;
  itemsParticipantInformation: {requiredField: any}[];
};
const ParticipantInformation: React.FC<Props> = ({
  formik,
  itemsParticipantInformation,
}) => {
  return (
    <form className={` w-full space-y-5`} onSubmit={formik.handleSubmit}>
      {itemsParticipantInformation?.map((item, index) => {
        if (typeof item.requiredField.enum === 'object') {
          return <Select item={item.requiredField} key={index} />;
        } else {
          return (
            <Input
              formik={formik}
              type="text"
              name={`participantInfo.${item.requiredField?.title}`}
              id={`participantInfo.${item.requiredField?.title}`}
              placeholder={`${
                item.requiredField?.title === 'dateOfBirth'
                  ? 'MM/DD/YYYY'
                  : item.requiredField?.title
              }`}
              key={index}
              label={item.requiredField.title}
            />
          );
        }
      })}
    </form>
  );
};

export default ParticipantInformation;
