const getCurrentMonthMilliseconds = () => {
  const date = new Date()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
  return [firstDay, lastDay];
}

export default getCurrentMonthMilliseconds