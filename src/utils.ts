import { DayOfWeek, NthDayOfMonth, PublicHolidayRule } from './models';

Date.prototype.addDays = function (days: number) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);

  return date;
};

Date.prototype.isWeekday = function (): boolean {
  const date = new Date(this.valueOf());

  return date.getDay() !== 0 && date.getDay() !== 6;
};

Date.prototype.getNextMonday = function (): Date {
  let date = new Date(this.valueOf());

  while (date.getDay() !== 1) {
    date = date.addDays(1);
  }

  return date;
};

Date.prototype.getNthDayOfMonth = function (dayNumber: DayOfWeek, nth: NthDayOfMonth): Date {
  const date = new Date(this.valueOf());

  // Create new date for 1st of month
  const d = new Date(date.getFullYear(), date.getMonth());
  // Move to first instance of day in month and
  // add (n - 1) weeks
  d.setDate(1 + ((7 - d.getDay() + dayNumber) % 7) + (nth - 1) * 7);

  return d;
};

export const ruleCheckFunction = (firstDate: Date, secondDate: Date, rule: PublicHolidayRule) => {
  let holidayCounter = 0;
  let currentYear = firstDate.getFullYear();
  const endYear = secondDate.getFullYear();

  while (currentYear <= endYear) {
    const celebrationDay = rule.nthDayOfMonth
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? new Date(currentYear, rule.month).getNthDayOfMonth(rule.dayOfTheWeek!, rule.nthDayOfMonth)
      : new Date(currentYear, rule.month, rule.day);

    const dayOffDay =
      rule.isOnNextMonday && !celebrationDay.isWeekday() ? celebrationDay.getNextMonday() : celebrationDay;

    if (dayOffDay > firstDate && dayOffDay < secondDate) holidayCounter++;

    currentYear++;
  }

  return holidayCounter;
};
