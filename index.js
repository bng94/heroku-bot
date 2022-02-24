require("module-alias/register");
require("dotenv").config();

const { Client, Collection, Intents } = require("discord.js");

// !This is the new way to create the client.
// I just pass in majority of the Intents incase I do use them along the way
// I believe its preferred to pass in the intents you are using then all.
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
//this should be initialized strictly after client is define
client.config = require("@root/config.js");

const loadCommands = require("@handlers/loadCommands.js");
const loadEvents = require("@handlers/loadEvents.js");
const loadModules = require("@handlers/loadModules.js");

const functions = require("@modules/functions.js");
functions(client);

client.commands = new Collection();
client.aliases = new Collection();

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
};

init();
