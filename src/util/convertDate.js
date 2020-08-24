export default function convertDate(dateToConvert) {
  let d = dateToConvert.substr(6, 13).toString();
  let MyDate = new Date(d * 1);
  let date = ('0' + MyDate.getDate()).slice(-2) + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + MyDate.getFullYear();
  return date;
}