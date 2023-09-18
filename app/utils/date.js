/**
 * Returns a date object representing the time ago by the specified number of hours.
 *
 * @param {number} hours - The number of hours. Default is 1.
 * @return {Date} - A date object representing the time ago by the specified number of hours.
 */
const getTimeAgoByHours = (hours = 1) => {
  const timeAgo = new Date();
  timeAgo.setHours(timeAgo.getHours() - hours);

  return timeAgo;
};

module.exports = {
  getTimeAgoByHours,
};
