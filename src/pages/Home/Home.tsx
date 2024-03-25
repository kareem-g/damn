import './styles.css';
import {useAppSelector} from 'store/hook';
import {toursState} from 'slices/tour.slice';
import DefaultToursInHome from 'HOCs/DefaultToursInHome';
import React from 'react';
import {Tabs} from 'models/tabs';
import TourPickup from 'components/TourPickup/TourPickup';
import {ITour} from 'models/tour';
import TourDateSelection from 'components/TourDateSelection/TourDateSelection';
import TourOptions from 'components/TourOptions/TourOptions';
import TourOptionPreferences from 'components/TourOptionPreferences/TourOptionPreferences';
import {functionalityState} from '../../slices/appFunctionality.slice';

const Home = () => {
  const appFunctionality = useAppSelector(functionalityState);
  const state = useAppSelector(toursState);

  const getPageContent = () => {
    const returned: {[key: string]: React.ReactNode} = {
      [Tabs.TOUR_HOME]: (
        <DefaultToursInHome
          attractionTours={state.attractionTours}
          recommendedTours={state.recommendedTours}
          categories={state.categories}
        />
      ),
      [Tabs.TOUR_PICKUP]: <TourPickup tour={state.selectedTour as ITour} />,
      [Tabs.TOUR_DATE_SELECTION]: (
        <TourDateSelection
          tour={state.selectedTour as ITour}
          pickupUuid={state.selectedPickupUuid}
        />
      ),
      [Tabs.TOUR_OPTIONS]: <TourOptions tour={state.selectedTour as ITour} />,
      [Tabs.TOUR_OPTION_PREFERENCES]: (
        <TourOptionPreferences tour={state.selectedTour as ITour} />
      ),
    };
    return returned[appFunctionality.currentTab];
  };
  return (
    <div className="w-full md:w-[calc(100vw-295px)] h-full">
      {getPageContent()}
    </div>
  );
};

export default Home;
