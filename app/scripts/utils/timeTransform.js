var NOW = moment();

function dateToPoint(date) {
  // 0    to 3*60        minutes
  // 3*60  to 6*60       minutes
  // 6*60  to 12*60      minutes
  // 12*60  to 24*60     minutes
  // 24*60 to 3*24*60    minutes
  // 3*24*60 to 7*24*60  minutes
  var diff = NOW.diff(date, 'minutes');

  if (diff <= 3*60) {
    return diff/60;
  } else if (diff <= 6*60) {
    return 3 + (diff - 3*60)/(3*60);
  } else if (diff <= 12*60) {
    return 4 + (diff - 6*60)/(6*60);
  } else if (diff <= 24*60) {
    return 5 + (diff - 12*60)/(12*60);
  } else if (diff <= 3*24*60) {
    return 6 + (diff - 24*60)/(24*60);
  } else if (diff <= 7*24*60) {
    return 8 + (diff - 3*24*60)/(4*24*60);
  } else {
    return 9;
  }
}

function pointToDate(point) {
  var date = moment(NOW);

  if (point <= 3) {
    date.subtract(point*60, 'minutes');
  } else if (point <= 4) {
    point = point - 3;
    date.subtract(3, 'hours')
      .subtract(point*3*60, 'minutes');
  } else if (point <= 5) {
    point = point - 4;
    date.subtract(6, 'hours')
      .subtract(point*6*60, 'minutes');
  } else if (point <= 6) {
    point = point - 5;
    date.subtract(12, 'hours')
      .subtract(point*12*60, 'minutes');
  } else if (point <= 8) {
    point = point - 6;
    date.subtract(1, 'days')
      .subtract(point*24*60, 'minutes');
  } else if (point <= 9) {
    point = point - 8;
    date.subtract(3, 'days')
      .subtract(point*3*24*60, 'minutes');
  } else {
    date.subtract(7, 'days');
  }

  return date;
}