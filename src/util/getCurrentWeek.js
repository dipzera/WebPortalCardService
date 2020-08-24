export function getCurrentWeek() {
  let curr = new Date();
  let week = [];

  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day)
  }
  const startWeek = new Date(week[0]).getTime();
  const endWeek = new Date(week[6]).getTime();
  return [startWeek, endWeek];
}