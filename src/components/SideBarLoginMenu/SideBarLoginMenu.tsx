import {useState} from 'react';
// import {ArrowSquareOut} from './ArrowSquareOut';
// import {DotsVertical} from './DotsVertical';
// import {SignOut} from './SignOut';
// import {Sun} from './Sun';
import {Text} from '../Content/Text';
import {
  ArrowDownOnSquareIcon,
  EllipsisVerticalIcon,
  SunIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';
import {getCurrentTheme, loadTheme} from 'utils/getCurrentTheme';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'store/hook';
import {authState, logOut} from 'slices/auth.slice';
import {classNames} from 'utils/classNames';

interface Props {
  className: string;
}

export const SideBarLoginMenu = ({className}: Props): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const {user} = useAppSelector(authState);
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState<string>(getCurrentTheme());
  const toggleDarkMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    loadTheme(newTheme);
  };
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div
      className={`border-[color:var(--themes-black-10)] w-full border-t flex flex-col items-start [border-top-style:solid] pl-0 pr-[20px] pt-0 pb-[16px] relative ${className}`}>
      {isOpened && (
        <div className="flex flex-col items-start justify-start text-left">
          <button className="flex flex-wrap items-center gap-[var(--spacing-8)] pt-[var(--spacing-12)] pr-[var(--spacing-12)] pb-[var(--spacing-12)] pl-[var(--spacing-12)] relative self-stretch w-full flex-[0_0_auto] rounded-[8px]">
            <div className="flex flex-wrap items-center gap-[var(--spacing-12)] relative flex-1 grow rounded-[8px] text-left">
              <div className="inline-flex items-center justify-center relative flex-[0_0_auto] rounded-[var(--spacing-radius-8)]">
                <TrashIcon className="!relative !w-[24px] !h-[24px] text-[color:var(--themes-black-100)]" />
              </div>
              <Text
                className="!flex-1  !grow"
                direction="vertical"
                quantity="one"
                text="Clear conversations"
              />
            </div>
          </button>
          <button
            onClick={toggleDarkMode}
            className="flex flex-wrap items-center gap-[var(--spacing-8)] pt-[var(--spacing-12)] pr-[var(--spacing-12)] pb-[var(--spacing-12)] pl-[var(--spacing-12)] relative self-stretch w-full flex-[0_0_auto] rounded-[8px]">
            <div className="flex flex-wrap items-center gap-[var(--spacing-12)] relative flex-1 grow rounded-[8px] text-left">
              <div className="inline-flex items-center justify-center relative flex-[0_0_auto] rounded-[var(--spacing-radius-8)]">
                <SunIcon className="!relative !w-[24px] !h-[24px] text-[color:var(--themes-black-100)]" />
              </div>
              <span className="!flex-1  !grow">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
          </button>
          {user?.uid ? (
            <button className="flex flex-wrap items-center gap-[var(--spacing-8)] pt-[var(--spacing-12)] pr-[var(--spacing-12)] pb-[var(--spacing-12)] pl-[var(--spacing-12)] relative self-stretch w-full flex-[0_0_auto] rounded-[8px]">
              <div className="flex flex-wrap items-center gap-[var(--spacing-12)] relative flex-1 grow rounded-[8px]  text-left">
                <div className="inline-flex items-center justify-center relative flex-[0_0_auto] rounded-[var(--spacing-radius-8)]">
                  <UserCircleIcon className="!relative !w-[24px] !h-[24px] text-[color:var(--themes-black-100)]" />
                </div>
                <Text
                  className="!flex-1  !grow"
                  direction="vertical"
                  quantity="one"
                  text="My&nbsp;&nbsp;account"
                />
              </div>
            </button>
          ) : null}
          <button className="flex flex-wrap items-center gap-[var(--spacing-8)] pt-[var(--spacing-12)] pr-[var(--spacing-12)] pb-[var(--spacing-12)] pl-[var(--spacing-12)] relative self-stretch w-full flex-[0_0_auto] rounded-[8px]">
            <div className="flex flex-wrap items-center gap-[var(--spacing-12)] relative flex-1 grow rounded-[8px] text-left">
              <div className="inline-flex items-center justify-center relative flex-[0_0_auto] rounded-[var(--spacing-radius-8)]">
                <ArrowDownOnSquareIcon className="!relative !w-[24px] !h-[24px] text-[color:var(--themes-black-100)]" />
              </div>
              <Text
                className="!flex-1  !grow"
                direction="vertical"
                quantity="one"
                text="Updates &amp; FAQ"
              />
            </div>
          </button>
          <button className="flex flex-wrap items-center gap-[var(--spacing-8)] pt-[var(--spacing-12)] pr-[var(--spacing-12)] pb-[var(--spacing-12)] pl-[var(--spacing-12)] relative self-stretch w-full flex-[0_0_auto] rounded-[8px] ">
            {user?.uid ? (
              <button
                onClick={() => handleLogOut()}
                className="flex flex-wrap items-center gap-[var(--spacing-12)] relative flex-1 grow rounded-[8px]  text-left">
                <div className="inline-flex items-center justify-center relative flex-[0_0_auto] rounded-[var(--spacing-radius-8)]">
                  <ArrowDownOnSquareIcon className="!relative !w-[24px] !h-[24px] text-[color:var(--themes-red-100)]" />
                </div>
                <Text
                  className="!flex-1  !grow"
                  direction="vertical"
                  divClassName="!text-[#ff7b7b]"
                  quantity="one"
                  onClick={() => setIsOpened(false)}
                  text="Log out"
                />
              </button>
            ) : null}
            <button
              className={classNames(
                'text-right text-[color:var(--variable-collection-black)]',
                user?.uid ? 'w-[43px]' : 'w-full'
              )}
              onClick={() => setIsOpened(false)}>
              Back
            </button>
          </button>
        </div>
      )}

      {!isOpened && (
        <div className="w-full flex flex-wrap items-center  gap-[var(--spacing-8)] flex-[0_0_auto] pt-[var(--spacing-12)]  pb-[var(--spacing-12)] pl-[var(--spacing-12)] rounded-[8px] relative">
          {user?.uid ? (
            <Link to={'/account'} className="!flex-1  !grow">
              {user?.name ?? user.email.slice(0, 10)}
            </Link>
          ) : (
            <div className="flex flex-wrap items-center  gap-[var(--spacing-12)] flex-1 rounded-[8px] relative">
              <button
                className="!text-[color:var(--variable-collection-blue-2)]"
                onClick={() => {
                  navigate('/login');
                  setIsOpened(true);
                }}>
                Login
              </button>
            </div>
          )}

          <EllipsisVerticalIcon
            color={theme === 'dark' ? 'white' : 'black'}
            onClick={() => setIsOpened(true)}
            className="!relative !w-[24px] !h-[24px] cursor-pointer "
          />
        </div>
      )}
    </div>
  );
};
