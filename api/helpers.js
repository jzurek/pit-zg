function previousDay(day) {
  const date = new Date(day);
  date.setDate(date.getDate() - 1);
  return date.toISOString().substr(0, 10);
}

module.exports = {
  previousDay,
};
