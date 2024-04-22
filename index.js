require("module-alias/register");
require("dotenv").config();

const functions = require("@modules/functions.js");
const { DiscordFeaturesHandler } = require("discord-features-handler");
const { Client, GatewayIntentBits, Partials } = require("discord.js");

// I just pass in majority of the Intents incase I do use them along the way
// It is conventional to pass in only the intents + partials for your use cases
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Channel, Partials.Reaction],
});
//this should be initialized strictly after client is define

/**
 * Loading our function modules here
 */
functions(client);

DiscordFeaturesHandler(client, {
  config: "./config.js",
  directories: {
    main: __dirname,
  },
  builtin_files: {
    commands: {
      help: true,
    },
  },
  onLoad_list_files: {
    commands: true,
    events: true,
    modules: true,
  },
  filesToExcludeInHandlers: {
    modules: ["functions.js"],
  },
});
