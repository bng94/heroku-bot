/**
 * Daily Resets
 * If there is a daily function to update, then this is the function to use!
 * This function prints out the time to midnight in Coordinated Universal Time (Greenwich Mean Time).
 * This module file can be deleted if there are no use cases.
 */
module.exports = () => {
  let dailyTimeOut;

  const daily = async () => {
    const timeToMidnight = resetTime();
    console.log(`\nUTC Midnight in: ${timeConversion(timeToMidnight)}\n`);
    clearTimeout(dailyTimeOut);
    dailyTimeOut = setTimeout(daily, timeToMidnight);
  };

  daily();
};

/**
 * Calculates the time until midnight in GMT.
 * @returns {number} Time until midnight in milliseconds.
 */
const resetTime = () => {
  const today = new Date();
  const midnight = new Date(today);
  midnight.setUTCHours(24, 0, 0, 0);
  return midnight - today;
};

/**
 * Converts milliseconds to a human-readable string.
 * @param {number} millisec Time in milliseconds.
 * @returns {string} The time in a human-readable format.
 */
const timeConversion = (millisec) => {
  const seconds = millisec / 1000;
  const minutes = millisec / (1000 * 60);
  const hours = millisec / (1000 * 60 * 60);
  const days = millisec / (1000 * 60 * 60 * 24);

  if (seconds < 60) {
    return `${Math.floor(seconds)} Sec`;
  } else if (minutes < 60) {
    const remainingSeconds = Math.ceil((minutes - Math.floor(minutes)) * 60);
    return `${Math.floor(minutes)} Mins and ${remainingSeconds} secs`;
  } else if (hours < 24) {
    const remainingMinutes = Math.ceil((hours - Math.floor(hours)) * 60);
    return `${Math.floor(hours)} Hrs and ${remainingMinutes} Mins`;
  } else {
    const remainingHours = (days - Math.floor(days)) * 24;
    return `${Math.floor(days)} Days and ${Math.ceil(remainingHours)} Hrs`;
  }
};
