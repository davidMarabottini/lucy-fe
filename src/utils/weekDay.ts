/**
 * Returns the weekday id using the API convention Monday = 1, ..., Sunday = 7.
 * `Date#getDay()` returns Sunday as 0, so Sunday is remapped to 7.
 */
export const getTodayWeekDayId = (date: string | Date): number => {
  const day = new Date(date).getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  return day === 0 ? 7 : day;
};
