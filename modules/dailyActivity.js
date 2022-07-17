/**
 * Daily Resets 
 * If there a daily function to update then this is the function to use!
 */
module.exports = (client) => {
    let dailyTimeOut;
    const daily = async () =>{
        client.holiday();
        let timeToMidnight;
        timeToMidnight = client.resetTime();
        console.log(`\nUTC Midnight in: ${client.timeConversion(timeToMidnight)}\n`);
        clearTimeout(dailyTimeOut);
        dailyTimeOut = setTimeout(daily, timeToMidnight);
    };
    daily();
};