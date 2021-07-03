export function thisMonth(date: Date): boolean {
  var now = new Date();
  if (
    date.getFullYear() == now.getFullYear() &&
    date.getMonth() == now.getMonth() &&
    date.getDate() >= now.getDate()
  ) {
    return true;
  }
  return false;
}
export function nextMonth(date: Date): boolean {
  var now = new Date();
  var nextMonth = now.getMonth() + 1;
  var nextYear = now.getFullYear();
  if (nextMonth == 12) {
    nextMonth = 0;
    nextYear++;
  }
  if (date.getFullYear() == nextYear && date.getMonth() == nextMonth) {
    return true;
  }
  return false;
}
export function thisWeek(date: Date): boolean {
  var now = new Date();
  now.setHours(12);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  var end_of_week = new Date(
    now.getTime() + (6 - now.getDay()) * 24 * 60 * 60 * 1000
  );
  end_of_week.setHours(23);
  end_of_week.setMinutes(59);
  end_of_week.setSeconds(59); // gee, bye-bye leap second
  if (date >= now && date <= end_of_week) {
    return true;
  }
  return false;
}
