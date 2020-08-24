import getCurrentMonthMilliseconds from "./getCurrentMonthMilliseconds"

const getCurrentMonth = () => {
  const monthData = getCurrentMonthMilliseconds();
  let currentMonthDate = [];
  monthData.forEach(month => {
    const d = new Date(month.toString() * 1);
    // ('0' + MyDate.getDate()).slice(-2) + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + MyDate.getFullYear();
    const dFormat = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    currentMonthDate.push(dFormat);
  })
  return currentMonthDate;
};

export default getCurrentMonth;