
module.exports = (client) => {

  /**
   * 
   * @returns time until midnight in GMT.
   */
  client.resetTime = () => {
    let today = new Date();
    let utcToday = new Date(today.getFullYear(), today.getUTCMonth(), today.getUTCDate(), today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds());
    let midnight = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    midnight.setHours(24, 0, 0);
    return midnight - utcToday;
  };

  /**
   * Checks if its one of the holidays and says happy holidays
   */
  let week = [0, 0, 0, 0, 0, 0, 0];
  let thanksFound = false;
  client.holiday = () => {
    let today = new Date();
    let newsYear = new Date(today.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
    let fourthOfJuly = new Date(today.getUTCFullYear(), 6, 4, 0, 0, 0, 0);
    let halloween = new Date(today.getUTCFullYear(), 9, 31, 0, 0, 0, 0);
    //last day of november -> placeholder for thanksgiving
    let thanksgiving = new Date(today.getUTCFullYear(), 10, 30);
    let christmas = new Date(today.getUTCFullYear(), 11, 25, 0, 0, 0, 0);
    if (today.getUTCMonth() === 10 && thanksFound === false && today.getDay() === 4) {
      let findDay = new Date(today.getUTCFullYear(), 10, 1);
      //go through each date of the month from the 1st and record how many days(S,M,T,W,T,F,S) we been through up to today's date.
      for (let i = 0; i < week.length; i++) {
        for (let j = 1; j < today.getDate() + 1; j++) {
          findDay.setDate(j);
          if (i === findDay.getDay()) {
            week[i]++;
          }
        }
      }
      //if it is the 4th week november
      if (week[4] === 4) {
        thanksgiving.setDate(today.getDate());
        thanksgiving.setHours(0, 0, 0, 0);
        thanksFound = true;
      }
    } else if (thanksFound && today.getDate() === 30) {
      week = [0, 0, 0, 0, 0, 0, 0];
      thanksFound = false;
    }

    if (client.firstHourOfDay() === true) {
      today.setHours(0, 0, 0, 0);
      if (today === newsYear) {
        console.log('Happy New Years');
      } else if (today === fourthOfJuly) {
        console.log('Happy 4th of July!');
      } else if (today === halloween) {
        console.log('Happy Halloween!');
      } else if (today === thanksgiving && thanksFound === true) {
        console.log('Happy Thanksgiving!');
      } else if (today === christmas) {
        console.log('Happy Christmas!');
      }
    }
  };

  /**
   * Return true if its the first hour of the day in GMT
   */
  client.firstHourOfDay = () => {
    let today = new Date();
    let utcDATE = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds());
    let utcDATE2 = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 1, 0, 0);

    if (utcDATE.getHours() < utcDATE2.getHours() || (utcDATE.getHours() === utcDATE2.getHours() && utcDATE.getMinutes() === utcDATE2.getMinutes())) {
      return true;
    }
    return false;
  };

  client.timeNow = () => {
    let today = new Date();
    return today.toString();
  };

  client.timeUTCNow = () => {
    let today = new Date();
    return today.toUTCString();
  };

  //Returns Month Date Year Hour:Min in EST
  client.timeFormatted = (abbreviation = false) => {
    const month = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
    const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    if (abbreviation) {
      return `${monthShort[today.getMonth()]} ${today.getDate()} ${today.getFullYear()} ` + `${today.getHours()}:${(`0` + today.getMinutes()).slice(-2)}`;
    } else {
      return `${month[today.getMonth()]} ${today.getDate()} ${today.getFullYear()} ` + `${today.getHours()}:${(`0` + today.getMinutes()).slice(-2)}`;
    }
  }

  //Returns Month Date Year Hour:Min in UTC
  client.timeFormattedUTC = (abbreviation = false) => {
    const month = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
    const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    if (abbreviation) {
      return `${monthShort[today.getMonth()]} ${today.getUTCDate()} ${today.getUTCFullYear()} ` + `${today.getUTCHours()}:${(`0` + today.getUTCMinutes()).slice(-2)}`;
    } else {
      return `${month[today.getUTCMonth()]} ${today.getUTCDate()} ${today.getUTCFullYear()} ` + `${today.getUTCHours()}:${(`0` + today.getUTCMinutes()).slice(-2)}`;
    }
  }

  client.timeConversion = (millisec) => {
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
};
