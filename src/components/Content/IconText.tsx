import {IconSet} from './IconSet';
import {Text} from './Text';
import {HomeIcon} from '@heroicons/react/20/solid';
// import {WeightDuotone} from './WeightDuotone';

interface Props {
  type: 'icon-text' | 'text-icon';
  className?: string;
  iconSetSize?: string;
  iconSetIcon?: JSX.Element;
  textText?: string;
  textDivClassName?: string;
  textDirectionVerticalClassName?: string;
}

export const IconText = ({
  type,
  className = '',
  iconSetSize = 'twenty',
  iconSetIcon = <HomeIcon className="!relative !w-[20px] !h-[20px]" />,
  textText = 'Text',
  textDivClassName = '',
  textDirectionVerticalClassName = '',
}: Props): JSX.Element => {
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-[var(--spacing-4)] rounded-[var(--radius-8)] relative ${className}`}>
      {type === 'icon-text' && (
        <>
          <IconSet
            BG={false}
            badge={false}
            className="!rounded-[var(--spacing-radius-8)] !flex-[0_0_auto]"
            icon={iconSetIcon}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            size={iconSetSize as any}
          />
          <Text
            className={textDirectionVerticalClassName}
            direction="vertical"
            divClassName={textDivClassName}
            quantity="one"
            text={textText}
          />
        </>
      )}

      {type === 'text-icon' && (
        <>
          <Text
            className="!flex-[0_0_auto]"
            direction="vertical"
            quantity="one"
            text="Text"
          />
          <IconSet
            BG={false}
            badge={false}
            className="!rounded-[var(--spacing-radius-8)] !flex-[0_0_auto]"
            icon={<HomeIcon className="!relative !w-[20px] !h-[20px]" />}
            size="twenty"
          />
        </>
      )}
    </div>
  );
};
