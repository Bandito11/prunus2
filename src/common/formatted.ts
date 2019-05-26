
const MONTHSLABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function formatTime(date: Date) {
  let time = '';
  if (date.getHours() === 0) {
    time = `12:`;
  } else {
    if (date.getHours() > 12) {
      if ((date.getHours() - 12) < 10) {
        time = `0${date.getHours() - 12}:`;
      } else {
        time = `${date.getHours() - 12}:`;
      }
    } else {
      time = `${date.getHours()}:`;
    }
  }
  if (date.getMinutes() < 10) {
    time += `0${date.getMinutes()}:`;
  } else {
    time += `${date.getMinutes()}:`;
  }
  if (date.getSeconds() < 10) {
    time += `0${date.getSeconds()}`;
  } else {
    time += `${date.getSeconds()}`;
  }
  if (date.getHours() > 12) {
    time += ' PM';
  } else {
    time += ' AM';
  }
  return time;
}


export function dateToString(date: Date, opts?: string) {
  let currentDate;
  if (opts === 'stats') {
    if (date.getMonth() < 10) {
      currentDate = `${MONTHSLABELS[date.getMonth()].substring(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
    } else {
      currentDate = `${MONTHSLABELS[date.getMonth()].substring(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
    }
  } else {
    if (date.getMonth() < 10) {
      currentDate = `${MONTHSLABELS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    } else {
      currentDate = `${MONTHSLABELS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
  }
  return currentDate;
}

export function toISOFormat(date: string) {
  let chosenDate = '';
  const currentDate = {
    // tslint:disable-next-line:radix
    year: parseInt(date.substring(0, 4)),
    // tslint:disable-next-line:radix
    month: parseInt(date.substring(5, 7)) - 1,
    // tslint:disable-next-line:radix
    day: parseInt(date.substring(8, date.length))
  };
  chosenDate = `${MONTHSLABELS[currentDate.month].substring(0, 3)} ${currentDate.day}, ${currentDate.year}`;
  return chosenDate;
}
