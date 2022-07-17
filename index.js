require("module-alias/register");
require("dotenv").config();

const DiscordFeaturesHandler = require("discord-features-handler");
const { Client, Intents } = require("discord.js");

// I just pass in majority of the Intents incase I do use them along the way
// It is conventional to pass in only the intents + partials for your use cases
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

const functions = require("@modules/functions.js");

functions(client);

DiscordFeaturesHandler(client, {
  mainDirectory: __dirname,
  config: './config.js',
  disableBuiltIn: {
    commands: {
      help: true,
    }
  },
  loadCommandsLoggerOff: true,
  loadEventsLoggerOff: true,
  loadModulesLoggerOff: true,
  filesToExcludeInHandlers: {
    modules: ['functions.js', 'spotlight.js', 'time.js'],
  },
  BOT_TOKEN: process.env.TOKEN
});