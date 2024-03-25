import {PlaneRight} from 'assets/icons';
import {getTours} from 'middlewares/getTours.middleware';
import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {emptyToursArray} from 'slices/tour.slice';
import {useAppDispatch} from 'store/hook';
import cities from 'assets/cities.json';
import {getToursInACity} from 'middlewares/getToursInACity.middleware';
interface Props {
  className: string;
}

export const SearchInput: React.FC<Props> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const handleSearch = () => {
    console.log(ref.current?.value);
    const target = cities.data.find((item) =>
      item.code.includes(ref.current?.value.toLocaleLowerCase() as string)
    );
    if (target) {
      dispatch(
        getToursInACity({
          city_in: target.id,
          limit: 50,
          sort_by: 'city-relevance',
        })
      );
    } else {
      dispatch(getTours({query: ref.current?.value, limit: 50}));
    }
    navigate('/tours');
  };
  const handleKeyClicked = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        handleSearch();
        break;
      case 'Escape':
        if (ref.current) {
          dispatch(emptyToursArray());
          ref.current.value = '';
        }
        break;
      default:
        break;
    }
  };
  return (
    <div
      className={`w-full flex flex-col items-center gap-[10px] rounded-[16px] relative ${'p-[10px]'} ${'bg-[#58abfd33]'} my-6 ml-3`}>
      <div className="bg-white w-full flex self-stretch items-start gap-[8px] flex-[0_0_auto] shadow-lg shadow-[color:var(--layer-style)] p-[10px] rounded-[8px]  backdrop-blur-[20px] backdrop-brightness-[100%] relative">
        <div className="flex flex-wrap items-center grow flex-1 gap-[var(--spacing-8)] pl-[var(--spacing-8)] pr-0 py-0 rounded-[8px] relative">
          <div className=" flex-col items-start grow flex-1 rounded-[8px] justify-center relative">
            <input
              onKeyDown={(e) => handleKeyClicked(e)}
              className={`[font-family:'Inter-Regular',_Helvetica] self-stretch mt-[-1.00px] outline-none border-none w-full tracking-[0] text-[18px] font-normal leading-[24px] !shadow-none !ring-0 placeholder:text-xl placeholder:font-medium  relative ${'text-[#120f4366]'}`}
              ref={ref}
              placeholder="Where To?"
            />
          </div>
          <PlaneRight
            className="!flex-[0_0_auto] cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};
