import ButtonLoading from 'components/Loader/ButtonLoading';
import React from 'react';

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

const ButtonWithLoader: React.FC<Props> = ({children, loading}) => {
  if (loading) {
    return <ButtonLoading />;
  }
  return children;
};

export default ButtonWithLoader;
