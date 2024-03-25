import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {PickersDay, PickersDayProps} from '@mui/x-date-pickers';
import {isSameDay} from 'date-fns';
import React, {useState} from 'react';
import {PickerSelectionState} from '@mui/x-date-pickers/internals';
import {useAppSelector} from 'store/hook';
import {toursState} from 'slices/tour.slice';
import {Dayjs} from 'dayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {IDateFormat, dateFormatter} from 'utils/dateFormatter';

interface Props {
  onChange: (
    value: Date | Dayjs | null,
    selectionState?: PickerSelectionState | undefined
  ) => void;
  value: any;
  onOkClicked: (date: Dayjs) => void;
}

const Calender: React.FC<Props> = ({value, onChange, onOkClicked}) => {
  const {selectedTourAvailableDates} = useAppSelector(toursState);
  const [date, setDate] = useState<Dayjs | null>(null);
  const CustomDay = (props: PickersDayProps<Date>) => {
    const matchedStyles = selectedTourAvailableDates.reduce((a, v) => {
      return isSameDay(new Date(props.day), new Date(v))
        ? {color: '#1E90FF', fontSize: 15}
        : a;
    }, {});
    return (
      <PickersDay
        {...props}
        selected={
          dateFormatter(value, IDateFormat.TIMESTAMP) ===
          dateFormatter(props.day, IDateFormat.TIMESTAMP)
        }
        disabled={
          !selectedTourAvailableDates.includes(
            dateFormatter(props.day, IDateFormat.NORMAL) as string
          )
        }
        sx={{...matchedStyles}}
      />
    );
  };

  return (
    <div className="bg-white py-2 flex flex-col items-end justify-center rounded-md">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          fixedWeekNumber={6}
          disablePast
          dayOfWeekFormatter={(_, value) => {
            return `${new Date(value).toLocaleDateString('en-US', {
              weekday: 'short',
            })}` as string;
          }}
          onChange={(
            value: Date | Dayjs | null,
            selectionState: PickerSelectionState | undefined
          ) => {
            setDate(value as Dayjs);
            onChange(value, selectionState);
            onOkClicked(date as Dayjs);
          }}
          views={['day', 'month', 'year']}
          openTo="day"
          value={value}
          slots={{day: CustomDay}}
        />
      </LocalizationProvider>

      {/* <button
        onClick={() => onOkClicked(date as Dayjs)}
        className="mx-5 bg-[--variable-collection-blue-2] text-[--variable-collection-white] px-4 py-1.5 rounded-lg"
        disabled={!selectedTourAvailableDates}>
        OK
      </button> */}
    </div>
  );
};
export default Calender;
