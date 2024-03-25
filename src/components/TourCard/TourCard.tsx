import {
  Fee,
  Check,
  Dollar,
  Building,
  Phone,
  Star,
  Love,
  Flag,
  Food,
} from 'assets/icons';
import {ITour} from 'models/tour';
import React, {useState} from 'react';
import {selectTour, toursState} from 'slices/tour.slice';
import {changeCurrentTab} from 'slices/appFunctionality.slice';
import {useAppDispatch, useAppSelector} from 'store/hook';
import {getSpecificTour} from 'middlewares/getSpecificTour.middleware';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {getCurrentTab} from 'utils/getCurrentTab';
import ErrorHandler from 'utils/errorHandler';
import {getTourPickupPoints} from 'middlewares/getTourPickupPoints.middleware';
import {toast} from 'react-toastify';
import {checkPickupAvailability} from 'middlewares/checkPickupAvailability.middleware';
import {getTourAvailableDates} from 'middlewares/getTourAvailableDates.middleware';
import {Tabs} from 'models/tabs';
import ButtonWithLoader from 'components/ButtonWithLoader/ButtonWithLoader';

import Currencies from 'assets/currencies.json';
import {addTourToFav} from 'middlewares/favTours.middleware';
import {classNames} from 'utils/classNames';

interface Props {
  tour: ITour;
  isButtonShowed: boolean;
}
export const TourCard: React.FC<Props> = ({
  tour,
  isButtonShowed,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {favTours} = useAppSelector(toursState);
  const checkAvailability = () => {
    setButtonLoading(true);
    dispatch(checkPickupAvailability({uuid: tour.uuid}))
      .then((data) => {
        dispatch(getSpecificTour({uuid: tour.uuid})).then((tourData) => {
          dispatch(selectTour(tourData.payload));
          if (data.payload) {
            dispatch(changeCurrentTab(Tabs.TOUR_PICKUP));
            if (location.pathname !== '/') navigate('/');
            dispatch(getTourPickupPoints({uuid: tour.uuid})).then((res) =>
              ErrorHandler(res)
            );
          } else {
            dispatch(changeCurrentTab(getCurrentTab(tour)));
            if (location.pathname !== '/') navigate('/');
            dispatch(getTourAvailableDates({uuid: tour.uuid})).then((res) =>
              ErrorHandler(res)
            );
          }
        });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };
  const getTourFeatureIcon = (code: string) => {
    const returned: {[key: string]: any} = {
      istant: (
        <Check className="!relative !w-[24px] !h-[24px] text-[color:var(--variable-collection-dark)]" />
      ),
      ADDVA_VOUCH: (
        <Phone className="!relative !w-[24px] !h-[24px] text-[color:var(--variable-collection-dark)]" />
      ),
      free: (
        <Dollar className="!relative !w-[24px] !h-[24px] text-[color:var(--variable-collection-dark)]" />
      ),
      ADDVA_ENTRAN: (
        <Fee className="!relative !w-[24px] !h-[24px] text-[color:var(--variable-collection-dark)]" />
      ),
      ADDVA_GUIDE: (
        <Flag className="!relative !w-[24px] !h-[24px] text-[color:var(--variable-collection-dark)]" />
      ),
      ADDVA_LOCAL: (
        <Phone className="!relative !w-[24px] !h-[24px] text-[color:var(--variable-collection-dark)]" />
      ),
      ADDVA_MEAL: (
        <Food className="!relative !w-[24px] !h-[24px] text-[color:var(--variable-collection-dark)]" />
      ),
    };
    return (
      returned[code] ?? (
        <Fee className="!relative !w-[24px] !h-[24px] text-[color:var(--variable-collection-dark)]" />
      )
    );
  };

  return (
    <div className="flex flex-col w-[313px] h-fit min-h-[400px] min-w-[313px] items-start relative rounded-[8px] overflow-hidden shadow-lg shadow-[var(--s-5)] bg-[color:var(--variable-collection-white)] cursor-pointer">
      <Link
        to={'/tour/' + tour.slug_id + '?uuid=' + tour.uuid}
        className="flex flex-col w-[313px] items-start gap-[8px] p-[8px] relative flex-1 grow bg-[color:var(--variable-collection-white)] rounded-[10.09px_10.09px_0px_0px]">
        <div className="relative self-stretch w-full h-[124px] rounded-[4.96px] overflow-hidden bg-[url(frame-31.svg)] bg-cover bg-[50%_50%] bg-[color:var(--variable-collection-dark2)] ">
          <div
            className={`relative w-[313px] h-[182px] top-[-36px] left-[-8px] bg-cover bg-[50%_50%]`}>
            <img src={tour.cover_image_url} className="absolute z-0" />
            <div className="relative z-20 w-[43px] h-[106px] top-[46px] left-[251px]">
              <Love
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(addTourToFav({tour: tour as ITour}));
                }}
                className={classNames(
                  'absolute w-[24px] h-[24px] right-[0px] hover:text-[color:var(--variable-collection-blue-2)]',
                  favTours.find((item) => item.uuid === tour.uuid)
                    ? 'text-[color:var(--variable-collection-blue-2)]'
                    : 'text-white'
                )}
              />
              <div className="flex w-[43px] items-center gap-[4.96px] absolute top-[87px] left-0">
                <Star
                  className="!relative !w-[24px] !h-[24px]"
                  color="#15202B"
                />
                <div className="relative w-fit mt-[-0.62px] [font-family:'Netflix_Sans-Regular',_Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[14.9px] tracking-[0] leading-[normal]">
                  {tour.reviews_avg}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[12px] px-[8px] py-0 relative flex-1 self-stretch w-full grow">
          <div className="flex flex-col items-start gap-[12px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-start justify-around gap-[14.89px] relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative flex-1 [font-family:'Netflix_Sans_-Bold',_Helvetica] font-bold text-[color:var(--variable-collection-dark2)] text-[17px] tracking-[0] leading-[normal] line-clamp-2">
                {tour.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 justify-start relative self-stretch w-full flex-[0_0_auto]">
            {tour.features.slice(0, 4).map((item) => (
              <div
                key={item.code}
                className="inline-flex flex-col items-center gap-[4.96px] relative flex-[0_0_auto]">
                {getTourFeatureIcon(item.code)}
                <div className="relative w-[47px] h-[18px] [font-family:'Netflix_Sans-Regular',_Helvetica] font-normal text-[color:var(--variable-collection-dark2)] text-[7.4px] text-center tracking-[0] leading-[normal]">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-start gap-3 line-clamp-1">
            {tour.verticals.slice(0, 1).map((vertical) => (
              <div
                key={vertical.id}
                className="inline-flex items-center justify-center gap-[8px] px-[16px] py-[6px] relative flex-[0_0_auto] bg-[color:var(--variable-collection-hover-blue)] rounded-[8px]">
                <Building className="!relative !w-[16px] !h-[16px] text-[color:var(--variable-collection-dark)]" />
                <span className="relative w-fit mt-[-0.50px] [font-family:'Netflix_Sans-Medium',_Helvetica] font-medium text-[color:var(--variable-collection-dark2)] text-[12px] tracking-[0] leading-[normal]">
                  {vertical.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-[4.96px] relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative self-stretch mt-[-0.62px] [font-family:'Netflix_Sans-Regular',_Helvetica] font-normal text-[color:var(--variable-collection-dark2)] text-[12px] tracking-[0] leading-[normal] line-clamp-3">
              {tour.about}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end relative self-stretch w-full flex-[0_0_auto]">
          {isButtonShowed ? (
            <div className="inline-flex items-end justify-end gap-[4px] relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start justify-center gap-[2px] relative self-stretch flex-[0_0_auto]">
                <span className="relative w-fit [font-family:'Netflix_Sans-Medium',_Helvetica] font-medium text-[color:var(--variable-collection-blue-2)] text-[12px] tracking-[0] leading-[10px]">
                  Starting From:
                </span>
              </div>
              <span className="relative w-fit mt-[-1.00px] [font-family:'Netflix_Sans_-Bold',_Helvetica] font-bold text-[color:var(--variable-collection-green)] text-[24px] tracking-[0] leading-[normal]">
                {
                  Currencies.find(
                    (item) =>
                      item.code === (localStorage.getItem('curr') ?? 'USD')
                  )?.symbol
                }
                {tour.retail_price.value}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center justify-end gap-[4px] relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start justify-center gap-[2px] relative self-stretch flex-[0_0_auto]">
                <div className="relative w-fit [font-family:'Netflix_Sans-Medium',_Helvetica] font-medium text-[color:var(--variable-collection-blue-2)] text-[18px] tracking-[0] leading-[10px]">
                  Starting From:
                </div>
              </div>
              <div className="relative w-fit mt-[-1.00px] [font-family:'Netflix_Sans_-Bold',_Helvetica] font-bold text-[color:var(--variable-collection-green)] text-[24px] tracking-[0] leading-[normal]">
                {
                  Currencies.find(
                    (item) =>
                      item.code === (localStorage.getItem('curr') ?? 'USD')
                  )?.symbol
                }
                {tour.retail_price.value}
              </div>
            </div>
          )}
        </div>
      </Link>
      {tour.sold_out ? (
        <button
          onClick={() => {
            toast.error('This Tour is SOLD OUT, Please Select Another tour!');
          }}
          className="flex flex-col h-[30px] items-center justify-center gap-[5.61px] px-[83.53px] py-[7.85px] relative self-stretch w-full bg-gray-700">
          <span className="relative w-fit mt-[-2.09px] [font-family:'Netflix_Sans_-Bold',_Helvetica] font-bold text-red-600 text-[11.2px] tracking-[0] leading-[normal] cursor-pointer">
            Sold out
          </span>
        </button>
      ) : (
        <>
          {isButtonShowed ? (
            <ButtonWithLoader loading={buttonLoading}>
              <button
                onClick={checkAvailability}
                className="flex flex-col h-[30px] items-center justify-center gap-[5.61px] px-[83.53px] py-[7.85px] relative self-stretch w-full bg-[color:var(--variable-collection-blue-2)]">
                <span className="relative w-fit mt-[-2.09px] [font-family:'Netflix_Sans_-Bold',_Helvetica] font-bold text-[color:var(--variable-collection-white)] text-[11.2px] tracking-[0] leading-[normal] cursor-pointer">
                  Check Availability
                </span>
              </button>
            </ButtonWithLoader>
          ) : null}
        </>
      )}
    </div>
  );
};
