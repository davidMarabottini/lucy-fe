/**
 * Returns the current day of week id matching the API convention:
 * Monday = 1, Tuesday = 2, ..., Sunday = 7
 */
export const getTodayWeekDayId = (): number => {
  const day = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  return day === 0 ? 7 : day;
};
