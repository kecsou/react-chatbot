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
    return `Il y a ${number} an${S(number)}`;
  }

  if (timePaste > month) {
    const number = parseInt(timePaste / month, 10);
    return `Il y a ${number} moi${S(number)}`;
  }

  if (timePaste > week) {
    const number = parseInt(timePaste / week, 10);
    return `Il y a ${number} semaine${S(number)}`;
  }

  if (timePaste > day) {
    const number = parseInt(timePaste / day, 10);
    return `Il y a ${number} jour${S(number)}`;
  }

  if (timePaste > hour) {
    const number = parseInt(timePaste / hour, 10);
    return `Il y a ${number} heure${S(number)}`;
  }

  if (timePaste > minute) {
    const number = parseInt(timePaste / minute, 10);
    return `Il y a ${number} minute${S(number)}`;
  }

  return 'A l\'instant';
}