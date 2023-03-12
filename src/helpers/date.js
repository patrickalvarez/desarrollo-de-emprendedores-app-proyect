import dayjs from "dayjs";

export const getDifferenceinYears = (date) => {
  const today = new Date();
  const yearsOld = dayjs(today).diff(date, 'years');
  return yearsOld;
}