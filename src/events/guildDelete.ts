import { Client, Events, Guild } from "discord.js";

module.exports = {
  name: Events.GuildDelete,
  execute(guild: Guild, client: Client) {
    // display console log of which guild that this bot left.
    console.log(`Just leave ${guild.name} server!`);
  },
};
