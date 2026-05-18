export const getTodayWeekDayId = (date): number => {
  const day = new Date(date).getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  return day === 0 ? 7 : day;
};
