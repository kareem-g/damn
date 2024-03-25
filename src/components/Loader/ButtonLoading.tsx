import React from 'react';
import {Loader} from 'rsuite';

const ButtonLoading: React.FC = () => {
  return (
    <div className="flex flex-col h-[30px] items-center justify-center gap-[5.61px] px-[83.53px] py-[7.85px] relative self-stretch w-full bg-[color:var(--variable-collection-blue-2)]">
      <Loader content="Loading..." size="sm" />
    </div>
  );
};

export default ButtonLoading;
