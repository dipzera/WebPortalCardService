function convertDateMilliseconds(dateToConvert) {
  let MyDate = new Date(dateToConvert.substr(6, 13).toString() * 1);
  let date = MyDate.getTime();
  return date;
}

export default convertDateMilliseconds