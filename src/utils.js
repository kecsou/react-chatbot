/**
 *
 * @param {number} number
 */
function S(number = 0) {
  return number > 1 ? 's' : '';
}

/**
 *
 * @param {string} dateString
 */
export function getTextDate(dateString = '') {
  const date = new Date(dateString);
  const time = date.getTime();
  const now = Date.now();
  const timePaste = (now - time) / 1000;
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = week * 4;
  const year = month * 12;

  if (timePaste > year) {
    const number = parseInt(timePaste / year, 10);
    return `${number} year${S(number)} ago`;
  }

  if (timePaste > month) {
    const number = parseInt(timePaste / month, 10);
    return `${number} month${S(number)} ago`;
  }

  if (timePaste > week) {
    const number = parseInt(timePaste / week, 10);
    return `${number} week${S(number)} ago`;
  }

  if (timePaste > day) {
    const number = parseInt(timePaste / day, 10);
    return `${number} day${S(number)} ago`;
  }

  if (timePaste > hour) {
    const number = parseInt(timePaste / hour, 10);
    return `${number} hour${S(number)} ago`;
  }

  if (timePaste > minute) {
    const number = parseInt(timePaste / minute, 10);
    return `${number} minute${S(number)} ago`;
  }

  return 'now';
}

/**
 * 
 * @param {number} monthAsNumber 
 */
export function getMonthAsString(monthAsNumber = 1) {
  switch (monthAsNumber) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "September";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "January";
  }
}

/**
 *
 * @param {number} n
 * @desc Get a function wich will group elements of an array by group
 * Each groups will have the size you provided
 * example group: [ i1,i2,in-1]
 */
export const reduceByGroup = (n = 2) => (acc, current, index) => {
  if ((index % n) === 0) {
    return [...acc, [current]];
  }

  const newAcc = [...acc];
  const lastGroup = newAcc[newAcc.length - 1];
  lastGroup.push(current);

  return newAcc;
};