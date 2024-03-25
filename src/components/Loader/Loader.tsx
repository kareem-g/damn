import {Loader as Loading} from 'rsuite';

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loading color="#000" size={'lg'} className="m-auto w-20 h-20 " />
    </div>
  );
};

export default Loader;
