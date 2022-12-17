import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';
import { CUSTOM_TIMEZONE } from 'src/app/_config';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

dayjs.tz.setDefault(CUSTOM_TIMEZONE);

export class DatetimeHelper {
  static create(date = new Date()) {
    return dayjs(date).tz(CUSTOM_TIMEZONE).toDate();
  }

  static now() {
    return dayjs().tz(CUSTOM_TIMEZONE).toDate();
  }

  static formatDateTime(date: Date, formatString: string) {
    return dayjs(date).tz(CUSTOM_TIMEZONE).format(formatString);
  }

  static startOfDay(date: Date) {
    return dayjs(date).startOf('day').toDate();
  }

  static endOfDay(date: Date) {
    return dayjs(date).endOf('day').toDate();
  }

  static isBetween(date: Date, from: any, to: any, unit: any, includeBound: '()' | '[]' | '[)' | '(]' = '[]') {
    return dayjs(date)
      .tz(CUSTOM_TIMEZONE)
      .isBetween(from, to, unit, includeBound);
  }

  static addDate(date: Date, amount: number, unit: dayjs.ManipulateType) {
    return dayjs(date).tz(CUSTOM_TIMEZONE).add(amount, unit).toDate();
  }

  static subtractDate(date: Date, amount: number, unit: dayjs.ManipulateType) {
    return dayjs(date).tz(CUSTOM_TIMEZONE).subtract(amount, unit).toDate();
  }

  static convertToMilliseconds(date: Date, range = 0) {
    return dayjs(date).millisecond(range);
  }

  static formatSecondDuration(givenSeconds: number) {
    // if given less than 1 hour -> "mm:ss", otherwise "hh:mm:ss"
    if (givenSeconds < 3600) {
      return new Date(givenSeconds * 1000).toISOString().slice(14, 19);
    }

    return new Date(givenSeconds * 1000).toISOString().slice(11, 19);
  }

  static formatMilliSecondDuration(givenMilliSeconds: number) {
    // if given less than 1 hour -> "mm:ss", otherwise "hh:mm:ss"
    if (givenMilliSeconds < 3_600_000) {
      return new Date(givenMilliSeconds).toISOString().slice(14, 19);
    }

    return new Date(givenMilliSeconds).toISOString().slice(11, 19);
  }
}
