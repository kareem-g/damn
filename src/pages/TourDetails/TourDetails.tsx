import {ITour} from 'models/tour';
import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import {selectTour, toursState} from 'slices/tour.slice';
import {useAppDispatch, useAppSelector} from 'store/hook';
import {useLocation, useNavigate} from 'react-router-dom';
import {getSpecificTour} from 'middlewares/getSpecificTour.middleware';
import {MapContainer, TileLayer} from 'react-leaflet';
import MarkerWrapper from 'components/MarkerWrapper/MarkerWrapper';
import {changeCurrentTab} from 'slices/appFunctionality.slice';
import {CircularProgress} from '@mui/material';
import {getTourPickupPoints} from 'middlewares/getTourPickupPoints.middleware';
import ErrorHandler from 'utils/errorHandler';
import {getTourAvailableDates} from 'middlewares/getTourAvailableDates.middleware';
import {getTourMedia} from 'middlewares/getTourMedia.middleware';
import ImageGallery from 'react-image-gallery';
import ReactImageGallery from 'react-image-gallery';
import Fullscreen from './FullScreen';
import {Tabs} from 'models/tabs';
import {getActivityLanguages} from 'middlewares/getActivityLanguages.middleware';
import {checkPickupAvailability} from 'middlewares/checkPickupAvailability.middleware';
import {getCurrentTab} from 'utils/getCurrentTab';
import Currencies from 'assets/currencies.json';

const TourDetails: React.FC = () => {
  // Loading indicator
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // App State
  const state = useAppSelector(toursState);
  const tour = state.selectedTour as ITour;
  const media = state.specificTourMedia;
  const languages = state.selectedTourLanguages;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tourUUID: string | null = searchParams.get('uuid');
  const dispatch = useAppDispatch();
  const images = media.map((item: {url: string}) => ({
    original: item.url,
    thumbnail: item.url,
  }));
  // Pickup point state
  const navigate = useNavigate();

  // ** useEffects
  // Fetching the tour info if it's not available
  useEffect(() => {
    if (media.length === 0) {
      dispatch(getTourMedia({uuid: tourUUID}));
    }
    if (languages.length === 0) {
      dispatch(getActivityLanguages(tourUUID as string));
    }
    if (!tour || tour.uuid !== tourUUID) {
      setIsLoading(true);

      dispatch(getSpecificTour({uuid: tourUUID})).then((res) => {
        setIsLoading(false);
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getTourMedia({uuid: tourUUID}));
          dispatch(getActivityLanguages(tourUUID as string));
          dispatch(selectTour(res.payload));
        }
      });
    }
  }, [tour, tourUUID, dispatch]);
  const imageGalleryRef = useRef<LegacyRef<ReactImageGallery>>();
  const [isGalleryOpened, setIsGalleryOpened] = useState<boolean>(false);
  const toggleImageGallery = () => {
    (imageGalleryRef.current as any).toggleFullScreen();
    setIsGalleryOpened((state) => !state);
  };
  const checkAvailability = () => {
    dispatch(checkPickupAvailability({uuid: tour.uuid})).then((data) => {
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
    });
  };
  return (
    <>
      <ImageGallery
        additionalClass={isGalleryOpened ? 'block' : 'hidden'}
        items={images}
        renderFullscreenButton={(onClick) => (
          <Fullscreen
            onClick={(e) => {
              toggleImageGallery();
              onClick(e);
            }}
          />
        )}
        ref={imageGalleryRef as LegacyRef<ReactImageGallery>}
      />
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-[16px] p-[16px] bg-[color:var(--variable-collection-white)] pb-20">
          {/* Section 1 */}
          <div className="flex flex-row w-full h-[400px] items-start overflow-hidden rounded-lg">
            <img
              className=" self-stretch w-9/12 h-[400px] object-cover object-center"
              alt="Unsplash gmshok"
              src={tour?.cover_image_url}
            />
            <div className="w-3/12 grid grid-cols-2 items-center justify-center">
              {media.slice(0, 4).map((item, index) => {
                if (index === 3) {
                  return (
                    <button onClick={toggleImageGallery} className="relative">
                      <img
                        key={item.id}
                        src={item.url}
                        alt={item.title}
                        className="w-full h-[200px] cols-span-1 object-cover object-center"
                      />
                      <div className="absolute z-0 top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="absolute z-10 top-0 left-0 w-full bg-black h-full opacity-50" />
                        <p className="text-white font-semibold relative z-30 text-4xl">
                          {media.length - 4}+
                        </p>
                      </div>
                    </button>
                  );
                } else {
                  return (
                    <img
                      key={item.id}
                      src={item.url}
                      alt={item.title}
                      className="w-full h-[200px] cols-span-1 object-cover object-center"
                    />
                  );
                }
              })}
            </div>
          </div>
          {/* Sction 2 */}
          <div className="flex items-center justify-between px-[5px] lg:px-[24px] py-0 relative self-stretch w-full flex-[0_0_auto] md:flex-row flex-col-reverse">
            <>
              <button
                onClick={checkAvailability}
                className="flex flex-col w-full lg:w-[879px] h-[32px] items-center justify-center gap-[5.61px] px-[83.53px] py-s[7.85px] relative bg-[color:var(--variable-collection-blue-2)] rounded-[8px] overflow-hidden">
                <div className="relative w-fit mt-[-1.09px] [font-family:'Netflix_Sans_-Bold',Helvetica] font-bold text-[color:var(--variable-collection-white)] text-[11.2px] tracking-[0] leading-[normal]">
                  Check Availability
                </div>
              </button>
            </>
            {/* )} */}
            <div className="inline-flex items-end justify-end gap-[4px] relative flex-[0_0_auto]">
              <div className="flex flex-col w-[88px] items-start justify-end gap-[2px] px-0 py-[9px] relative self-stretch">
                <div className="relative w-fit [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[color:var(--variable-collection-dark)] text-[12px] tracking-[0] leading-[12px] whitespace-nowrap">
                  Starting From:
                </div>
              </div>
              <div className="relative w-fit mt-[-1.00px] [font-family:'Netflix_Sans_-Bold',Helvetica] font-bold text-[color:var(--variable-collection-green)] text-[32px] tracking-[0] leading-[normal]">
                {
                  Currencies.find(
                    (item) =>
                      item.code === localStorage.getItem('curr') ?? 'USD'
                  )?.symbol
                }{' '}
                {tour?.retail_price.value}
              </div>
            </div>
          </div>
          {/* Section 3 */}
          <div className="flex flex-col items-start gap-[24px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-[15px] px-[5px] lg:px-[24px] py-0 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative flex-1 self-stretch mt-[-1.00px] [font-family:'Netflix_Sans_-Bold',Helvetica] font-bold text-[color:var(--variable-collection-dark2)] text-[24px] tracking-[0] leading-[normal]">
                {tour?.title}
              </p>

              <div className="flex flex-col items-start gap-[4.96px] relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative self-stretch mt-[-0.62px] [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-black)] text-[17px] tracking-[0.5px] leading-6 line-clamp-6 md:line-clamp-none">
                  {tour?.about}
                </p>
              </div>
            </div>
            <div className="flex h-[30px] items-center gap-[24px] px-[5px] lg:px-[24px] py-0 relative self-stretch w-full">
              <div className="inline-flex items-center justify-center gap-[8px] px-[16px] py-[6px] relative flex-[0_0_auto] bg-[color:var(--variable-collection-hover-blue)] rounded-[8px]">
                {/* <Building className="!relative !w-[16px] !h-[16px] text-[color:var(--variable-collection-dark)]" /> */}
                <div className="relative w-fit mt-[-0.50px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[color:var(--variable-collection-dark2)] text-[12px] tracking-[0] leading-[normal]">
                  Museums
                </div>
              </div>
              <div className="inline-flex items-start gap-[12px] relative flex-[0_0_auto]">
                <div className="inline-flex items-center justify-center gap-[8px] px-[16px] py-[6px] relative flex-[0_0_auto] bg-[color:var(--variable-collection-hover-blue)] rounded-[8px]">
                  {/* <Marker className="!relative !w-[16px] !h-[16px] text-[color:var(--variable-collection-blue-2)]" /> */}
                  <div className="relative w-fit mt-[-0.50px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[color:var(--variable-collection-dark2)] text-[12px] tracking-[0] leading-[normal]">
                    Excursions
                  </div>
                </div>
                {/* <div className="inline-flex items-center justify-center gap-[8px] px-[16px] py-[6px] relative flex-[0_0_auto] bg-[color:var(--variable-collection-hover-blue)] rounded-[8px]">
              <Food className="relative w-[16px] h-[16px] text-[color:var(--variable-collection-dark)]" />
              <div className="relative w-fit mt-[-0.50px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[color:var(--variable-collection-dark2)] text-[12px] tracking-[0] leading-[normal]">
                Food &amp; Drink
              </div>
            </div> */}
              </div>
            </div>
            <div className="flex items-start gap-[15px] px-[5px] lg:px-[24px] py-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-[4.96px] relative flex-1 grow">
                <div className="relative w-fit mt-[-0.62px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[color:var(--variable-collection-green)] text-[14px] tracking-[0] leading-[normal]">
                  HIGHLIGHTS
                </div>
                {tour?.highlights.map((item) => (
                  <p
                    key={item}
                    className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                    {item}
                  </p>
                ))}
              </div>
              <div className="flex flex-col items-start gap-[4.96px] relative flex-1 grow">
                <div className="relative w-fit mt-[-0.62px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[color:var(--variable-collection-blue-2)] text-[14px] tracking-[0] leading-[normal]">
                  INCLUDED
                </div>
                {tour?.included.map((item) => (
                  <p
                    key={item}
                    className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                    {item}
                  </p>
                ))}
              </div>
              <div className="flex flex-col items-start gap-[4.96px] relative flex-1 grow">
                <div className="relative w-fit mt-[-0.62px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[#ff461e] text-[14px] tracking-[0] leading-[normal]">
                  NOT INCLUDED
                </div>
                {tour?.not_included.map((item) => (
                  <p
                    key={item}
                    className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-[15px] px-[5px] lg:px-[24px] py-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-[4.96px] relative flex-1 grow">
                <div className="relative w-fit mt-[-0.62px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[color:var(--variable-collection-black)] text-[14px] tracking-[0] leading-[normal]">
                  TERMS
                </div>
                <p className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                  Tour combo with return airport transfer
                </p>
                <div className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                  City Tour
                </div>
                <div className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                  Curious Corner
                </div>
              </div>
              <div className="flex flex-col items-start gap-[4.96px] relative flex-1 grow">
                <div className="relative w-fit mt-[-0.62px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[color:var(--variable-collection-black)] text-[14px] tracking-[0] leading-[normal]">
                  REMEMBER
                </div>
                <p className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                  Tour combo with return airport transfer
                </p>
                <div className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                  City Tour
                </div>
                <div className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                  Curious Corner
                </div>
              </div>
              <div className="flex flex-col items-start gap-[4.96px] relative flex-1 grow">
                <div className="relative w-fit mt-[-0.62px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[color:var(--variable-collection-black)] text-[14px] tracking-[0] leading-[normal]">
                  CANCELLATION POLICY
                </div>
                <p className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                  Tour combo with return airport transfer
                </p>
                <div className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                  City Tour
                </div>
                <div className="relative w-fit opacity-50 [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-dark)] text-[9.9px] tracking-[0] leading-[normal]">
                  Curious Corner
                </div>
              </div>
            </div>
            <div className="flex items-start gap-[15px] px-[5px] lg:px-[24px] py-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-[4.96px] relative flex-1 grow">
                {tour?.where_text ? (
                  <p className="relative w-fit mt-[-0.62px] [font-family:'Netflix_Sans-Medium',Helvetica] font-normal text-[color:var(--variable-collection-black)] text-[14px] tracking-[0] leading-[normal]">
                    <span className="font-medium">Where: </span>
                    <span className="[font-family:'Netflix_Sans-Regular',Helvetica]">
                      {tour?.where_text
                        ?.replace('<p>', '')
                        ?.replace('</p>', '')}
                    </span>
                  </p>
                ) : null}
                <p className="relative w-fit [font-family:'Netflix_Sans-Medium',Helvetica] font-normal text-[color:var(--variable-collection-black)] text-[14px] tracking-[0] leading-[normal]">
                  <span className="font-medium">Meeting Point: </span>
                  <span className="[font-family:'Netflix_Sans-Regular',Helvetica]">
                    {tour?.meeting_point}
                    <br />
                  </span>
                </p>
              </div>
            </div>
            {tour ? (
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <MapContainer
                  center={[tour?.city.latitude, tour?.city.longitude]}
                  zoom={5}
                  zoomControl={false}
                  attributionControl={false}
                  style={{height: '400px', width: '100%'}}
                  scrollWheelZoom={true}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MarkerWrapper
                    lat={tour?.city.latitude}
                    long={tour?.city.longitude}
                  />
                </MapContainer>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default TourDetails;
