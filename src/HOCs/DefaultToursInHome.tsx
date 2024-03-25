import React from 'react';
import {TourCard} from 'components/TourCard/TourCard';
import {Building} from 'assets/icons';
import {ITour} from 'models/tour';
import {ICategory} from 'models/category';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {useAppDispatch, useAppSelector} from 'store/hook';
import {getTours} from 'middlewares/getTours.middleware';
import {functionalityState} from 'slices/appFunctionality.slice';
import {toursState} from 'slices/tour.slice';

type Props = {
  attractionTours: ITour[];
  recommendedTours: ITour[];
  categories: ICategory[];
};

const DefaultToursInHome: React.FC<Props> = ({
  recommendedTours,
  attractionTours,
  categories,
}) => {
  const {error} = useAppSelector(toursState);
  const {coords} = useAppSelector(functionalityState);
  const dispatch = useAppDispatch();
  const handleCategorySearch = (sort_by: string, category: string) => {
    dispatch(
      getTours({
        sort_by,
        category,
        lat: coords.lat,
        long: coords.long,
        offset: coords.offset as string,
      })
    );
  };
  return (
    <div className="ml-[24px] mt-10 space-y-10 pb-10">
      <section className="w-full h-fit  flex flex-col justify-start items-start  gap-6">
        <h1 className="[font-family:'Netflix_Sans_-Bold',_Helvetica] font-bold text-[color:var(--variable-collection-black)] text-[32px] text-left tracking-[0] leading-[24px]">
          Top Attractions
        </h1>

        {recommendedTours.length === 0 && error ? (
          <h2 className="[font-family:'Netflix_Sans_-Bold',_Helvetica] font-bold text-[color:var(--variable-collection-black)] text-[26px] text-left tracking-[0] leading-[24px]">
            No Matching Results for this type of tours!
          </h2>
        ) : null}

        <Swiper
          grabCursor
          loop
          style={{margin: 'auto'}}
          breakpoints={{
            276: {
              width: 620,
              centeredSlides: true,
              slidesPerView: 1,
              spaceBetween: 60,
              autoplay: true,
            },
            700: {
              centeredSlides: false,
              spaceBetween: 150,
              slidesPerView: 2,
            },
            950: {
              centeredSlides: false,
              spaceBetween: 150,
              slidesPerView: 3,
            },
            1280: {
              centeredSlides: false,
              spaceBetween: 150,
              slidesPerView: 4,
            },
            1580: {
              centeredSlides: false,
              spaceBetween: 150,
              slidesPerView: 4,
            },
          }}
          className="w-full">
          {recommendedTours.length > 0 ? (
            recommendedTours.map((tour: ITour) => (
              <SwiperSlide
                key={tour.uuid}
                className="w-full h-full min-h-[400px]">
                <TourCard tour={tour} isButtonShowed={true} />
              </SwiperSlide>
            ))
          ) : (
            <div className="flex items-center justify-start gap-6 w-full overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  role="status"
                  className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                  <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20">
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <div className="flex items-center mt-4 space-x-3">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-700"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              ))}
            </div>
          )}
        </Swiper>

        <div className="flex md:flex-row flex-col items-start md:items-center gap-5 justify-start">
          <p className=" w-[281px] top-0 left-0 [font-family:'Netflix_Sans-Medium',_Helvetica] font-medium text-[color:var(--variable-collection-black)] text-[16px] tracking-[0] leading-[24px]">
            Cant find what you are looking for? Try our filters:
          </p>
          <div className="flex items-center justify-start gap-2 flex-wrap">
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCategorySearch('relevance', item.code)}
                className="inline-flex items-center justify-center gap-[8px] px-[16px] py-[6px] relative flex-[0_0_auto] bg-white rounded-[8px] cursor-pointer border-[1px] border-black">
                <Building className="!relative !w-[16px] !h-[16px] text-black" />
                <span className="relative w-fit mt-[-0.50px] [font-family:'Netflix_Sans-Medium',_Helvetica] font-bold text-black text-[12px] tracking-[0] leading-[normal]">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full h-fit  flex flex-col justify-start items-start  gap-6">
        <h1 className="[font-family:'Netflix_Sans_-Bold',_Helvetica] font-bold text-[color:var(--variable-collection-black)] text-[32px] text-left tracking-[0] leading-[24px]">
          Recommendations
        </h1>
        {recommendedTours.length === 0 ? (
          <h2 className="[font-family:'Netflix_Sans_-Bold',_Helvetica] font-bold text-[color:var(--variable-collection-black)] text-[26px] text-left tracking-[0] leading-[24px]">
            No Matching Results for this type of tours!
          </h2>
        ) : null}

        <Swiper
          grabCursor
          loop
          style={{margin: 'auto'}}
          breakpoints={{
            276: {
              width: 620,
              centeredSlides: true,
              slidesPerView: 1,
              spaceBetween: 60,
              autoplay: true,
            },
            700: {
              centeredSlides: false,
              spaceBetween: 60,
              slidesPerView: 2,
            },
            950: {
              centeredSlides: false,
              spaceBetween: 150,
              slidesPerView: 3,
            },
            1280: {
              centeredSlides: false,
              spaceBetween: 150,
              slidesPerView: 4,
            },
            1580: {
              centeredSlides: false,
              spaceBetween: 150,
              slidesPerView: 4,
            },
          }}
          className="w-full">
          {attractionTours.length > 0 ? (
            attractionTours.map((tour: ITour) => (
              <SwiperSlide
                key={tour.uuid}
                className="w-full h-full min-h-[400px]">
                <TourCard tour={tour} isButtonShowed={true} />
              </SwiperSlide>
            ))
          ) : (
            <div className="flex items-center justify-start gap-6 w-full overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  role="status"
                  className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                  <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20">
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <div className="flex items-center mt-4 space-x-3">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-700"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              ))}
            </div>
          )}
        </Swiper>
        <div className="flex md:flex-row flex-col items-start md:items-center gap-5 justify-start">
          <p className=" w-[281px] top-0 left-0 [font-family:'Netflix_Sans-Medium',_Helvetica] font-medium text-[color:var(--variable-collection-black)] text-[16px] tracking-[0] leading-[24px]">
            Cant find what you are looking for? Try our filters:
          </p>
          <div className="flex items-center justify-start gap-2 flex-wrap">
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCategorySearch('rating', item.code)}
                className="inline-flex items-center justify-center gap-[8px] px-[16px] py-[6px] relative flex-[0_0_auto] bg-white rounded-[8px] cursor-pointer border-[1px] border-black">
                <Building className="!relative !w-[16px] !h-[16px] text-black" />
                <span className="relative w-fit mt-[-0.50px] [font-family:'Netflix_Sans-Medium',_Helvetica] font-bold text-black text-[12px] tracking-[0] leading-[normal]">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DefaultToursInHome;
