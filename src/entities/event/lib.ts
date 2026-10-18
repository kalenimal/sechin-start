const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
const monthsShort = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const weekdays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export function eventDateParts(iso: string) {
  const date = new Date(iso);
  return {
    day: date.getDate(),
    month: months[date.getMonth()],
    monthShort: monthsShort[date.getMonth()],
    weekday: weekdays[date.getDay()],
    time: iso.slice(11, 16),
  };
}
