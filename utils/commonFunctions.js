function addHours(numOfHours, date) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
}


module.exports = {
    addHours
}