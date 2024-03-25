import {
  AddCircle,
  Chat,
  Logo,
  Plane,
  PlaneRight,
  SideBarBuilding,
} from 'assets/icons';
import {Content} from 'components/Content/Content';
import {Text} from 'components/Content/Text';
import {Line as LineIcon} from 'assets/icons';
import {SideBarLoginMenu} from 'components/SideBarLoginMenu/SideBarLoginMenu';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'store/hook';
import {
  changeCurrentTab,
  functionalityState,
  toggleSideBar,
} from 'slices/appFunctionality.slice';
import Config from 'config';
import {Tabs} from 'models/tabs';
import {XMarkIcon} from '@heroicons/react/20/solid';
import {useRef, useState} from 'react';
import {getTours} from 'middlewares/getTours.middleware';
import {emptyToursArray} from 'slices/tour.slice';
import Currencies from 'assets/currencies.json';

export const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement | null>(null);
  const {sideBarOpened} = useAppSelector(functionalityState);
  const [searchInputOpened, setSearchInputOpened] = useState<boolean>(false);
  const closeSideBar = () => {
    dispatch(toggleSideBar());
  };
  const goToHome = () => {
    if (sideBarOpened) closeSideBar();
    navigate('/');
    dispatch(changeCurrentTab(Tabs.TOUR_HOME));
  };
  const handleSearch = () => {
    navigate('/tours');
    dispatch(getTours({query: ref.current?.value, limit: 50}));
    closeSideBar();
  };
  const handleKeyClicked = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        handleSearch();
        break;
      case 'Escape':
        if (ref.current) {
          dispatch(emptyToursArray());
          ref.current.value = '';
        }
        break;
      default:
        break;
    }
  };
  if (sideBarOpened) {
    return (
      <div
        className={
          'bg-[color:var(--white, #F8FBFF)] inline-flex  md:hidden  flex-col h-full items-start justify-between px-[28px] py-0 fixed top-0 left-0  z-50 bg-[color:var(--variable-collection-white)] shadow-[color:var(--s-3)] shadow-lg w-11/12'
        }>
        <div className="flex items-center justify-between w-full h-[120px]">
          <button onClick={goToHome}>
            <Logo className="relative w-[156px] h-[56px]" />
          </button>
          <button onClick={closeSideBar}>
            <XMarkIcon className="relative w-[56px] h-[56px]" />
          </button>
        </div>
        {searchInputOpened ? (
          <div
            className={`w-full flex flex-col items-center gap-[10px] rounded-[8px] relative mb-5 border border-[--variable-collection-blue-2]`}>
            <div className="bg-white w-full flex self-stretch items-start gap-[8px] flex-[0_0_auto] shadow-lg shadow-[color:var(--layer-style)] py-[16px] px-[8px] rounded-[8px]  backdrop-blur-[20px] backdrop-brightness-[100%] relative">
              <div className="flex flex-wrap items-center grow flex-1 gap-[var(--spacing-8)] pl-1 pr-0 py-0 rounded-[8px] relative">
                <div className=" flex-col items-start grow flex-1 rounded-[8px] justify-center relative">
                  <input
                    onKeyDown={(e) => handleKeyClicked(e)}
                    className={` [font-family:'Inter-Regular',_Helvetica] self-stretch outline-none border-none w-full tracking-[0] text-[18px] font-normal !shadow-none !ring-0 placeholder:text-xl placeholder:font-medium  relative ${'text-[#120f4366]'}`}
                    ref={ref}
                    placeholder="Where To?"
                  />
                </div>
                <PlaneRight
                  className="!flex-[0_0_auto] cursor-pointer"
                  onClick={handleSearch}
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex-col w-full items-start flex-1 grow rounded-[8px] overflow-hidden border-2 border-solid border-[color:var(--variable-collection-hover-blue)] flex relative">
          <button
            onClick={() => setSearchInputOpened((opened) => !opened)}
            className="flex items-center gap-[8px] pt-[var(--spacing-16)] pr-[var(--spacing-16)] pb-[var(--spacing-16)] pl-[var(--spacing-16)] relative self-stretch w-full flex-[0_0_auto] bg-[color:var(--variable-collection-blue-2)] rounded-[8px_8px_0px_0px] all-[unset] box-border">
            <div className="!rounded-[var(--spacing-radius-8)] !h-[var(--spacing-size-24)] !gap-[var(--spacing-4)] !flex-[0_0_auto] !w-[var(--spacing-size-24)]">
              {' '}
              <AddCircle
                className="!relative !w-[24px] !h-[24px]"
                fill="white"
              />
            </div>
            <span className="relative w-fit [font-family:var(--14-regular-font-family)] font-[number:var(--14-regular-font-weight)] text-white text-[length:var(--14-regular-font-size)] text-center tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] whitespace-nowrap ">
              New chat
            </span>
          </button>

          <div className="flex-col items-start flex-1 self-stretch w-full grow overflow-hidden overflow-y-auto flex relative">
            <Content
              className="!self-stretch !h-[18px] !rounded-[unset] !pt-[var(--spacing-16)] !pr-[var(--spacing-16)] !pb-[var(--spacing-16)] !pl-[var(--spacing-16)] !bg-[color:var(--variable-collection-green)] !w-full"
              hover={false}
              override={
                <Text
                  className="!mt-[-17.00px] !mb-[-17.00px] !flex-1  !grow"
                  direction="vertical"
                  divClassName="!text-[color:var(--variable-collection-white)]"
                  quantity="one"
                  text="Today"
                />
              }
              type="single"
            />

            <LineIcon
              className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
            />

            <div className="p-2 flex items-center justify-start gap-3  w-full">
              <Chat className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
              <span className="text-sm">Pyramids</span>
            </div>
            <hr
              className={` !flex-[0_0_auto] self-stretch object-cover relative w-full bg-[#575757] h-[1px] opacity-50`}
            />
            <div className="p-2 flex items-center justify-start gap-3  w-full">
              <Chat className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
              <span className="text-sm">Pyramids</span>
            </div>
            <hr
              className={` !flex-[0_0_auto] self-stretch object-cover relative w-full bg-[#575757] h-[1px] opacity-50`}
            />

            <div className="p-2 flex items-center justify-start gap-3  w-full">
              <Chat className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
              <span className="text-sm">Tickets to Disneyland Paris</span>
            </div>
            <hr
              className={` !flex-[0_0_auto] self-stretch object-cover relative w-full bg-[#575757] h-[1px] opacity-50`}
            />
            <Content
              className="!self-stretch !h-[18px] !rounded-[unset] !pt-[var(--spacing-16)] !pr-[var(--spacing-16)] !pb-[var(--spacing-16)] !pl-[var(--spacing-16)] !bg-[color:var(--variable-collection-green)] !w-full"
              hover={false}
              override={
                <Text
                  className="!mt-[-17.00px] !mb-[-17.00px] !flex-1  !grow"
                  direction="vertical"
                  divClassName="!text-[color:var(--variable-collection-white)]"
                  quantity="one"
                  text="Yesterday"
                />
              }
              type="single"
            />

            <hr
              className={` !flex-[0_0_auto] self-stretch object-cover relative w-full bg-[#575757] h-[1px] opacity-50`}
            />

            <div className="p-2 flex items-center justify-start gap-3  w-full">
              <Plane className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
              <span className="text-sm">Flights to Disneyland Paris</span>
            </div>
            <hr
              className={` !flex-[0_0_auto] self-stretch object-cover relative w-full bg-[#575757] h-[1px] opacity-50`}
            />

            <div className="p-2 flex items-center justify-start gap-3  w-full">
              <SideBarBuilding className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
              <span className="text-sm">Houses to Disneyland Paris</span>
            </div>
            <hr
              className={` !flex-[0_0_auto] self-stretch object-cover relative w-full bg-[#575757] h-[1px] opacity-50`}
            />

            <div className="p-2 flex items-center justify-start gap-3  w-full">
              <SideBarBuilding className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
              <span className="text-sm">Houses to Disneyland Paris</span>
            </div>
            <hr
              className={` !flex-[0_0_auto] self-stretch object-cover relative w-full bg-[#575757] h-[1px] opacity-50`}
            />

            <div className="p-2 flex items-center justify-start gap-3  w-full">
              <SideBarBuilding className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
              <span className="text-sm">Houses to Disneyland Paris</span>
            </div>
            <hr
              className={` !flex-[0_0_auto] self-stretch object-cover relative w-full bg-[#575757] h-[1px] opacity-50`}
            />

            <div className="p-2 flex items-center justify-start gap-3  w-full">
              <SideBarBuilding className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
              <span className="text-sm">Houses to Disneyland Paris</span>
            </div>
          </div>
        </div>
        <SideBarLoginMenu className="!border-[unset] !justify-center !flex-[0_0_auto] ![border-top-style:unset] !border-t-[unset] mt-5" />
      </div>
    );
  }
  return (
    <div
      className={
        'bg-[color:var(--white, #F8FBFF)] md:inline-flex hidden  flex-col h-full items-start justify-between px-[28px] py-0 relative bg-[color:var(--variable-collection-white)] w-[313px] shadow-[color:var(--s-3)] shadow-lg'
      }>
      <button
        onClick={goToHome}
        className="w-[220px] h-[100px] items-center justify-around gap-[10px] px-[10px] py-0 flex relative">
        <Logo className="relative w-[156px] h-[56px] object-contain" />
      </button>
      <div className="flex flex-col items-center justify-center mx-auto">
        <select
          defaultValue={localStorage.getItem('lang') ?? 'en'}
          onChange={(e) => {
            localStorage.setItem('lang', e.target.value);
            window.location.reload();
          }}
          className="mb-1  w-[200px] rounded-xl mx-auto">
          {Config.Languages.map((item) => (
            <option value={item.code} key={item.code}>
              {item.title}
            </option>
          ))}
        </select>
        <select
          defaultValue={localStorage.getItem('curr') ?? 'USD'}
          onChange={(e) => {
            localStorage.setItem('curr', e.target.value);
            window.location.reload();
          }}
          className="mb-5 w-[200px] rounded-xl mx-auto">
          {Currencies.map((item) => (
            <option value={item.code} key={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-col w-[220px] items-start flex-1 grow rounded-[8px] overflow-hidden border-2 border-solid border-[color:var(--variable-collection-hover-blue)] flex relative">
        <button className="flex items-center gap-[8px] pt-[var(--spacing-16)] pr-[var(--spacing-16)] pb-[var(--spacing-16)] pl-[var(--spacing-16)] relative self-stretch w-full flex-[0_0_auto] bg-[color:var(--variable-collection-blue-2)] rounded-[8px_8px_0px_0px] all-[unset] box-border">
          <div className="!rounded-[var(--spacing-radius-8)] !h-[var(--spacing-size-24)] !gap-[var(--spacing-4)] !flex-[0_0_auto] !w-[var(--spacing-size-24)]">
            {' '}
            <AddCircle className="!relative !w-[24px] !h-[24px]" fill="white" />
          </div>
          <div className="relative w-fit [font-family:var(--14-regular-font-family)] font-[number:var(--14-regular-font-weight)] text-white text-[length:var(--14-regular-font-size)] text-center tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] whitespace-nowrap ">
            New chat
          </div>
        </button>
        <div className="flex-col items-start flex-1 self-stretch w-full grow overflow-hidden overflow-y-auto flex relative">
          <Content
            className="!self-stretch !h-[18px] !rounded-[unset] !pt-[var(--spacing-16)] !pr-[var(--spacing-16)] !pb-[var(--spacing-16)] !pl-[var(--spacing-16)] !bg-[color:var(--variable-collection-green)] !w-full"
            hover={false}
            override={
              <Text
                className="!mt-[-17.00px] !mb-[-17.00px] !flex-1  !grow"
                direction="vertical"
                divClassName="!text-[color:var(--variable-collection-white)]"
                quantity="one"
                text="Today"
              />
            }
            type="single"
          />
          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />

          <div className="p-2 flex items-center justify-start gap-3  w-full">
            <Chat className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
            <span className="text-sm">Pyramids</span>
          </div>
          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />
          <div className="p-2 flex items-center justify-start gap-3  w-full">
            <Chat className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
            <span className="text-sm">Pyramids</span>
          </div>
          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />

          <div className="p-2 flex items-center justify-start gap-3  w-full">
            <Chat className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
            <span className="text-sm">Tickets to Disneyland Paris</span>
          </div>
          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />
          <Content
            className="!self-stretch !h-[18px] !rounded-[unset] !pt-[var(--spacing-16)] !pr-[var(--spacing-16)] !pb-[var(--spacing-16)] !pl-[var(--spacing-16)] !bg-[color:var(--variable-collection-green)] !w-full"
            hover={false}
            override={
              <Text
                className="!mt-[-17.00px] !mb-[-17.00px] !flex-1  !grow"
                direction="vertical"
                divClassName="!text-[color:var(--variable-collection-white)]"
                quantity="one"
                text="Yesterday"
              />
            }
            type="single"
          />
          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />

          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />

          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />
          <div className="p-2 flex items-center justify-start gap-3  w-full">
            <Plane className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
            <span className="text-sm">Flights to Disneyland Paris</span>
          </div>
          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />
          <div className="p-2 flex items-center justify-start gap-3  w-full">
            <SideBarBuilding className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
            <span className="text-sm">Houses to Disneyland Paris</span>
          </div>
          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />
          <div className="p-2 flex items-center justify-start gap-3  w-full">
            <SideBarBuilding className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
            <span className="text-sm">Houses to Disneyland Paris</span>
          </div>
          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />
          <div className="p-2 flex items-center justify-start gap-3  w-full">
            <SideBarBuilding className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
            <span className="text-sm">Houses to Disneyland Paris</span>
          </div>
          <LineIcon
            className={` !flex-[0_0_auto] self-stretch object-cover relative w-full h-px`}
          />
          <div className="p-2 flex items-center justify-start gap-3  w-full">
            <SideBarBuilding className="w-8 h-8 text-[color:var(--variable-collection-blue-2)]" />
            <span className="text-sm">Houses to Disneyland Paris</span>
          </div>
        </div>
      </div>
      <SideBarLoginMenu className="border-[unset] justify-center flex-[0_0_auto] [border-top-style:unset] border-t-[unset] mt-5 m-auto" />
    </div>
  );
};
