declare interface Date {
  addDays: (days: number) => Date;
  isWeekday: () => boolean;
  getNextMonday: () => Date;
  getNthDayOfMonth: (dayNumber: number, nth: 1 | 2 | 3 | 4 | 5) => Date;
}
