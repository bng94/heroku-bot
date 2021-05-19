require('module-alias/register');
require('dotenv').config()

const Discord = require("discord.js");
const client = new Discord.Client();
//this should be initialized strictly after client is define
client.config = require("@root/config.js");

const loadCommands = require("@handlers/loadCommands.js");
const loadEvents = require("@handlers/loadEvents.js");
const loadModules = require("@handlers/loadModules.js");

const functions = require("@modules/functions.js");
functions(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

/**
 * init()
 * To load our commands, events, modules and login to our bot.
 */
const init = async () => {
    loadCommands(client);
    loadEvents(client);
    //used to as cache for permissions
    client.levelCache = {};
    for (let i = 0; i < client.config.permissions.length; i++) {
      const thisLevel = client.config.permissions[i];
      client.levelCache[thisLevel.name] = thisLevel.level;
    }
    client.login(process.env.TOKEN);

    //we need to wait here to ensure bot is ready so when we need to grab channel/users for function calls in the modules(can be called features).
    await client.wait(5000);
    loadModules(client);
}

init();