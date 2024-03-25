import {TourCard} from 'components/TourCard/TourCard';
import React from 'react';
import {toursState} from 'slices/tour.slice';
import {useAppSelector} from 'store/hook';

const LikedTours: React.FC = () => {
  const {favTours} = useAppSelector(toursState);
  console.log(favTours);
  return (
    <div>
      <h1 className="text-2xl font-bold">Favorite Tours</h1>
      <div className="flex items-center justify-center gap-10 my-10 flex-wrap">
        {favTours.map((item, i) => (
          <TourCard tour={item} key={item.uuid + i} isButtonShowed />
        ))}
      </div>
    </div>
  );
};

export default LikedTours;
