import { setHours, setMinutes, format, addMinutes } from "date-fns";

export function generateDayTimeList(date: Date): string[] {
  const startTime = setMinutes(setHours(date, 9), 0); // Set start time to 09:00
  const endTime = setMinutes(setHours(date, 21), 0); // Set end time to 21:00
  const interval = 45; // interval in minutes
  const timeList: string[] = [];
  const currentTime = new Date();

  let initialTime = startTime;

  // if (currentTime.getDate() === date.getDate()) {
  //   // If it's today, set the initial time to the next hour after the current time
  //   const nextHour = currentTime.getHours();
  //   initialTime = setMinutes(setHours(date, nextHour), interval);
  // }

  while (initialTime <= endTime) {
    timeList.push(format(initialTime, 'HH:mm'));
    initialTime = addMinutes(initialTime, interval);
  }
  if (currentTime.getDate() === date.getDate()) {
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
  
    return timeList.filter(time => {
      const [hour, minutes] = time.split(':');
      const timeHour = parseInt(hour, 10);
      const timeMinutes = parseInt(minutes, 10);
      // Comparação com o horário atual
      if (timeHour > currentHour) {
        return true;
      } else if (timeHour === currentHour && timeMinutes > currentMinutes) {
        return true;
      }
      return false;

    });
  }

  return timeList;
}