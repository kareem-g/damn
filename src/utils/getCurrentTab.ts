import {IBookingType} from 'models/enums/BookingType';
import {Tabs} from 'models/tabs';
import {ITour} from 'models/tour';

export const getCurrentTab = (tour: ITour) => {
  const returned: {[key: string]: any} = {
    [IBookingType.CALENDAR_TIMESLOTS]: Tabs.TOUR_DATE_SELECTION,
    [IBookingType.CALENDAR_NO_TIMESLOTS]: Tabs.TOUR_DATE_SELECTION,
    [IBookingType.NO_CALENDAR_FIXED_END]: Tabs.TOUR_OPTIONS,
  };
  return returned[tour.booking_type] ?? Tabs.TOUR_DATE_SELECTION;
};
