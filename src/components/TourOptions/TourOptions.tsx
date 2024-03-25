import {TourCard} from 'components/TourCard/TourCard';
import {Tabs} from 'models/tabs';
import {ITour} from 'models/tour';
import React from 'react';
import {changeCurrentTab} from 'slices/appFunctionality.slice';
import {useAppDispatch, useAppSelector} from 'store/hook';
import OptionWrapper from './OptionWrapper';
import SubSearchBar from 'components/SubSearchBar/SubSearchBar';
import {selectTourGroupSlots, toursState} from 'slices/tour.slice';
import TourBookingFlowLoader from 'components/Loader/TourBookingFlowLoader';
import {clearTicketsAndTotal} from 'slices/checkout.slice';

type Props = {tour: ITour};

const TourOptions: React.FC<Props> = ({tour}) => {
  const dispatch = useAppDispatch();
  const {groupSlots, selectedGroupSlots, selectedTourDate, loading} =
    useAppSelector(toursState);
  const onOptionClicked = (item: any) => {
    dispatch(clearTicketsAndTotal());
    dispatch(selectTourGroupSlots(item));
    dispatch(changeCurrentTab(Tabs.TOUR_OPTION_PREFERENCES));
  };
  console.log(groupSlots);

  if (
    loading ||
    groupSlots?.groups?.length === 0 ||
    selectedGroupSlots?.length === 0
  ) {
    return <TourBookingFlowLoader />;
  }
  if (groupSlots === undefined) {
    return (
      <div className="w-full flex items-center justify-center my-10">
        <h1 className="font-bold capitalize ">
          No Slots Available For the Selected Date
        </h1>
      </div>
    );
  }
  return (
    <div className="bg-[color:var(--variable-main-theme-background)]">
      <SubSearchBar
        searchingFor="Paris, France"
        title="Choose one option to continue your booking!"
      />
      <div className="flex lg:flex-row flex-col items-start justify-start ml-[24px] pb-10">
        <TourCard tour={tour} isButtonShowed={false} />
        <div className="mx-10">
          <div className="flex items-center justify-start text-[color:var(--variable-collection-blue-2)] mx-2">
            <p className=" w-[596px]  [font-family:var(--netflix-18-font-family)] font-[number:var(--netflix-18-font-weight)] text-transparent text-[length:var(--netflix-18-font-size)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] [font-style:var(--netflix-18-font-style)]">
              <span className="text-[--variable-collection-dark]  [font-family:var(--netflix-18-font-family)] [font-style:var(--netflix-18-font-style)] font-[number:var(--netflix-18-font-weight)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] text-[length:var(--netflix-18-font-size)]">
                Choose an Option for -{' '}
              </span>
              <span className="text-[#1e90ff] [font-family:var(--netflix-18-font-family)] [font-style:var(--netflix-18-font-style)] font-[number:var(--netflix-18-font-weight)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] text-[length:var(--netflix-18-font-size)]">
                {selectedTourDate?.toString()}
              </span>
            </p>
          </div>

          <div className="flex flex-col items-start justify-start text-center gap-5  m-4 rounded-md">
            {groupSlots?.groups?.map((item) => (
              <OptionWrapper
                key={item.feature_code}
                items={item.slots.map((item) => item.tags).flat()}
                price={item.slots[0].products[0].retail_price.value}
                title={item.name}
                onClick={() => onOptionClicked(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourOptions;
