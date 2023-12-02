const moment = require('moment-timezone');

const calculateOrderTimeDuration = (startdate) => {
    let postedDays = "";
    let createAt = moment(startdate);
    let endDate = Date.now();
    let countTime = Math.abs(createAt.diff(endDate, "days"));

    if (countTime < 1) {

        countTime = Math.abs(createAt.diff(endDate, "hours")) //+ " hours ago";
        if (countTime < 1) {
            countTime = Math.abs(createAt.diff(endDate, "minutes")) //+ " hours ago"
            if (countTime < 1) {
                postedDays = Math.abs(createAt.diff(endDate, "seconds")) + " seconds ago"
            } else {
                postedDays = countTime + " minutes ago";
            }
        } else {
            postedDays = countTime + " hours ago";
        }
    } else {
        if (countTime < 31) {
            postedDays = countTime + " days ago";
        } else {
            postedDays = Math.abs(createAt.diff(endDate, "months")) + " months ago"
        }
    }
    return postedDays
}


const calculateTimeDifference = (startdate) => {

    let createAt = moment(startdate);
    let endDate = Date.now();
    let countTime = Math.abs(createAt.diff(endDate, "hours"));
    return countTime
}
module.exports = {
    calculateTimeDifference,
    calculateOrderTimeDuration
}
