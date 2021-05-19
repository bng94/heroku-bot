/**
 * Daily Resets 
 * Since spotlight updates on a daily reset based off GMT
 * this updates the spotlight codes and dates variables saved for spotlight
 */
const spotlight = require('@modules/spotlight.js');
module.exports = (client) => {
    let dailyTimeOut;
    const daily = async () =>{
        spotlight(client);
        client.holiday();
        let timeToMidnight;
        timeToMidnight = client.resetTime();
        console.log('Reset in: '+client.timeConversion(timeToMidnight)+'\n');
        clearTimeout(client.timer);
        client.timer = setTimeout(daily, timeToMidnight);
        clearTimeout(dailyTimeOut);
        dailyTimeOut = setTimeout(daily, timeToMidnight);
    };
    daily();
};