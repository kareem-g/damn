import TourBookingFlowLoader from 'components/Loader/TourBookingFlowLoader';
import SubSearchBar from 'components/SubSearchBar/SubSearchBar';
import Ticket from 'components/Ticket/Ticket';

import {TourCard} from 'components/TourCard/TourCard';

import {ITour} from 'models/tour';
import React from 'react';
import {toursState} from 'slices/tour.slice';
import {useAppSelector} from 'store/hook';

type Props = {
  tour: ITour;
};

const TourOptionPreferences: React.FC<Props> = ({tour}: Props) => {
  const {selectedGroupSlots, loading} = useAppSelector(toursState);

  if (loading) {
    return <TourBookingFlowLoader />;
  }

  const selectedTourGroupSlotsArray = Array.isArray(selectedGroupSlots)
    ? selectedGroupSlots // Do not put in an array again if it is already an array.
    : Array(selectedGroupSlots); // Put it in an array if it is not already an array.

  return (
    <div className="w-full bg-[color:var(--variable-main-theme-background)]">
      <SubSearchBar
        searchingFor="Paris, France"
        title="Choose one option to continue your booking!"
      />
      <div className="flex lg:flex-row flex-col items-start justify-start pl-[24px] pb-10">
        <TourCard tour={tour} isButtonShowed={false} />
        <div className="w-full mx-10">
          {selectedTourGroupSlotsArray?.map((slot: any) => (
            <Ticket
              groupItem={slot}
              key={slot.feature_code + '-' + tour.uuid}
              tour={tour}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourOptionPreferences;
