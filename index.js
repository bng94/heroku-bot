/* This will check if the node version you are running is the required Node version, if it isn't it will throw the following error to inform you.
* Commented out incase it doesn't work with heroku
*/
//if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
// const Enmap = require("enmap");
const client = new Discord.Client();
client.config = require("./config.js");
require("./modules/functions.js")(client);
// client.commands = new Enmap();
// client.aliases = new Enmap();
const slFunction = require('./modules/slFunctions.js');
const moment = require('moment');



// client.on('guildCreate', guild =>{
// 	client.channels.find('name','general').send(`I have joined ${guild.name}!`);
// });
//
// client.on('guildDelete', guild =>{
// 	console.log(`I have left ${guild.name} at ${new Date()}!`);
// });
//
// client.on('guildMemberAdd', member=>{
// 	console.log(`Someone joined ${member.guild.name}!`);
// 	setTimeout(function () { gen.send(`Welcome to ${member.guild.name}, ${member.user}!\nEnjoy your stay!`); }, 500);
// });
//
// client.on('channelCreate', channel =>{
// 	if(channel.type == 'dm'){
// 		return;
// 	}
// 	channel.guild.owner.send(`In ${channel.guild.name}, a ${channel.type} channel was created by the name of ${channel.name} and was created ${channel.createdAt} with the ID of ${channel.id}.`);
// });
//
// client.on('channelDelete', channel =>{
// 	channel.guild.owner.send(`In ${channel.guild.name}, a ${channel.type} channel by the name of '${channel.name}' and was successfully deleted.`);
// });
//
//
// client.on('guildMemberRemove', member=>{
// 	let guild = member.guild;
// 	console.log(`Someone left ${guild.name}!`);
// 	gen.send(`Bye ${member.user}. Sorry to see you go mate!`);
// });
//
// client.on('guildMemberUpdate', (oMember, nMember)=>{
// 	let guild = nMember.guild.name;
// 	console.log(`oMember got new roles`);
// });
//
// client.on('messageDelete', message =>{
// 	message.guild.channels.find('name','bot-log').send(`A message with the contents: \n\n ${message.cleanContent} \n\n written by ${message.author.username}, was deleted from ${message.channel}`);
// });

	// if(message.isMentioned(process.env.botID)){
	// 	const myArray = ['I am a bot, How can I bot you away','Annoy someone else','Shoo!','Grrr!'];
	// 	var rdm = Math.floor(Math.random() * myArray.length);
	// 	while(rdm === oldRDM){
	// 		rdm = Math.floor(Math.random() * myArray.length);
	// 	}
	// 	oldRDM = rdm;
	// 	message.reply(myArray[rdm]);
	// } else if (newStr.includes("seems legit",0) || newStr.includes("seem legit",0)) {
	// 	message.channel.send('Seems Legit!');
	// }else if (!newStr.includes("egg",0) && !newStr.includes("agg",0) && !newStr.includes("rgg",0) && !newStr.includes(".gg",0) && !newStr.includes("sgg",0) && !newStr.includes("igg",0)
	// 	&& !newStr.includes("ogg",0) && (newStr.includes("gg",0) || newStr.includes(" gg ",0) || newStr.includes("good game",0) || newStr.includes("go0d game",0)
	// 	|| newStr.includes("g0od game",0))	|| newStr.includes("g00d game",0)) {
	// 	message.channel.send('Good Game!');
	// } else if(message.isMentioned(process.env.ownerID)){
	// 	message.reply('What?');
	// } else if(message.author.id === process.env.ownerID){
	// 	if(newStr.search("hey handsome") != -1){
  //   		message.channel.send("Hey bae");
  //   	}
  //   }


const init = async () => {
  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./commands/");
  client.log("log", `Loading a total of ${cmdFiles.length} commands.`, 'CMD');
  cmdFiles.forEach(file => {
    if (!file.endsWith(".js")) return;
    const response = client.loadCommand(file);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.log("log", `Loading a total of ${evtFiles.length} events.`, 'EVENT');
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  // Generate a cache of client permissions for pretty perms
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }
  client.login(client.config.token);
};

init();
