const Discord = require("discord.js");
module.exports = {
  name: "guildCreate",
  execute(guild, client) {
    // Find the #general channel upon getting invited to join the channel.
    let gen = guild.channels.cache.find((ch) => ch.name === "general");
    if (
      !gen ||
      gen.cache.permissionsFor(client.user).has("SEND_MESSAGE") == false
    ) {
      gen = guild.channels.cache
        .permissionsFor(client.user)
        .has("SEND_MESSAGE")
        .first();
    } else {
      gen.send(
        `Hey, thanks for the invite!\nPlease type '${client.config.prefix}help' to see my list of commands that are available.`
      );
    }
  },
};
