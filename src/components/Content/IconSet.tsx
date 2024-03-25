import {
  CalendarDaysIcon,
  CommandLineIcon,
  DocumentPlusIcon,
  HomeIcon,
} from '@heroicons/react/20/solid';

// import {Dot} from './Dot';
// import {IconComponentNode} from './IconComponentNode';
// import {NamecandidateNameDotScore101} from './NamecandidateNameDotScore101';
// import {WeightDuotone} from './WeightDuotone';

interface Props {
  size:
    | 'sixteen'
    | 'twenty-four'
    | 'twenty-eight'
    | 'forty-eight'
    | 'zero'
    | 'eighty'
    | 'twenty'
    | 'thirty-two'
    | 'forty';
  BG: boolean;
  badge: boolean;
  className: string;
  icon?: JSX.Element;
}

export const IconSet = ({
  size,
  BG,
  badge,
  className,
  icon = <HomeIcon />,
}: Props): JSX.Element => {
  return (
    <div
      className={`rounded-[var(--radius-8)] ${
        size === 'zero' ? 'w-[16px]' : ''
      } ${
        size === 'eighty' ||
        size === 'forty-eight' ||
        size === 'forty' ||
        size === 'sixteen' ||
        size === 'thirty-two' ||
        size === 'twenty-eight' ||
        size === 'twenty-four' ||
        size === 'twenty'
          ? 'inline-flex'
          : ''
      } ${
        size === 'eighty' ||
        size === 'forty-eight' ||
        size === 'forty' ||
        size === 'sixteen' ||
        size === 'thirty-two' ||
        size === 'twenty-eight' ||
        size === 'twenty-four' ||
        size === 'twenty'
          ? 'items-center'
          : ''
      } ${
        BG
          ? 'pt-[var(--spacing-4)] pr-[var(--spacing-4)] pb-[var(--spacing-4)] pl-[var(--spacing-4)]'
          : ''
      } ${size === 'zero' ? 'h-[16px]' : ''} ${
        size === 'eighty' ||
        size === 'forty-eight' ||
        size === 'forty' ||
        size === 'sixteen' ||
        size === 'thirty-two' ||
        size === 'twenty-eight' ||
        size === 'twenty-four' ||
        size === 'twenty'
          ? 'justify-center'
          : ''
      } ${BG ? 'bg-[color:var(--themes-black-5)]' : ''} ${
        size === 'eighty' ||
        size === 'forty-eight' ||
        size === 'forty' ||
        size === 'sixteen' ||
        size === 'thirty-two' ||
        size === 'twenty-eight' ||
        size === 'twenty-four' ||
        size === 'twenty'
          ? 'relative'
          : ''
      } ${className}`}>
      {((!badge && size === 'eighty') ||
        (!badge && size === 'forty-eight') ||
        (!badge && size === 'forty') ||
        (!badge && size === 'sixteen') ||
        (!badge && size === 'thirty-two') ||
        (!badge && size === 'twenty-eight') ||
        (!badge && size === 'twenty-four') ||
        (!badge && size === 'twenty')) && <>{icon}</>}

      {badge && (
        <>
          <HomeIcon
            className={
              '!relative !w-[16px] !h-[16px] text-[color:var(--variable-collection-dark)]'
            }
          />
          <div
            className={`w-[var(--icon-size-16)] flex items-center h-[var(--icon-size-16)] rounded-[var(--radius-80)] absolute ${
              size === 'eighty' && !BG
                ? 'left-[52px]'
                : size === 'eighty' && BG
                ? 'left-[56px]'
                : (BG && size === 'forty') || (!BG && size === 'forty-eight')
                ? 'left-[26px]'
                : !BG && size === 'forty'
                ? 'left-[22px]'
                : size === 'forty-eight' && BG
                ? 'left-[30px]'
                : (BG && size === 'twenty-eight') ||
                  (!BG && size === 'thirty-two')
                ? 'left-[16px]'
                : BG && size === 'thirty-two'
                ? 'left-[20px]'
                : (BG && size === 'twenty') || (!BG && size === 'twenty-eight')
                ? 'left-[12px]'
                : (BG && size === 'sixteen') || (!BG && size === 'twenty-four')
                ? 'left-[10px]'
                : size === 'twenty-four' && BG
                ? 'left-[14px]'
                : !BG && size === 'twenty'
                ? 'left-[8px]'
                : !BG && size === 'sixteen'
                ? 'left-[6px]'
                : ''
            } ${
              size === 'eighty' && !BG
                ? 'top-[4px]'
                : size === 'eighty' && BG
                ? 'top-[8px]'
                : (BG && size === 'twenty-four') ||
                  (!BG && size === 'forty-eight') ||
                  (!BG && size === 'forty')
                ? 'top-[-2px]'
                : BG && ['forty-eight', 'forty'].includes(size)
                ? 'top-[2px]'
                : (BG && size === 'twenty') ||
                  (!BG && size === 'thirty-two') ||
                  (!BG && size === 'twenty-eight')
                ? 'top-[-4px]'
                : BG && ['thirty-two', 'twenty-eight'].includes(size)
                ? 'top-0'
                : (BG && size === 'sixteen') || (!BG && size === 'twenty-four')
                ? 'top-[-6px]'
                : !BG && size === 'twenty'
                ? 'top-[-8px]'
                : !BG && size === 'sixteen'
                ? 'top-[-10px]'
                : ''
            } ${BG ? 'justify-center' : ''}`}>
            {((BG && size === 'thirty-two') ||
              (BG && size === 'twenty-eight') ||
              (BG && size === 'twenty-four') ||
              size === 'eighty' ||
              size === 'forty-eight' ||
              size === 'forty') && (
              <DocumentPlusIcon className="!relative !flex-1 !self-stretch !grow" />
            )}

            {((BG && size === 'twenty') ||
              (!BG && size === 'thirty-two') ||
              (!BG && size === 'twenty-eight')) && (
              <CommandLineIcon className="!relative !flex-1 !self-stretch !grow" />
            )}

            {(size === 'sixteen' ||
              (!BG && size === 'twenty-four') ||
              (!BG && size === 'twenty')) && (
              <CalendarDaysIcon className="!relative !flex-1 !self-stretch !grow" />
            )}
          </div>
        </>
      )}
    </div>
  );
};
