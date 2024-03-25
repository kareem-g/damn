import {Marker, Search} from 'assets/icons';
import TourBookingFlowLoader from 'components/Loader/TourBookingFlowLoader';
import SubSearchBar from 'components/SubSearchBar/SubSearchBar';
import {TourCard} from 'components/TourCard/TourCard';
import {getTourAvailableDates} from 'middlewares/getTourAvailableDates.middleware';
import {Tabs} from 'models/tabs';
import {ITour} from 'models/tour';
import React from 'react';
import {Input, InputGroup} from 'rsuite';
import {changeCurrentTab} from 'slices/appFunctionality.slice';
import {
  selectPickupUuid,
  setTourAvailableDates,
  toursState,
} from 'slices/tour.slice';
import {useAppDispatch, useAppSelector} from 'store/hook';
import ErrorHandler from 'utils/errorHandler';
import http from 'utils/http';

const styles = {
  margin: 10,
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  paddingInline: 10,
  paddingBlock: 5,
  minWidth: 400,
};

type Props = {
  tour: ITour;
};
const CustomInputGroupWidthButton = ({
  placeholder,
  ...props
}: {
  placeholder: string;
}) => (
  <InputGroup
    {...props}
    inside
    style={styles}
    size={'md'}
    className="flex items-center justify-center">
    <Input
      placeholder={placeholder}
      className="focus:border-none focus:ring-0 ring-transparent"
      style={{border: 'none', outline: 'none', width: 380}}
    />
    <button>
      <Search />
    </button>
  </InputGroup>
);

const TourPickup: React.FC<Props> = ({tour}) => {
  const dispatch = useAppDispatch();
  const {loading, selectedTourPickupPoints} = useAppSelector(toursState);

  if (loading) {
    return <TourBookingFlowLoader />;
  }
  return (
    <div className="bg-[color:var(--variable-main-theme-background)] ">
      <SubSearchBar
        searchingFor="Paris, France"
        title="Select Pick up point to continue booking!"
      />
      <div className="flex lg:flex-row flex-col items-start justify-start ml-[24px] pb-10">
        <TourCard tour={tour} isButtonShowed={false} />
        <div className="mx-10">
          <div className="flex items-center justify-start text-[color:var(--variable-collection-blue-2)] mx-2">
            <Marker />
            <span className=" [font-family:var(--netflix-18-font-family)] font-[number:var(--netflix-18-font-weight)] text-[color:var(--variable-collection-blue-2)] text-[length:var(--netflix-18-font-size)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] whitespace-nowrap [font-style:var(--netflix-18-font-style)]">
              Pick-up Point
            </span>
          </div>
          <CustomInputGroupWidthButton placeholder="Search" />
          <div className="bg-white w-[400px] flex flex-col items-start justify-start text-left  m-4 rounded-md">
            {selectedTourPickupPoints?.map((item) => (
              <button
                key={item.uuid}
                onClick={() => {
                  const getTourDatesWithPickups = async () => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const response: any = await http.get<any, any>(
                      `/activities/${tour.uuid}/dates?pickup=${item.uuid}`
                    );

                    if (response.data?.length > 0) {
                      dispatch(selectPickupUuid(item.uuid));
                      dispatch(
                        getTourAvailableDates({
                          uuid: tour.uuid,
                          pickupUuid: item.uuid,
                        })
                      ).then((res) => {
                        ErrorHandler(res);
                        dispatch(changeCurrentTab(Tabs.TOUR_DATE_SELECTION));
                      });
                    }
                  };
                  getTourDatesWithPickups();
                  const dates = async () => {
                    const response: any = await http.get(
                      `/activities/${tour.uuid}/dates`
                    );

                    setTourAvailableDates(response.data);
                    dispatch(changeCurrentTab(Tabs.TOUR_DATE_SELECTION));
                  };

                  dates();
                }}
                className="px-5 py-3 border-b-2 text-left w-full">
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPickup;
