let dailyTimeOut: NodeJS.Timeout;

const resetTime = () => {
  const today = new Date();
  const midnight = new Date(today);
  midnight.setUTCHours(24, 0, 0, 0);
  return midnight.getTime() - today.getTime();
};

const timeConversion = (ms: number): string => {
  const seconds = ms / 1000;
  const minutes = ms / (1000 * 60);
  const hours = ms / (1000 * 60 * 60);
  const days = ms / (1000 * 60 * 60 * 24);

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
const daily = () => {
  const timeToMidnight = resetTime();
  console.log(`\nUTC Midnight in: ${timeConversion(timeToMidnight)}\n`);
  clearTimeout(dailyTimeOut);
  dailyTimeOut = setTimeout(daily, timeToMidnight);
};

export default daily;
