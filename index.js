require('module-alias/register');
require('dotenv').config()

const Discord = require("discord.js");
const client = new Discord.Client();
//this should be initialized strictly after client is define
client.config = require("@root/config.js");

const fs = require('fs');
const spotlight = require('@modules/spotlight.js');
require("@modules/functions.js")(client);
require("@modules/time.js")(client);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

/**
 * Daily Resets 
 * Since spotlight updates on a daily reset based off GMT
 * this updates the spotlight codes and dates variables saved for spotlight
 */
client.timer;
function daily(){
    spotlight(client);
    client.holiday();
    let timeToMidnight;
    timeToMidnight = client.resetTime();
    console.log('Reset in: '+client.timeConversion(timeToMidnight)+'\n');
    clearTimeout(client.timer);
    client.timer = setTimeout(daily, timeToMidnight);
};
daily();


/**
 * init()
 * To load our commands and events and login to our bot.
 * !This should be the last function in this file to ensure everything is loaded before bot is online.
 */
const init = async () => {

    //Loads commands from commands folder
    const commandFolders = fs.readdirSync('./commands');
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        
        client.log(`Loading a total of ${commandFiles.length} commands from ${folder} folder.`, 'CMD');
        commandFiles.forEach(file =>{
            result = client.loadCommand(file, folder);
            if(result) console.log(result);
        })
    }

    //Loads events from events folder
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    client.log(`Loading a total of ${eventFiles.length} events.`, 'Event');
    let counter = 0;
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        //allows to use file name as the event name (assuming its correctly named) if event.name is not defined.
        const eventName = event.name ? event.name : file.split(".")[0];
        try{
            if (event.once) {
                client.once(eventName, (...args) => event.execute(...args, client));
            } else {
                client.on(eventName, (...args) => event.execute(...args, client));
            }
            counter++;
        } catch (e){
            console.log(`Unable to load event ${file}: ${e}`);
        }
    }
    client.log(`Successfully loaded ${counter} events.`, 'Event');

    //used to as cache for permissions
    client.levelCache = {};
    for (let i = 0; i < client.config.permissions.length; i++) {
      const thisLevel = client.config.permissions[i];
      client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(process.env.TOKEN);
}

init();