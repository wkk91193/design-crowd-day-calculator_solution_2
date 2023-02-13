import { PublicHolidayRule } from './models';
import { ruleCheckFunction } from './utils';

const millisecondsPerDay = 86400 * 1000; // Day in milliseconds

export default class DayCounter {
  getWeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    // Validate input
    if (secondDate < firstDate) return 0;

    firstDate = firstDate.addDays(1);
    secondDate = secondDate.addDays(-1);

    // Calculate days between dates
    firstDate.setHours(0, 0, 0, 1); // Start just after midnight
    secondDate.setHours(23, 59, 59, 999); // End just before midnight
    const diff = secondDate.getTime() - firstDate.getTime(); // Milliseconds between datetime objects
    let days = Math.ceil(diff / millisecondsPerDay);

    // Subtract two weekend days for every week in between
    const weeks = Math.floor(days / 7);
    days = days - weeks * 2;

    // Handle special cases
    const startDay = firstDate.getDay();
    const endDay = secondDate.getDay();

    // Remove weekend not previously removed.
    if (startDay - endDay > 1) days = days - 2;

    return days;
  }
  BusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays?: Date[],
    rules?: PublicHolidayRule[]
  ): number {
    if (firstDate.toDateString() === secondDate.toDateString()) return 0;

    let businessDaysCount = this.getWeekdaysBetweenTwoDates(firstDate, secondDate);

    // public holiday array validation
    const validatedPublicHolidays = [];
    publicHolidays?.forEach((h) => {
      if (h.isWeekday() && h > firstDate && h < secondDate) validatedPublicHolidays.push(h);
    });

    businessDaysCount -= validatedPublicHolidays.length;

    let holidaysCalculatedByRules = 0;
    rules?.forEach((rule) => {
      const numberOfHolidays = ruleCheckFunction(firstDate, secondDate, rule);

      if (numberOfHolidays) holidaysCalculatedByRules += numberOfHolidays;
    });

    businessDaysCount -= holidaysCalculatedByRules;

    return businessDaysCount;
  }
}