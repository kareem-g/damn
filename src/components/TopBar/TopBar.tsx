import {BaitportalLogo, Cart} from 'assets/icons';
import {SearchInput} from 'components/SearchInput/SearchInput';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Bars3Icon} from '@heroicons/react/24/outline';
import {useAppDispatch, useAppSelector} from 'store/hook';
import {toggleSideBar} from 'slices/appFunctionality.slice';
import {checkoutState} from 'slices/checkout.slice';
import {classNames} from 'utils/classNames';

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const state = useAppSelector(checkoutState);
  const dispatch = useAppDispatch();
  const goToCart = () => {
    navigate('/cart');
  };
  const goToHome = () => {
    navigate('/');
  };
  const openSideBar = () => {
    dispatch(toggleSideBar());
  };
  return (
    <>
      <div className="bg-[color:var(--variable-collection-dark)] w-full h-20 md:hidden flex items-center justify-between gap-3 px-5">
        <button onClick={openSideBar}>
          <Bars3Icon className="w-10 h-10 text-[color:var(--variable-collection-white)]" />
        </button>
        <button onClick={goToHome}>
          <img src={BaitportalLogo} className="relative w-[186px] h-[56px] " />
        </button>

        <button className="relative" onClick={goToCart}>
          <span
            className={classNames(
              'bg-red-500 absolute top-0 right-50 translate-x-[100%] translate-y-[-60%] z-10 rounded-full w-5 h-5 flex items-center justify-center text-xs',
              state?.cartItems?.length === 0 ? 'hidden' : ''
            )}>
            {state?.cartItems?.length ?? 0}
          </span>
          <Cart
            width={30}
            height={30}
            className="text-[color:var(--variable-collection-white)] md:text-[color:var(--variable-collection-dark)]"
          />
        </button>
      </div>
      <div className=" items-center justify-center gap-11  w-full md:flex hidden">
        <SearchInput className="bg-white" />

        <button className="relative" onClick={goToCart}>
          <span
            className={classNames(
              'bg-red-500 absolute top-0 right-50 translate-x-[100%] translate-y-[-60%] z-10 rounded-full w-5 h-5 flex items-center justify-center text-xs',
              state?.cartItems?.length === 0 ? 'hidden' : ''
            )}>
            {state?.cartItems?.length ?? 0}
          </span>
          <Cart
            width={30}
            height={30}
            className="mr-10 text-[color:var(--variable-collection-white)] md:text-[color:var(--variable-collection-dark)]"
          />
        </button>
      </div>
    </>
  );
};

export default TopBar;
