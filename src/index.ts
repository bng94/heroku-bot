import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits, Partials } from "discord.js";
import CustomClient, { functions } from "./utils/clientUtils";
import { DiscordFeaturesHandler } from "discord-features-handler";

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
}) as CustomClient;

functions(client);

DiscordFeaturesHandler(client, {
  config: "./config",
  directories: {
    main: __dirname,
    modules: "modules",
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
});
