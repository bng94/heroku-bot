class Spotlightfunct {

	constructor(client, dayDiff, aDate, oldDate, currentSpotlight, cw, addedTime, date, ann){
		this.client = client;
		this.dayDiff = dayDiff;
		this.aDate = aDate;
		this.oldDate = oldDate;
		this.currentSpotlight = currentSpotlight;
		this.cw = cw;
		this.addedTime = addedTime;
		this.num = (this.dayDiff+this.addedTime) % 81;
		this.today = new Date(); // set today's date.
		this.date = this.today.getUTCDate(); // gets the date aka if Sep 30 2017 then the date is 29.
		this.ann = false;
	}

	updateDate(){
		while(this.date != this.aDate){
	    	if(this.date > this.aDate){
		    	this.oldDate=this.aDate;
	    		this.addedTime++;
	    		this.aDate++;
		    }else if(this.date === 1 && (this.aDate === 28 || this.aDate === 29 || this.aDate === 30 || this.aDate ===31 )){
		    		this.addedTime++;
		    		this.aDate=this.date;
		    		client.users.get(process.env.ownerID).send("UPDATE dayDiff and dates NOW"); //send me email to update Code.
		    		console.log("UPDATE dayDiff and dates NOW");
		    }
		    console.log('num is '+`${this.num}`+'\nnew date starts today');

			
			console.log("dayDiff :"+this.dayDiff+"\nnew dayDiff is: "+(this.dayDiff+this.addedTime)+"\naDate is now: "+this.aDate+"\nOld Date is now: "+this.oldDate+"\n");
			this.ann = true;
	    }
		this.num = (this.dayDiff+this.addedTime) % 81;
		
		console.log("the current time is"+`${this.today.getUTCHours()}:${this.today.getUTCMinutes()}`)
		this.setCurrentSpotlight();

	    if(this.ann == true){
		    if(this.num === 24 || this.num === 25 || this.num === 26 || this.num === 48 || this.num === 49 || this.num === 50 || this.num === 78 || this.num === 79 || this.num === 80 ){
				client.channels.find('name','general').send('Current Spotlight is: **'+`${this.currentSpotlight}`+'**\nCastle Wars Spotlight is: **NOW**!');			 		       
				console.log("It happened");
			}
			if(this.cw >= 1 && this.cw <= 3){
				client.channels.find('name','general').send('Current Spotlight is: **'+`${this.currentSpotlight}`+'**\nCastle Wars Spotlight is in: **'+`${this.cw}`+'** days!\nDon\'t Miss out on the Thaler and Tix Grind!');
			}
			this.ann = false;
		}	
	}

	setCurrentSpotlight(){
		try{
		    switch(this.num) {
		        case 0:
		        case 1:
		        case 2:
		        case 51:
		        case 52:  
		        case 53:
		            this.currentSpotlight = 'Pest Control';
		            break;
		        case 3:
		        case 4:
		        case 5:
		        case 54:
		        case 55:
		        case 56:
		            this.urrentSpotlight = 'Soul Wars';
		            break;
		        case 6:
		        case 7:
		        case 8:
		        case 45:
		        case 46:
		        case 47:
		            this.currentSpotlight = 'Fist Of Guthix';
		            break;
		        case 9:
		        case 10:
		        case 11:
		        case 39:
		        case 40:
		        case 41:
		            this.currentSpotlight = 'Barbarian Assult';
		            break;
		        case 12:
		        case 13:
		        case 14:
		        case 42:
		        case 43:
		        case 44:
		            this.currentSpotlight = 'Conquest';
		            break;
		        case 15:
		        case 16:
		        case 17:
		        case 57:
		        case 58:
		        case 59:
		            this.currentSpotlight = 'Fishing Trawler';
		            break;
		        case 18:
		        case 19:
		        case 20:
		        case 60:
		        case 61:
		        case 62:
		            this.currentSpotlight = 'Great Orb Project';
		            break;
		        case 21:
		        case 22:
		        case 23:
		        case 63:
		        case 64:
		        case 65:
		            this.currentSpotlight = 'Flash Powder Factory';
		            break;
		        case 24:
		        case 25:
		        case 26:
		        case 48:
		        case 49:
		        case 50:
		        case 78:
		        case 79:
		        case 80:
		            this.currentSpotlight = 'Castle Wars!';
		            break;
		        case 27:
		        case 28:
		        case 29:
		        case 66:
		        case 67:
		        case 68:
		            this.currentSpotlight = 'Stealing Creation';
		            break;
		        case 30:
		        case 32:
		        case 33:
		        case 69:
		        case 70:
		        case 71:
		            this.currentSpotlight = 'Cabbage Facepunch Bonanza';
		            break;
		        case 33:
		        case 34:
		        case 35:
		        case 72:
		        case 73:
		        case 74:
		            this.currentSpotlight = 'Heist';
		            break;
		        case 36:
		        case 37:
		        case 38:
		            this.currentSpotlight = 'Mobilising Armies';
		            break;
		        case 75:
		        case 76:
		        case 77:
		            this.currentSpotlight = 'Trouble Brewing';
		    		break;
			}
		}catch (e){
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

	get spotlightInfo(){
		return [`${this.aDate}`,`${this.oldDate}`,`${this.currentSpotlight}`,`${this.cw}`,`${this.addedTime}`,`${this.date}`,`${this.ann}`];
	}
}

module.exports = Spotlightfunct;

/*

function updateDate(){
	while(date != aDate){
    	if(date > aDate){
	    	oldDate=aDate;
    		addedTime++;
    		aDate++;
	    }else if(date === 1 && (aDate === 28 || aDate === 29 || aDate === 30 || aDate ===31 )){
	    		addedTime++;
	    		aDate=date;
	    		client.users.get(myID).send("UPDATE dayDiff and dates NOW"); //send me email to update Code.
	    		console.log("UPDATE dayDiff and dates NOW");
	    }
	    console.log('num is '+`${num}`+'\nnew date starts today');

		
		console.log("dayDiff :"+dayDiff+"\nnew dayDiff is: "+(dayDiff+addedTime)+"\naDate is now: "+aDate+"\nOld Date is now: "+oldDate+"\n");
		ann = true;
    }
	num = (dayDiff+addedTime) % 81;
	
	console.log("the current time is"+`${today.getUTCHours()}:${today.getUTCMinutes()}`)
	//setCurrentSpotlight();

    if(ann == true){
	    if(num === 24 || num === 25 || num === 26 || num === 48 || num === 49 || num === 50 || num === 78 || num === 79 || num === 80 ){
			client.channels.find('name','general').send('Current Spotlight is: **'+`${currentSpotlight}`+'**\nCastle Wars Spotlight is: **NOW**!');			 		       
			console.log("It happened");
		}
		if(cw >= 1 && cw <= 3){
			client.channels.find('name','general').send('Current Spotlight is: **'+`${currentSpotlight}`+'**\nCastle Wars Spotlight is in: **'+`${cw}`+'** days!\nDon\'t Miss out on the Thaler and Tix Grind!');
		}
		ann = false;
	}	
}

function setCurrentSpotlight(){
	try{
	    switch(num) {
	        case 0:
	        case 1:
	        case 2:
	        case 51:
	        case 52:  
	        case 53:
	            currentSpotlight = 'Pest Control';
	            break;
	        case 3:
	        case 4:
	        case 5:
	        case 54:
	        case 55:
	        case 56:
	            currentSpotlight = 'Soul Wars';
	            break;
	        case 6:
	        case 7:
	        case 8:
	        case 45:
	        case 46:
	        case 47:
	            currentSpotlight = 'Fist Of Guthix';
	            break;
	        case 9:
	        case 10:
	        case 11:
	        case 39:
	        case 40:
	        case 41:
	            currentSpotlight = 'Barbarian Assult';
	            break;
	        case 12:
	        case 13:
	        case 14:
	        case 42:
	        case 43:
	        case 44:
	            currentSpotlight = 'Conquest';
	            break;
	        case 15:
	        case 16:
	        case 17:
	        case 57:
	        case 58:
	        case 59:
	            currentSpotlight = 'Fishing Trawler';
	            break;
	        case 18:
	        case 19:
	        case 20:
	        case 60:
	        case 61:
	        case 62:
	            currentSpotlight = 'Great Orb Project';
	            break;
	        case 21:
	        case 22:
	        case 23:
	        case 63:
	        case 64:
	        case 65:
	            currentSpotlight = 'Flash Powder Factory';
	            break;
	        case 24:
	        case 25:
	        case 26:
	        case 48:
	        case 49:
	        case 50:
	        case 78:
	        case 79:
	        case 80:
	            currentSpotlight = 'Castle Wars!';
	            break;
	        case 27:
	        case 28:
	        case 29:
	        case 66:
	        case 67:
	        case 68:
	            currentSpotlight = 'Stealing Creation';
	            break;
	        case 30:
	        case 32:
	        case 33:
	        case 69:
	        case 70:
	        case 71:
	            currentSpotlight = 'Cabbage Facepunch Bonanza';
	            break;
	        case 33:
	        case 34:
	        case 35:
	        case 72:
	        case 73:
	        case 74:
	            currentSpotlight = 'Heist';
	            break;
	        case 36:
	        case 37:
	        case 38:
	            currentSpotlight = 'Mobilising Armies';
	            break;
	        case 75:
	        case 76:
	        case 77:
	            currentSpotlight = 'Trouble Brewing';
	    		break;
		}
	}catch (e){
		client.users.get(myID).send("~spotlight code error fix! asap"); 
	}

	if(num<24 && num > 0){
        cw = 24-num;
    }else if(num < 48 && num > 24){
        cw = 48-num;
    }else if(num < 78 && num > 48){
        cw = 78-num;
    }else if(num === 24 || num === 25 || num === 26 || num === 48 || num === 49 || num === 50 || num === 78 || num === 79 || num === 80){
        cw = "NOW";
    }else{
		cw = -1;
    }
}
*/