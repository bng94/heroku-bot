class Slfunction {

	constructor(client, dayDiff, aDate, oldDate, currentSpotlight, cw, addedTime, date){
		this.client = client;
		this.dayDiff = dayDiff;
		this.aDate = aDate;
		this.oldDate = oldDate;
		this.currentSpotlight = currentSpotlight;
		this.cw = cw;
		this.addedTime = addedTime;
		this.num = (this.dayDiff+this.addedTime) % 81;
		this.today = new Date(); 
		this.date = this.today.getUTCDate(); 
	}

	//updates the dates and ensure that the spotlight is up to date when it turns into a new day.
	updateDate(){
		while(this.date != this.aDate){
	    	if(this.date > this.aDate){
		    	this.oldDate=this.aDate;
	    		this.addedTime++;
	    		this.aDate++;
		    }else if(this.date === 1 && (this.aDate === 28 || this.aDate === 29 || this.aDate === 30 || this.aDate ===31 )){
		    		this.addedTime++;
		    		this.aDate=this.date;
		    		this.client.users.get(process.env.ownerID).send("UPDATE dayDiff and dates NOW"); //send me email to update Code.
		    		console.log("UPDATE dayDiff and dates NOW");
		    }
		    console.log('num is '+`${this.num}`+'\nnew date starts today');

			
			console.log("dayDiff :"+this.dayDiff+"\nnew dayDiff is: "+(this.dayDiff+this.addedTime)+"\naDate is now: "+this.aDate+"\nOld Date is now: "+this.oldDate+"\n");
	    }
		this.num = (this.dayDiff+this.addedTime) % 81;
		
		console.log("the current time is "+`${this.today.getUTCHours()}:${this.today.getUTCMinutes()}`)
		this.setCurrentSpotlight();

	}
	//function that sets the current spotlight based off the numbers that corresponds with the spotlight.
	setCurrentSpotlight(){
		if(this.num >= 0 && this.num <=2) || (this.num >=51 && this.num <=53)){
	        this.currentSpotlight = 'Pest Control';
		} else if ((this.num >= 3 && this.num <= 5) || (this.num >= 54 && this.num <= 56)){
	        this.urrentSpotlight = 'Soul Wars';
		} else if ((this.num >= 6 && this.num <= 8) || (this.num >= 45 && this.num <= 47)){
	        this.urrentSpotlight = 'Fist Of Guthix';
		} else if ((this.num >= 9 && this.num <= 11) || (this.num >= 39 && this.num <= 41)){
	        this.urrentSpotlight = 'Barbarian Assult';
		} else if ((this.num >= 12 && this.num <= 14) || (this.num >= 42 && this.num <= 44)){
	        this.urrentSpotlight = 'Conquest';
		} else if ((this.num >= 15 && this.num <= 17) || (this.num >= 57 && this.num <= 59)){
	        this.urrentSpotlight = 'Fishing Trawler';
		} else if ((this.num >= 18 && this.num <= 20) || (this.num >= 60 && this.num <= 62)){
	        this.urrentSpotlight = 'Great Orb Project';
		} else if ((this.num >= 21 && this.num <= 23) || (this.num >= 63 && this.num <= 65)){
	        this.urrentSpotlight = 'Flash Powder Factory';
		} else if ((this.num >= 24 && this.num <= 26) || (this.num >= 48 && this.num <= 50) || (this.num >= 78 && this.num <= 80)){
	        this.urrentSpotlight = 'Castle Wars!';
		} else if ((this.num >= 27 && this.num <= 29) || (this.num >= 66 && this.num <= 68)){
	        this.urrentSpotlight = 'Stealing Creation';
		} else if ((this.num >= 30 && this.num <= 32) || (this.num >= 69 && this.num <= 71)){
	        this.urrentSpotlight = 'Cabbage Facepunch Bonanza';
		} else if ((this.num >= 33 && this.num <= 35) || (this.num >= 72 && this.num <= 74)){
	        this.urrentSpotlight = 'Heist';
		} else if (this.num >= 36 && this.num <= 38){
	        this.urrentSpotlight = 'Mobilising Armies';
		} else if (this.num >= 75 && this.num <= 77){
	        this.urrentSpotlight = 'Trouble Brewing';
		} else {
			this.client.users.get(process.env.ownerID).send("~spotlight code error fix! asap"); 
		}

		if(this.num<24 && this.num > 0){
	        this.cw = 24-this.num;
	    }else if(this.num < 48 && this.num > 24){
	        this.cw = 48-this.num;
	    }else if(this.num < 78 && this.num > 48){
	        this.cw = 78-this.num;
	    }else if(this.num === 24 || this.num === 25 || this.num === 26 || this.num === 48 || this.num === 49 || this.num === 50 || this.num === 78 || this.num === 79 || this.num === 80){
	        this.cw = "NOW";
	    }else{
			this.cw = -1;
	    }
	}

	get slInfo(){
		return [`${this.aDate}`,`${this.oldDate}`,`${this.currentSpotlight}`,`${this.cw}`,`${this.addedTime}`,`${this.date}`];
		}
	}

	
}

module.exports = Slfunction;