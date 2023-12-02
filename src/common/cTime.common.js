const currentTime = (time) => {
  var currentTime = time ? new Date(time) : new Date();
  return new Date(currentTime.toUTCString())
};

module.exports = currentTime;
