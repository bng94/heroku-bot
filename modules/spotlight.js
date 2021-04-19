//Don't need but incase of debugging, switch to true
const logger = false;
let ran = 0;

/**
 * Calculates spotlight, next spotlight, next cw spotlight & the following cw spotlight
 */ 
 module.exports = (client) => {
	let currentSpotlight = "not found";
	let nextSpotlight = "not found";
	let cw = "null";
	let followingCW = -1;
	const today = new Date();
	const num = findNum(today);
	let number = num;
	let spotLight = 'null';
	spotLight = setCurrentSpotlight(client, num, spotLight);
	currentSpotlight = spotLight;

	if(logger){
		console.log('\nToday Date is '+client.timeFormatted());
		console.log(`Current Spotlight: `+`${currentSpotlight}`);
	}

	let findNextSpotlightCounter = 0;
	let foundNextSpotlight = false;

	do{
		findNextSpotlightCounter++;
		number = num+findNextSpotlightCounter;
		if(number > 80){
			number = 0;
		}
		spotLight = setCurrentSpotlight(client, number, spotLight);
		if(spotLight != currentSpotlight){
			foundNextSpotlight = true;
		}
	}while(!foundNextSpotlight);

	nextSpotlight = spotLight;

	if(logger){
		console.log(`Next Spotlight: `+`${nextSpotlight}`);
		console.log(`Next Spotlight in ${findNextSpotlightCounter} day(s)\n`);
	}

	cw = findTimeToCWsl(num);
	/**
	 * Date of next CW Sl
	 */
	let afterNextCwNum = -1;

	/**
	 * Goal of this ifelse is to find the days until the following CW sl.
	 * So we set the date as post castle wars spotlight (aka day after CW sl)
	 */
	if(cw != "NOW"){
		if(logger) console.log(`Castle Wars Spotlight in: ${cw} day(s)`);
		const daysAfterNextCWSL = cw+3
		const date = today.getDate()+daysAfterNextCWSL;
		let newDate = new Date();
		newDate.setDate(date);
		afterNextCwNum = findNum(newDate, false);
		followingCW = findTimeToCWsl(afterNextCwNum);
		followingCW+=daysAfterNextCWSL;
	} else if(cw === "NOW"){
		if(logger) console.log("It is currently Castle Wars Spotlight");
		/**
		 * if today is current castle wars spotlight
		 * we can just add a one or two to find the post cw sl date
		 */
		let dayUntilNextSl = 1;
		let findDateOutofCWSL = new Date();
		findDateOutofCWSL.setDate(today.getDate()+dayUntilNextSl);
		afterNextCwNum = findNum(findDateOutofCWSL);
		followingCW = findTimeToCWsl(afterNextCwNum);

		if(followingCW === "NOW"){
			dayUntilNextSl++;			
			findDateOutofCWSL.setDate(today.getDate()+dayUntilNextSl);
			afterNextCwNum = findNum(findDateOutofCWSL);
			followingCW = findTimeToCWsl(afterNextCwNum);
		}
		followingCW += dayUntilNextSl;
	}

	if(logger) console.log(`Following Castle Wars Spotlight is in ${followingCW} day(s)`);

	client.currentSL = currentSpotlight;
	client.nextSL = nextSpotlight;
	client.cw = cw;
	client.timeToNextSL = findNextSpotlightCounter;
	client.followingCW = followingCW;

	datesForCWsl(client);

	if(ran === 0) console.log(`Spotlight Dates Set!`);
	else console.log(`Spotlight Dates Updated ${ran} times`);
	ran++;
};	

/**
 * This is where the magic happens to calculate spotlight
 * @log 
 * => used to run a console log and only needed to logged once
 * => function is ran multiple times as the current setup we reuse this function to find "following CW SL", where the not today date but date of post-cw sl
 */
function findNum(aDate){
	const theDate = new Date(Date.UTC(2015, 4, 18));
	const oneDay = 1000 * 60 * 60 * 24;
	let subDiff = (Math.floor(Math.floor(aDate - theDate)/oneDay));
	
	if(logger){
		console.log(`subdiff is ${subDiff}`);
		console.log(`num is ${subDiff % 81}`);
	}
	return subDiff % 81;
}

function datesForCWsl(client){
	const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	let today = new Date();
	let cwSlDate = new Date();
	let cwSlEndDate = new Date();
	let dateToSL = client.cw;

	if(client.cw === "NOW"){
		dateToSL = -(2-client.timeToNextSL);
	}
	
	cwSlDate.setDate(today.getDate() + dateToSL);
	/*
	 * In standard javscript doing cwSlEndDate.setDate(cwSlDate.getDate() + 2) would not affect cwSlDate date
	*/
	cwSlEndDate.setDate(today.getDate() +dateToSL+2);

	client.nextCWSLDate = `${monthShort[cwSlDate.getMonth()]}-${cwSlDate.getDate()}-${cwSlDate.getFullYear()} to ${monthShort[cwSlEndDate.getMonth()]}-${cwSlEndDate.getDate()}-${cwSlEndDate.getFullYear()}`;

	let afterCwSlDate = new Date();
	let afterCwSlEndDate = new Date();
	afterCwSlDate.setDate(today.getDate() + client.followingCW);
	afterCwSlEndDate.setDate(today.getDate() + client.followingCW+2);

	client.followingCWSLDate = `${monthShort[afterCwSlDate.getMonth()]}-${afterCwSlDate.getDate()}-${afterCwSlDate.getFullYear()} to ${monthShort[afterCwSlEndDate.getMonth()]}-${afterCwSlEndDate.getDate()}-${afterCwSlEndDate.getFullYear()}`;

	if(logger) console.log(`Castle Wars Spotlight is on ${client.nextCWSLDate}`);
}
/**
 * As the numbers are known for castle wars spotlight, we pass in num and subtract the differences to return time until spotlight or say it is spotlight
 */
function findTimeToCWsl(num){
	let cWar = -1;
	if(num<24 && num >= 0){
		cWar = 24-num;
	}else if(num < 48 && num > 24){
		cWar = 48-num;
	}else if(num < 78 && num > 48){
		cWar = 78-num;
	}else if (num > 80){
		cWar = 0;
	}else if(num === 24 || num === 25 || num === 26 || num === 48 || num === 49 || num === 50 || num === 78 || num === 79 || num === 80){
			cWar = "NOW";
	}
	return cWar;
};


/**
 * Each number correspond with a spotlight 
 * Match and return the number & name
 */
function setCurrentSpotlight(client, number, sl){

	if((number >= 0 && number <=2) || (number >=51 && number <=53)){
		sl = `Pest Control`;
	} else if ((number >= 3 && number <= 5) || (number >= 36 && number <= 38) || (number >= 54 && number <= 56)){
		sl = `Soul Wars`;
	} else if ((number >= 6 && number <= 8) || (number >= 45 && number <= 47)){
		sl = `Fist Of Guthix`;
	} else if ((number >= 9 && number <= 11) || (number >= 39 && number <= 41)){
		sl = `Barbarian Assult`;
	} else if ((number >= 12 && number <= 14) || (number >= 42 && number <= 44)){
		sl = `Conquest`;
	} else if ((number >= 15 && number <= 17) || (number >= 57 && number <= 59)){
		sl = `Fishing Trawler`;
	} else if ((number >= 18 && number <= 20) || (number >= 60 && number <= 62)){
		sl = `Great Orb Project`;
	} else if ((number >= 21 && number <= 23) || (number >= 63 && number <= 65)){
		sl = `Flash Powder Factory`;
	} else if ((number >= 24 && number <= 26) || (number >= 48 && number <= 50) || (number >= 78 && number <= 80)){
		sl = `Castle Wars`;
	} else if ((number >= 27 && number <= 29) || (number >= 66 && number <= 68)){
		sl = `Stealing Creation`;
	} else if ((number >= 30 && number <= 32) || (number >= 69 && number <= 71)){
		sl = `Cabbage Facepunch Bonanza`;
	} else if ((number >= 33 && number <= 35) || (number >= 72 && number <= 74)){
		sl = `Heist`;
	} else if (number >= 75 && number <= 77){
		sl = `Trouble Brewing`;
	} else {
		client.sendOwnerMsg("Spotlight Code Error! Fix Asap");
	}

	return sl;
};