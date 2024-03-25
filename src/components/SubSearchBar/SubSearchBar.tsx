import {Person, Compass} from 'assets/icons';
import React from 'react';
import './style.css';
import {useAppSelector} from 'store/hook';
import {toursState} from 'slices/tour.slice';

type Props = {
  title: string;
  searchingFor: string;
};

const SubSearchBar: React.FC<Props> = ({title, searchingFor}) => {
  const {loading} = useAppSelector(toursState);
  return (
    <div>
      <div className="flex items-center justify-start px-[24px] gap-5 py-[18px]">
        <img src={Person} />
        <span>{searchingFor}</span>
      </div>
      <div className="flex items-center justify-start px-[24px] gap-5 py-[18px] border-t-2 border-gray-300">
        <img src={Compass} className={'compass' + loading ? ' loading' : ''} />
        <span>{title}</span>
      </div>
    </div>
  );
};

export default SubSearchBar;
