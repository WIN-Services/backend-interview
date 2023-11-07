function calculateHoursDifference(previousDate) {
  const currentDate = Date.now();
  const millisecondsInHour = 3600000; // 1000 ms * 60 seconds * 60 minutes

  const timeDifferenceInMillis = currentDate - previousDate;
  const hoursDifference = Math.floor(timeDifferenceInMillis / millisecondsInHour);

  return hoursDifference;
}

module.exports = calculateHoursDifference;