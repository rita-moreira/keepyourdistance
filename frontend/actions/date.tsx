export const currentDate = () => {
  const newDate = new Date();
  const date: number = newDate.getDate();
  const month: number = newDate.getMonth();
  const hour: number = newDate.getHours();
  const minutes: number = newDate.getMinutes();
  const monthName: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${date} ${monthName[month]} at ${hour}:${minutes}`;
};
