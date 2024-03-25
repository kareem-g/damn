import React, {CSSProperties} from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  key?: string | number;
};

const Container: React.FC<Props> = ({children, className, style, key}) => {
  return (
    <div className={className} style={style} key={key}>
      {children}
    </div>
  );
};

export default Container;
