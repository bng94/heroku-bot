/**
 * Daily Resets 
 * If there a daily function to update then this is the function to use!
 * This function just prints out the the time to midnight in Coordinated Universal Time (Greenwich Mean Time)
 * This module file can be delete if there is no use cases.
 */
module.exports = (client) => {
    let dailyTimeOut;
    const daily = async () =>{
        let timeToMidnight;
        timeToMidnight = resetTime();
        console.log(`\nUTC Midnight in: ${timeConversion(timeToMidnight)}\n`);
        clearTimeout(dailyTimeOut);
        dailyTimeOut = setTimeout(daily, timeToMidnight);
    };
    daily();
};

/**
   * 
   * @returns time until midnight in GMT.
   */
 const resetTime = () => {
    let today = new Date();
    let utcToday = new Date(today.getFullYear(), today.getUTCMonth(), today.getUTCDate(), today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds());
    let midnight = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    midnight.setHours(24, 0, 0);
    return midnight - utcToday;
  };

  

  /**
   * 
   * @param {number} millisec time in milliseconds
   * @returns the time into an human readable string
   */
   const timeConversion = (millisec) => {
    const seconds = (millisec / 1000);
    const minuteSec = (millisec / (1000 * 60));
    const minutes = (millisec / (1000 * 60)).toFixed(0);
    const hrMins = (millisec / (1000 * 60 * 60));
    const hours = (millisec / (1000 * 60 * 60)).toFixed(0);
    const dayHrs = (millisec / (1000 * 60 * 60 * 24));
    const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);

    if (seconds < 60) {
      return Number(seconds).toFixed(0) + " Sec";
    } else if (minutes < 60) {
      if (minuteSec > minutes) {
        let secs = Math.ceil((minuteSec - minutes) * 60);
        return minutes + ' Mins and ' + secs + ' secs';
      } else {
        return minutes + ' Mins';
      }
    } else if (hours < 24) {
      if (hrMins != hours) {
        let min = Math.ceil((hrMins - hours) * 60);

        const currentMins = new Date().getMinutes();
        // Check if mins is negative then set it as abs of min
        if (min < 0) {
          min = Math.abs(min);
        }
        /**
         * Check  if min equal to current minutes
         * then if true subtract from 60
         */
        if (min === currentMins) {
          min = 60 - min;
        }

        return hours + ' Hrs and ' + min + ' Mins';
      } else {
        return hours + ' Hrs';
      }
    } else {
      if (dayHrs != days) {
        let hrs = (dayHrs - days) * 24;
        /**
         * If you want X days and Y hrs and Z mins be stated instead of 
         * X days and Y Hrs. 
         */
        // let fixHrs = hrs.toFixed(0);
        // if(hrs > fixHrs && (hrs - fixHrs) > 0.017){
        //   let min = Math.ceil((hrs - fixHrs)*60);
        //   return days + ' Days and ' + Math.ceil(hrs) +' Hrs' + min +' Mins';
        // }
        return days + ' Days and ' + Math.ceil(hrs) + ' Hrs';
      } else {
        return days + " Days";
      }
    }
  }