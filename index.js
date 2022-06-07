require("module-alias/register");
require("dotenv").config();

const DiscordFeaturesHandler = require("discord-features-handler");
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

const functions = require("@modules/functions.js");
functions(client);

DiscordFeaturesHandler(client, {
  mainDirectory: __dirname,
  config: './config.js',
  commandDir: 'commands',
  eventDir: 'events',
  modulesDir: 'modules',
  filesToExcludeInHandlers: ['function.js', 'spotlight.js', 'restartMsg.js', 'time.js'],
  BOT_TOKEN: process.env.TOKEN
});