export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export type NthDayOfMonth = 1 | 2 | 3 | 4 | 5;

export interface PublicHolidayRule {
  day?: number;
  month: number;
  nthDayOfMonth?: NthDayOfMonth;
  dayOfTheWeek?: DayOfWeek;
  isOnNextMonday?: boolean;
}
