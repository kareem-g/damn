interface Props {
  direction: 'vertical' | 'horizontal';
  quantity: 'seven' | 'two' | 'three' | 'four' | 'one' | 'five' | 'six';
  className?: string;
  divClassName?: string;
  text: string;
  onClick?: () => void;
}

export const Text = ({
  direction,
  quantity,
  className = '',
  divClassName = '',
  text = 'Text',
  onClick = () => {},
}: Props): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={`rounded-[var(--radius-8)] relative ${
        direction === 'horizontal' && quantity === 'six'
          ? 'w-[174px]'
          : direction === 'horizontal' && quantity === 'seven'
          ? 'w-[203px]'
          : direction === 'horizontal' && quantity === 'five'
          ? 'w-[145px]'
          : direction === 'horizontal' && quantity === 'four'
          ? 'w-[116px]'
          : direction === 'horizontal' && quantity === 'three'
          ? 'w-[87px]'
          : direction === 'horizontal' && quantity === 'two'
          ? 'w-[58px]'
          : ''
      } ${direction === 'horizontal' ? '' : ''} ${
        direction === 'horizontal' ? 'flex-wrap' : ''
      } ${direction === 'vertical' ? 'flex-col' : ''} ${
        direction === 'horizontal' ? 'items-center' : 'items-start'
      } ${direction === 'horizontal' ? 'gap-[0px_0px]' : ''} ${
        direction === 'vertical' ? 'justify-center' : ''
      } ${className}`}>
      {['five', 'four', 'seven', 'six', 'three', 'two'].includes(quantity) && (
        <div
          className={`[font-family:var(--14-regular-font-family)] mt-[-1.00px] tracking-[var(--14-regular-letter-spacing)] text-[length:var(--14-regular-font-size)]  text-[color:var(--themes-black-100)] relative font-[number:var(--14-regular-font-weight)] leading-[var(--14-regular-line-height)] ${
            direction === 'vertical' ? 'self-stretch' : ''
          } ${direction === 'horizontal' ? 'flex-1' : ''}`}>
          {text}
        </div>
      )}

      {['five', 'four', 'seven', 'six', 'three', 'two'].includes(quantity) && (
        <div
          className={`[font-family:var(--14-regular-font-family)] tracking-[var(--14-regular-letter-spacing)]  text-[length:var(--14-regular-font-size)] text-[color:var(--themes-black-100)] relative font-[number:var(--14-regular-font-weight)] leading-[var(--14-regular-line-height)] ${
            direction === 'vertical' ? 'self-stretch' : ''
          } ${direction === 'horizontal' ? 'mt-[-1.00px]' : ''} ${
            direction === 'horizontal' ? 'flex-1' : ''
          }`}>
          {text}
        </div>
      )}

      {['five', 'four', 'seven', 'six', 'three'].includes(quantity) && (
        <div
          className={`[font-family:var(--14-regular-font-family)]  tracking-[var(--14-regular-letter-spacing)] text-[length:var(--14-regular-font-size)] text-[color:var(--themes-black-100)] font-[number:var(--14-regular-font-weight)] leading-[var(--14-regular-line-height)] relative ${
            direction === 'vertical' ? 'self-stretch' : ''
          } ${direction === 'horizontal' ? 'mt-[-1.00px]' : ''} ${
            direction === 'horizontal' ? 'flex-1' : ''
          }`}>
          {text}
        </div>
      )}

      {['five', 'four', 'seven', 'six'].includes(quantity) && (
        <div
          className={`[font-family:var(--14-regular-font-family)] tracking-[var(--14-regular-letter-spacing)]  text-[length:var(--14-regular-font-size)] text-[color:var(--themes-black-100)] relative font-[number:var(--14-regular-font-weight)] leading-[var(--14-regular-line-height)] ${
            direction === 'vertical' ? 'self-stretch' : ''
          } ${direction === 'horizontal' ? 'mt-[-1.00px]' : ''} ${
            direction === 'horizontal' ? 'flex-1' : ''
          }`}>
          {text}
        </div>
      )}

      {['five', 'seven', 'six'].includes(quantity) && (
        <div
          className={`[font-family:var(--14-regular-font-family)]  tracking-[var(--14-regular-letter-spacing)] text-[length:var(--14-regular-font-size)] text-[color:var(--themes-black-100)] font-[number:var(--14-regular-font-weight)] leading-[var(--14-regular-line-height)] relative ${
            direction === 'vertical' ? 'self-stretch' : ''
          } ${direction === 'horizontal' ? 'mt-[-1.00px]' : ''} ${
            direction === 'horizontal' ? 'flex-1' : ''
          }`}>
          {text}
        </div>
      )}

      {['seven', 'six'].includes(quantity) && (
        <div
          className={`[font-family:var(--14-regular-font-family)] tracking-[var(--14-regular-letter-spacing)]  text-[length:var(--14-regular-font-size)] text-[color:var(--themes-black-100)] relative font-[number:var(--14-regular-font-weight)] leading-[var(--14-regular-line-height)] ${
            direction === 'vertical' ? 'self-stretch' : ''
          } ${direction === 'horizontal' ? 'mt-[-1.00px]' : ''} ${
            direction === 'horizontal' ? 'flex-1' : ''
          }`}>
          {text}
        </div>
      )}

      {quantity === 'seven' && (
        <div
          className={`[font-family:var(--14-regular-font-family)] tracking-[var(--14-regular-letter-spacing)]  text-[length:var(--14-regular-font-size)] text-[color:var(--themes-black-100)] font-[number:var(--14-regular-font-weight)] leading-[var(--14-regular-line-height)] relative ${
            direction === 'vertical' ? 'self-stretch' : ''
          } ${direction === 'horizontal' ? 'mt-[-1.00px]' : ''} ${
            direction === 'horizontal' ? 'flex-1' : ''
          }`}>
          {text}
        </div>
      )}

      {quantity === 'one' && (
        <div
          className={`relative self-stretch mt-[-1.00px] [font-family:var(--14-regular-font-family)] font-[number:var(--14-regular-font-weight)] text-[color:var(--themes-black-100)] text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)]  ${divClassName}`}>
          {text}
        </div>
      )}
    </div>
  );
};
