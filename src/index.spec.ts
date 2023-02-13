import DayCounter from './index';
import { DayOfWeek } from './models';

describe('BusinessDayCounter', () => {
  let dayCounter: DayCounter;

  beforeEach(() => {
    dayCounter = new DayCounter();
  });
  describe('WeekdaysBetweenTwoDates()', () => {
    it('should return number of weekdays between given two weekdays', () => {
      expect(dayCounter.getWeekdaysBetweenTwoDates(new Date(2013, 9, 7), new Date(2013, 9, 9))).toBe(1);
    });

    it('should return 0 when start is date is greater than endDate', () => {
      expect(dayCounter.getWeekdaysBetweenTwoDates(new Date(2013, 9, 7), new Date(2013, 9, 5))).toBe(0);
    });
  });

  describe('BusinessDaysBetweenTwoDates()', () => {
    it('should accept fixed holidays', () => {
      expect(
        dayCounter.BusinessDaysBetweenTwoDates(
          new Date(2013, 9, 7),
          new Date(2013, 9, 9),
          [new Date(2013, 11, 25), new Date(2013, 11, 26), new Date(2014, 0, 1)],
          undefined
        )
      ).toBe(1);
    });
    it('should accept different rules at the same time', () => {
      expect(
        dayCounter.BusinessDaysBetweenTwoDates(new Date(2022, 5, 10), new Date(2022, 5, 15), undefined, [
          {
            nthDayOfMonth: 2,
            dayOfTheWeek: DayOfWeek.Monday,
            month: 5,
          },
          {
            day: 5,
            month: 5,
            isOnNextMonday: true,
          },
        ])
      );
    });
  });
});
