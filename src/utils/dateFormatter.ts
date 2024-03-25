import dayjs, {Dayjs} from 'dayjs';
import {format} from 'date-fns';

export enum IDateFormat {
  NORMAL = 'normal',
  TIMESTAMP = 'timestamp',
  ISO = 'iso',
  DAYJS = 'dayjs',
  STRING = 'string',
}

const dateType = (
  date: number,
  dateFormat: IDateFormat,
  stringDateFormatOptions?: Intl.DateTimeFormatOptions
): string | number | Date | Dayjs => {
  switch (dateFormat) {
    case IDateFormat.NORMAL:
      return format(date, 'yyyy-MM-dd') as string;
    case IDateFormat.TIMESTAMP:
      return date as number;
    case IDateFormat.ISO:
      return new Date(date) as Date;
    case IDateFormat.DAYJS:
      return dayjs(format(date, 'yyyy-MM-dd')) as Dayjs;
    case IDateFormat.STRING:
      return new Date(date).toLocaleDateString('en-US', {
        ...(stringDateFormatOptions && stringDateFormatOptions),
      }) as string;
    default:
      return date as number;
  }
};
export const dateFormatter = (
  date: Date | Dayjs | string | number,
  dateFormat: IDateFormat,
  stringDateFormatOptions?: Intl.DateTimeFormatOptions
) => {
  if (date instanceof Date) {
    return dateType(
      new Date(date).getTime(),
      dateFormat,
      stringDateFormatOptions
    );
  } else if (dayjs.isDayjs(date)) {
    switch (dateFormat) {
      case IDateFormat.NORMAL:
        return format(date.toDate(), 'yyyy-MM-dd') as string;
      case IDateFormat.TIMESTAMP:
        return date.unix() as number;
      case IDateFormat.ISO:
        return date.toDate() as Date;
      case IDateFormat.DAYJS:
        return dayjs(format(date.toDate(), 'yyyy-MM-dd')) as Dayjs;
      case IDateFormat.STRING:
        return date.toDate().toLocaleDateString('en-US', {
          ...(stringDateFormatOptions && stringDateFormatOptions),
        }) as string;
      default:
        return date.unix() as number;
    }
  } else {
    switch (typeof date) {
      case 'string':
        return dateType(
          new Date(date).getTime(),
          dateFormat,
          stringDateFormatOptions
        );
      case 'number':
        return dateType(date, dateFormat, stringDateFormatOptions);

      default:
        return dateType(date, dateFormat, stringDateFormatOptions);
    }
  }
};
