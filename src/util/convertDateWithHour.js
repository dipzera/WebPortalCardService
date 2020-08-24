export default function convertDateWithHour(dateToConvert) {
  let d = dateToConvert.substr(6, 13).toString();
  let MyDate = new Date(d * 1);
  let date = ('0' + MyDate.getDate()).slice(-2) + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + MyDate.getFullYear() + " " + ('0' + MyDate.getHours()).slice(-2) + ':' + ('0' + MyDate.getMinutes()).slice(-2);
  return date;
}