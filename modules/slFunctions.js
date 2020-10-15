//Calculates spotlight, next spotlight, next cw spotlight and the following cw spotlight
module.exports = (client) => {
	var currentSpotlight = "not found";
	var nextSpotlight = "not found";
	var cw = "null";
	var followingCW = "null";
	var followingCWCounter = 0;
	var today = new Date();
	var theDate = new Date(Date.UTC(2015, 4, 18));
	const oneDay = 1000 * 60 * 60 * 24;
	var subDiff = (Math.floor(Math.floor(today - theDate)/oneDay));
	var num = subDiff % 81;
	var number = num;
	var sl = `null`;
	const month = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
	var numSL = setCurrentSpotlight(client, number, sl);
	number = numSL[0];
	sl = numSL[1];
	currentSpotlight = sl;

	console.log("\nToday Date is "+`${month[today.getUTCMonth()]} ${today.getUTCDate()} ${today.getUTCFullYear()} `+`${today.getUTCHours()}:${(`0`+today.getUTCMinutes()).slice(-2)}`+`\n`);
	console.log(`Current Spotlight: `+`${currentSpotlight}`);

	var findNextSpotlightCounter = 0;
	var foundNextSpotlight = false;

	do{
		findNextSpotlightCounter++;
		number = num+findNextSpotlightCounter;
		if(number > 80){
			number = 0;
		}
		numSL = setCurrentSpotlight(client, number, sl);
		number = numSL[0];
		sl = numSL[1];
		if(sl != currentSpotlight){
			foundNextSpotlight = true;
		}
	}while(!foundNextSpotlight);

	var nextSpotlight = sl;

	cw = findTimeToCWsl(num);
	var afterNextCw = cw+3;
	if(cw != "NOW"){
		var temp = num+afterNextCw;
		followingCW = findTimeToCWsl(temp);
	}else{
		var temp;
		followingCWCounter++;
		temp = num+followingCWCounter;
		followingCW = findTimeToCWsl(temp);
		if(followingCW == "NOW"){
			followingCWCounter++;
			temp = num+followingCWCounter;
			followingCW = findTimeToCWsl(temp);
			if(followingCW == "NOW"){
				followingCWCounter++;
				temp = num+followingCWCounter;
				followingCW = findTimeToCWsl(temp);
			}
		}
		afterNextCw = 0;
		followingCW = followingCWCounter;
		console.log("Currently it is CW spotlight");
	}

	client.currentSL = currentSpotlight;
	client.nextSL = nextSpotlight;
	client.cw = cw;
	client.followingCW = followingCW+afterNextCw;
	client.timeToNextSL = findNextSpotlightCounter;

	datesForCWsl(client);

	console.log("Next Spotlight in: "+client.timeToNextSL+` days\n`);
};

function datesForCWsl(client){
	const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	var today = new Date();
	var cwSlDate = new Date();
	var cwSlEndDate = new Date();
	var dateToSL = client.cw;

	if(client.cw === "NOW"){
		dateToSL = -(2-client.timeToNextSL);
	}
	cwSlDate.setDate(today.getDate() + dateToSL);
	/*
	 * In standard javscript doing cwSlEndDate.setDate(cwSlDate.getDate() + 2) would not affect cwSlDate date
	 * ...Right cause it works in w3schools... so confused since (cwSlDate.getDate() + 2) does not affect cwSlDate but got a workaround. For clear view of workaround look at line 37 - 40.
	*/
	cwSlEndDate.setDate(today.getDate() +dateToSL+2);

	client.nextCWSLDate = `${monthShort[cwSlDate.getMonth()]}-${cwSlDate.getDate()}-${cwSlDate.getFullYear()} to ${monthShort[cwSlEndDate.getMonth()]}-${cwSlEndDate.getDate()}-${cwSlEndDate.getFullYear()}`;

	var afterCwSlDate = new Date();
	var afterCwSlEndDate = new Date();
	afterCwSlDate.setDate(today.getDate() + client.followingCW);
	afterCwSlEndDate.setDate(today.getDate() + client.followingCW+2);

	client.followingCWSLDate = `${monthShort[afterCwSlDate.getMonth()]}-${afterCwSlDate.getDate()}-${afterCwSlDate.getFullYear()} to ${monthShort[afterCwSlEndDate.getMonth()]}-${afterCwSlEndDate.getDate()}-${afterCwSlEndDate.getFullYear()}`;

	console.log("Next CW Spotlight is on "+client.nextCWSLDate);
}

function findTimeToCWsl(num){
	let cWar = -1;
	if(num<24 && num >= 0){
			cWar = 24-num;
	}else if(num < 48 && num > 24){
			cWar = 48-num;
	}else if(num < 78 && num > 48){
			cWar = 78-num;
	}else if(num === 24 || num === 25 || num === 26 || num === 48 || num === 49 || num === 50 || num === 78 || num === 79 || num === 80){
			cWar = "NOW";
	}
	return cWar;
};

function setCurrentSpotlight(client, number, sl){

		if((number >= 0 && number <=2) || (number >=51 && number <=53)){
	        sl = `Pest Control`;
		} else if ((number >= 3 && number <= 5) || (number >= 54 && number <= 56)){
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
		} else if (number >= 36 && number <= 38){
	        sl = `Soul Wars`;
		} else if (number >= 75 && number <= 77){
	        sl = `Trouble Brewing`;
		} else {
			/**
			 * This else statement has never ran
			 * Incase this code runs, we have this spotlight error msg sent 
			 * Always check for errors!
			*/
			client.sendOwnerMsg("SpotLight Code Crashed! Fix Asap");
		}

		return [number, sl];
};
