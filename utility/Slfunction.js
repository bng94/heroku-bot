class Slfunction {
	constructor(client, dayDiff, aDate, oldDate, currentSpotlight, nextSpotlight, cw, addedTime, timetillnextsl){
		this.client = client;
		this.dayDiff = dayDiff;
		this.aDate = aDate;
		this.oldDate = oldDate;
		this.currentSpotlight = currentSpotlight;
		this.nextSpotlight = nextSpotlight;
		this.cw = cw;
		this.addedTime = addedTime;
		this.num = (this.dayDiff+this.addedTime) % 81;
		this.today = new Date(); 
		this.date = this.today.getUTCDate();
		this.timetillnextsl = timetillnextsl;
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

		    this.timetillnextsl--;
		    if(this.timetillnextsl == 0){
				this.timetillnextsl = 3;
			}
			
			console.log("dayDiff :"+this.dayDiff+"\nnew dayDiff is: "+(this.dayDiff+this.addedTime)+"\naDate is now: "+this.aDate+"\nOld Date is now: "+this.oldDate+"\n");
	    }
		this.num = (this.dayDiff+this.addedTime) % 81;
		
		console.log("the current time is "+`${this.today.getUTCHours()}:${this.today.getUTCMinutes()}`);
		
		this.number = this.num;
		this.sl = 'null';
		this.setCurrentSpotlight();
		this.currentSpotlight = this.sl;
		this.number = this.num+3;
		this.nextSpotlight = this.setCurrentSpotlight();
		this.nextSpotlight = this.sl;
 		console.log('num is '+`${this.num}`);

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


	setCurrentSpotlight(){

		if((this.number >= 0 && this.number <=2) || (this.number >=51 && this.number <=53)){
	        this.sl = 'Pest Control';
		} else if ((this.number >= 3 && this.number <= 5) || (this.number >= 54 && this.number <= 56)){
	        this.sl = 'Soul Wars';
		} else if ((this.number >= 6 && this.number <= 8) || (this.number >= 45 && this.number <= 47)){
	        this.sl = 'Fist Of Guthix';
		} else if ((this.number >= 9 && this.number <= 11) || (this.number >= 39 && this.number <= 41)){
	        this.sl = 'Barbarian Assult';
		} else if ((this.number >= 12 && this.number <= 14) || (this.number >= 42 && this.number <= 44)){
	        this.sl = 'Conquest';
		} else if ((this.number >= 15 && this.number <= 17) || (this.number >= 57 && this.number <= 59)){
	        this.sl = 'Fishing Trawler';
		} else if ((this.number >= 18 && this.number <= 20) || (this.number >= 60 && this.number <= 62)){
	        this.sl = 'Great Orb Project';
		} else if ((this.number >= 21 && this.number <= 23) || (this.number >= 63 && this.number <= 65)){
	        this.sl = 'Flash Powder Factory';
		} else if ((this.number >= 24 && this.number <= 26) || (this.number >= 48 && this.number <= 50) || (this.number >= 78 && this.number <= 80)){
	        this.sl = 'Castle Wars!';
		} else if ((this.number >= 27 && this.number <= 29) || (this.number >= 66 && this.number <= 68)){
	        this.sl = 'Stealing Creation';
		} else if ((this.number >= 30 && this.number <= 32) || (this.number >= 69 && this.number <= 71)){
	        this.sl = 'Cabbage Facepunch Bonanza';
		} else if ((this.number >= 33 && this.number <= 35) || (this.number >= 72 && this.number <= 74)){
	        this.sl = 'Heist';
		} else if (this.number >= 36 && this.number <= 38){
	        this.sl = 'Mobilising Armies';
		} else if (this.number >= 75 && this.number <= 77){
	        this.sl = 'Trouble Brewing';
		} else {
			this.client.users.get(this.myID).send("~spotlight code error fix! asap"); 
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

	//returns vars in an array 
	get slInfo() {
		return [`${this.aDate}`,`${this.oldDate}`,`${this.currentSpotlight}`,`${this.nextSpotlight}`,`${this.cw}`,`${this.addedTime}`,`${this.timetillnextsl}`];
	}
}
	
module.exports = Slfunction;