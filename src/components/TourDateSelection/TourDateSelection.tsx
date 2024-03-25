import Calender from 'components/Calender/Calender';
import SubSearchBar from 'components/SubSearchBar/SubSearchBar';

import {TourCard} from 'components/TourCard/TourCard';
import {format} from 'date-fns';
import dayjs, {Dayjs} from 'dayjs';
import {getTourDatePrices} from 'middlewares/getSelectedDatePrices.middleware';
import {OrderBoxElement} from 'models/enums/OrderBoxElement.enum';
import {Tabs} from 'models/tabs';
import {ITour} from 'models/tour';
import {IGroupSlots} from 'models/tourGroups';
import React, {useEffect} from 'react';
import {changeCurrentTab} from 'slices/appFunctionality.slice';
import {
  selectTourDate,
  selectTourGroupSlots,
  toursState,
} from 'slices/tour.slice';
import {useAppDispatch, useAppSelector} from 'store/hook';
import ErrorHandler from 'utils/errorHandler';

type Props = {
  tour: ITour;
  pickupUuid?: string;
};

const TourDateSelection: React.FC<Props> = ({tour}) => {
  const dispatch = useAppDispatch();
  const {
    selectedTourDate,
    selectedTourAvailableDates,
    loading,
    selectedPickupUuid,
  } = useAppSelector(toursState);

  const onOKClicked = () => {
    if (
      tour.order_box_elements.includes(OrderBoxElement.TOURS_WITH_PICKUP_POINTS)
    ) {
      dispatch(
        getTourDatePrices({
          tourDate: format(selectedTourDate.toDate(), 'yyyy-MM-dd'),
          uuid: tour.uuid,
          pickup: selectedPickupUuid,
        })
      ).then((res: any) => {
        ErrorHandler(res);

        if ((res.payload as IGroupSlots)?.groups?.length !== 0) {
          if (res?.payload[0]?.groups.length > 0) {
            dispatch(selectTourGroupSlots(res?.payload[0]?.groups));
          }
          dispatch(changeCurrentTab(Tabs.TOUR_OPTION_PREFERENCES));
        } else {
          dispatch(changeCurrentTab(Tabs.TOUR_OPTIONS));
        }
      });
    } else {
      dispatch(
        getTourDatePrices({
          uuid: tour.uuid,
          tourDate: format(selectedTourDate.toDate(), 'yyyy-MM-dd'),
        })
      ).then((res: any) => {
        ErrorHandler(res);

        if ((res?.payload as IGroupSlots)?.groups?.length === 0) {
          // console.log("TOUR_OPTION_PREFERENCES");
        } else {
          dispatch(selectTourGroupSlots(res?.payload[0]));
          // console.log("TOUR_OPTIONS");
          dispatch(changeCurrentTab(Tabs.TOUR_OPTIONS));
        }
      });
    }
  };

  const onDateChange = (value: Date | Dayjs | null) => {
    dispatch(selectTourDate(value));
  };

  useEffect(() => {
    onDateChange(dayjs(selectedTourAvailableDates[0]));
  }, [selectedTourAvailableDates.length]);

  return (
    <div className="bg-[color:var(--variable-main-theme-background)] ">
      <SubSearchBar searchingFor="Paris, France" title="Select Date" />
      {loading ? (
        <div
          role="status"
          className="space-y-2.5 animate-pulse max-w-lg m-10 pb-10">
          <div className="flex items-center w-full space-x-2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[480px]">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[400px]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[480px]">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[440px]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[360px]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex lg:flex-row flex-col items-center justify-center lg:items-start lg:justify-start lg:ml-[24px] gap-10 pb-10">
          <TourCard tour={tour} isButtonShowed={false} />
          <div className="lg:mx-10  lg:-mt-[30px] flex flex-col gap-3 items-start">
            <span className=" [font-family:var(--netflix-18-font-family)] font-[number:var(--netflix-18-font-weight)] text-[color:var(--variable-collection-blue-2)] text-[length:var(--netflix-18-font-size)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] whitespace-nowrap [font-style:var(--netflix-18-font-style)] ">
              Select any of the available dates:
            </span>

            <Calender
              value={dayjs(
                selectedTourDate ?? format(new Date(), 'yyyy-MM-dd')
              )}
              onChange={onDateChange}
              onOkClicked={onOKClicked}
              // soldOut={tour.sold_out}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDateSelection;
