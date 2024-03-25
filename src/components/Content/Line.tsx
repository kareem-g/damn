import {Line as LineIcon} from 'assets/icons';
interface Props {
  direction: 'vertical' | 'horizontal' | 'right-arrow' | 'left-arrow';
  quantity:
    | 'seven'
    | 'two'
    | 'three'
    | 'four'
    | 'one'
    | 'five'
    | 'eight'
    | 'six';
  directionHorizontalClassName?: string;
  className?: string;
}

export const Line = ({
  direction,
  quantity,
  directionHorizontalClassName = '',

  className,
}: Props): JSX.Element => {
  return (
    <>
      {['horizontal', 'vertical'].includes(direction) && (
        <div
          className={`flex items-start relative ${
            direction === 'horizontal'
              ? 'w-[80px]'
              : direction === 'vertical' && ['three', 'two'].includes(quantity)
              ? 'w-[20px]'
              : direction === 'vertical' && quantity === 'one'
              ? 'w-px'
              : 'w-[40px]'
          } ${direction === 'horizontal' ? 'flex-col' : ''} ${
            direction === 'vertical' && quantity === 'one' ? 'gap-[8px]' : ''
          } ${
            direction === 'horizontal' &&
            ['eight', 'seven', 'six'].includes(quantity)
              ? 'h-[40px]'
              : direction === 'horizontal' &&
                ['five', 'four'].includes(quantity)
              ? 'h-[32px]'
              : direction === 'horizontal' && quantity === 'three'
              ? 'h-[16px]'
              : direction === 'horizontal' && quantity === 'two'
              ? 'h-[8px]'
              : direction === 'vertical'
              ? 'h-[80px]'
              : ''
          } ${
            quantity === 'eight' ||
            quantity === 'five' ||
            quantity === 'four' ||
            quantity === 'seven' ||
            quantity === 'six' ||
            quantity === 'three' ||
            quantity === 'two'
              ? 'justify-between'
              : direction === 'vertical' && quantity === 'one'
              ? 'justify-around'
              : ''
          } ${directionHorizontalClassName ?? className ?? className}`}>
          <LineIcon
            className={`self-stretch object-cover relative ${
              direction === 'vertical' ? 'w-px' : 'w-full'
            } ${direction === 'horizontal' ? 'h-px' : ''}`}
          />
          {['eight', 'five', 'four', 'seven', 'six', 'three'].includes(
            quantity
          ) && (
            <img
              className={`self-stretch object-cover relative ${
                direction === 'vertical' ? 'w-px' : 'w-full'
              } ${direction === 'horizontal' ? 'h-px' : ''}`}
              alt="Line"
              src={
                direction === 'vertical' && quantity === 'eight'
                  ? 'line-37.svg'
                  : direction === 'horizontal' && quantity === 'six'
                  ? 'line-16.svg'
                  : direction === 'vertical' && quantity === 'six'
                  ? 'line-52.svg'
                  : direction === 'horizontal' && quantity === 'five'
                  ? 'line-22.svg'
                  : quantity === 'five' && direction === 'vertical'
                  ? 'line-58.svg'
                  : direction === 'horizontal' && quantity === 'seven'
                  ? 'line-9.svg'
                  : direction === 'vertical' && quantity === 'seven'
                  ? 'line-45.svg'
                  : direction === 'horizontal' && quantity === 'three'
                  ? 'line-31.svg'
                  : direction === 'vertical' && quantity === 'three'
                  ? 'line-67.svg'
                  : direction === 'horizontal' && quantity === 'four'
                  ? 'line-27.svg'
                  : direction === 'vertical' && quantity === 'four'
                  ? 'line-63.svg'
                  : 'image.svg'
              }
            />
          )}

          {['eight', 'five', 'four', 'seven', 'six'].includes(quantity) && (
            <img
              className={`self-stretch object-cover relative ${
                direction === 'vertical' ? 'w-px' : 'w-full'
              } ${direction === 'horizontal' ? 'h-px' : ''}`}
              alt="Line"
              src={
                direction === 'vertical' && quantity === 'seven'
                  ? 'line-46.svg'
                  : direction === 'horizontal' && quantity === 'four'
                  ? 'line-28.svg'
                  : direction === 'vertical' && quantity === 'four'
                  ? 'line-64.svg'
                  : direction === 'horizontal' && quantity === 'eight'
                  ? 'line-2.svg'
                  : direction === 'vertical' && quantity === 'eight'
                  ? 'line-38.svg'
                  : direction === 'horizontal' && quantity === 'six'
                  ? 'line-17.svg'
                  : direction === 'vertical' && quantity === 'six'
                  ? 'line-53.svg'
                  : direction === 'horizontal' && quantity === 'five'
                  ? 'line-23.svg'
                  : quantity === 'five' && direction === 'vertical'
                  ? 'line-59.svg'
                  : 'line-10.svg'
              }
            />
          )}

          {['eight', 'five', 'seven', 'six'].includes(quantity) && (
            <img
              className={`self-stretch object-cover relative ${
                direction === 'vertical' ? 'w-px' : 'w-full'
              } ${direction === 'horizontal' ? 'h-px' : ''}`}
              alt="Line"
              src={
                direction === 'vertical' && quantity === 'six'
                  ? 'line-54.svg'
                  : direction === 'horizontal' && quantity === 'eight'
                  ? 'line-3.svg'
                  : direction === 'vertical' && quantity === 'eight'
                  ? 'line-39.svg'
                  : direction === 'horizontal' && quantity === 'seven'
                  ? 'line-11.svg'
                  : direction === 'vertical' && quantity === 'seven'
                  ? 'line-47.svg'
                  : direction === 'horizontal' && quantity === 'five'
                  ? 'line-24.svg'
                  : quantity === 'five' && direction === 'vertical'
                  ? 'line-60.svg'
                  : 'line-18.svg'
              }
            />
          )}

          {['eight', 'seven', 'six'].includes(quantity) && (
            <img
              className={`self-stretch object-cover relative ${
                direction === 'vertical' ? 'w-px' : 'w-full'
              } ${direction === 'horizontal' ? 'h-px' : ''}`}
              alt="Line"
              src={
                direction === 'vertical' && quantity === 'six'
                  ? 'line-55.svg'
                  : direction === 'horizontal' && quantity === 'eight'
                  ? 'line-4.svg'
                  : direction === 'vertical' && quantity === 'eight'
                  ? 'line-40.svg'
                  : direction === 'horizontal' && quantity === 'seven'
                  ? 'line-12.svg'
                  : direction === 'vertical' && quantity === 'seven'
                  ? 'line-48.svg'
                  : 'line-19.svg'
              }
            />
          )}

          {['eight', 'seven'].includes(quantity) && (
            <img
              className={`self-stretch object-cover relative ${
                direction === 'vertical' ? 'w-px' : 'w-full'
              } ${direction === 'horizontal' ? 'h-px' : ''}`}
              alt="Line"
              src={
                direction === 'vertical' && quantity === 'eight'
                  ? 'line-41.svg'
                  : direction === 'horizontal' && quantity === 'seven'
                  ? 'line-13.svg'
                  : direction === 'vertical' && quantity === 'seven'
                  ? 'line-49.svg'
                  : 'line-5.svg'
              }
            />
          )}

          {quantity === 'eight' && (
            <img
              className={`self-stretch object-cover relative ${
                direction === 'vertical' ? 'w-px' : 'w-full'
              } ${direction === 'horizontal' ? 'h-px' : ''}`}
              alt="Line"
              src={direction === 'vertical' ? 'line-42.svg' : 'line-6.svg'}
            />
          )}

          {(quantity === 'eight' ||
            quantity === 'five' ||
            quantity === 'four' ||
            quantity === 'seven' ||
            quantity === 'six' ||
            quantity === 'three' ||
            quantity === 'two') && (
            <img
              className={`self-stretch object-cover relative ${
                direction === 'vertical' ? 'w-px' : 'w-full'
              } ${direction === 'vertical' ? 'mr-[-1.00px]' : ''} ${
                direction === 'horizontal' ? 'h-px' : ''
              }`}
              alt="Line"
              src={
                direction === 'vertical' && quantity === 'eight'
                  ? 'line-43.svg'
                  : direction === 'horizontal' && quantity === 'five'
                  ? 'line-25.svg'
                  : quantity === 'five' && direction === 'vertical'
                  ? 'line-61.svg'
                  : direction === 'horizontal' && quantity === 'four'
                  ? 'line-29.svg'
                  : direction === 'vertical' && quantity === 'four'
                  ? 'line-65.svg'
                  : direction === 'horizontal' && quantity === 'two'
                  ? 'line-34.svg'
                  : direction === 'vertical' && quantity === 'two'
                  ? 'line-70.svg'
                  : direction === 'horizontal' && quantity === 'seven'
                  ? 'line-14.svg'
                  : direction === 'vertical' && quantity === 'seven'
                  ? 'line-50.svg'
                  : direction === 'horizontal' && quantity === 'six'
                  ? 'line-20.svg'
                  : direction === 'vertical' && quantity === 'six'
                  ? 'line-56.svg'
                  : direction === 'horizontal' && quantity === 'three'
                  ? 'line-32.svg'
                  : direction === 'vertical' && quantity === 'three'
                  ? 'line-68.svg'
                  : 'line-7.svg'
              }
            />
          )}
        </div>
      )}

      {['left-arrow', 'right-arrow'].includes(direction) && (
        <img
          className={`w-[80px] left-0 top-0 object-cover h-[4px] absolute ${
            directionHorizontalClassName ?? className
          }`}
          alt="Direction left arrow"
          src={
            direction === 'right-arrow'
              ? 'direction-right-arrow-quantity-1.svg'
              : 'direction-left-arrow-quantity-1.svg'
          }
        />
      )}
    </>
  );
};
