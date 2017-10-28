const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const fs = require('fs');
require('./utility/eventLoader')(client);
const log = (message) => {
  console.log(`[${moment().format("MM-DD-YYYY HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

const gen = client.channels.find('name','general');;
var oldRDM = -1;
var oRandom = -1;
var oRandice = -1;
var dayDiff = parseInt(process.env.dayDiff); 
var addedTime = 0;
var aDate = 27; 
var oldDate = 26; 
var today = new Date(); 
var date = today.getUTCDate(); 
var num = (dayDiff+addedTime) % 81;
var currentSpotlight = -1;
var cw;

client.on('guildCreate', guild =>{
	client.channels.find('name','general').send(`I have joined ${guild.name}!`);
});

client.on('guildDelete', guild =>{
	console.log(`I have left ${guild.name} at ${new Date()}!`);
});

client.on('guildMemberAdd', member=>{
	const gen = client.channels.find('name','general');
	
	console.log(`Someone joined ${member.guild.name}!`);
	setTimeout(function () { gen.send(`Welcome to ${member.guild.name}, ${member.user}!\nEnjoy your stay!`); }, 500);
});

client.on('channelCreate', channel =>{ 
	if(channel.type == 'dm'){
		return;
	}
	channel.guild.owner.send(`In ${channel.guild.name}, a ${channel.type} channel was created by the name of ${channel.name} and was created ${channel.createdAt} with the ID of ${channel.id}.`);	
});

client.on('channelDelete', channel =>{ 
	channel.guild.owner.send(`In ${channel.guild.name}, a ${channel.type} channel by the name of '${channel.name}' and was successfully deleted.`);
});

client.on('channelUpdate', (oChannel, nChannel) =>{ 
	const ddiff = require('return-deep-diff');
	console.log(`ddiff(oChannel, nChannel).toString(),Channel Changes for: ${oChannel.name}, a ${oChannel.type} channel \n Old Channel Name: '${oChannel.name}' \n New Channel Name: '${nChannel.name}' 
		\n Old Channel Topic: '${oChannel.topic}' New Channel Topic: '${nChannel.topic}'`);
	nChannel.guild.owner.send(`ddiff(oChannel, nChannel).toString()`);	
	nChannel.guild.owner.send(`Channel Changes for: ${oChannel.name}, a ${oChannel.type} channel in ${oChannel.guild.name} \n Old Channel Name: '${oChannel.name}' \n New Channel Name: '${nChannel.name}' 
		\n Old Channel Topic: '${oChannel.topic}' New Channel Topic: '${nChannel.topic}'`);	
});

client.on('guildMemberRemove', member=>{
	let guild = member.guild;
	console.log(`Someone left ${guild.name}!`);
	gen.send(`Bye ${member.user}. Sorry to see you go mate!`);
});	

client.on('guildMemberUpdate', (oMember, nMember)=>{
	let guild = nMember.guild.name;
	console.log(`oMember got new roles`);
});

client.on('messageDelete', message =>{
	message.guild.channels.find('name','bot-log').send(`A message with the contents: \n\n ${message.cleanContent} \n\n written by ${message.author.username}, was deleted from ${message.channel}`);
});

var Slfunction = require('./utility/Slfunction.js');
let slfunction = new Slfunction(client, dayDiff, aDate, oldDate, currentSpotlight, cw, addedTime, date);

//it will automatically run, once program starts. 
var setSpotlight = function () {
	client.setTimeout(runSlcode, 100);
};
setSpotlight();

//ensure at reset, the date are updated so, spotlight is accurate to game. 
function runSlcode(){
	slfunction.updateDate();
	aDate = slfunction.slInfo[0];
	oldDate = slfunction.slInfo[1];
	currentSpotlight = slfunction.slInfo[2];
	cw = slfunction.slInfo[3];
	addedTime = slfunction.slInfo[4]
	date = slfunction.slInfo[5];
	var midnight = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0) - today;
	if (midnight < 0) {
    	midnight += 86400000; 
	}
	client.setInterval(function(){runSlcode}, midnight);
}

const prefix = '~';

//Handles messages and return a response once the right message triggers the action.
client.on('message', message => {
	//Updated code to use the command folder
	var str = message.content;
	var newStr = str.toLowerCase();

	if(message.author.bot) return;
	if(message.isMentioned(process.env.botID)){
		const myArray = ['I am a bot, How can I bot you away','Annoy someone else','Shoo!','Grrr!'];
		var rdm = Math.floor(Math.random() * myArray.length);
		while(rdm === oldRDM){
			rdm = Math.floor(Math.random() * myArray.length);
		}
		oldRDM = rdm;	
		message.reply(myArray[rdm]);
	} else if (newStr.includes("seems legit",0) || newStr.includes("seem legit",0)) {	
		message.channel.send('Seems Legit!');
	}else if (!newStr.includes("egg",0) && !newStr.includes("agg",0) && !newStr.includes("rgg",0) && !newStr.includes(".gg",0) && !newStr.includes("sgg",0) && !newStr.includes("igg",0)  
		&& !newStr.includes("ogg",0) && (newStr.includes("gg",0) || newStr.includes(" gg ",0) || newStr.includes("good game",0) || newStr.includes("go0d game",0)
		|| newStr.includes("g0od game",0))	|| newStr.includes("g00d game",0)) {	
		message.channel.send('Good Game!');
	} else if(message.isMentioned(process.env.ownerID)){
		message.reply('What?');
	} else if(message.author.id === process.env.ownerID){
		if(newStr.search("hey handsome") != -1){
    		message.channel.send("Hey bae");
    	}
    }
	if(!message.content.startsWith(prefix)) return;
	
	console.log("did not return :D")
	const client = message.client;
	const args = message.content.split(' ');
	const command = args.shift().slice(1);

	try{
		let cmdFile = require(`./commands/${command}`);
		//run all other command with this if statement unless it is "spotlight" as they need different vars
		if(command != 'spotlight'){
			cmdFile.run(client, message, args);
		}else{
			cmdFile.run(message, cw, currentSpotlight, date, aDate, oldDate, num, addedTime);
		}
	} catch (err){
		console.log(`Command '${command}' failed`);
	}
});

client.reload = function(command) {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });

      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = function(message) {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  let mod_role = message.guild.roles.find("name", "Mod");
  if(mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find("name", "Admin");
  if(admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if(message.author.id === process.env.ownerID) permlvl = 4;
  return permlvl;
};

client.on('warn', e =>{
	console.log(e);
});

client.on('error', e =>{
	console.log(e);
});

client.login(process.env.token);
