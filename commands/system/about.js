const { version } = require("discord.js");
const pack = require("../../package.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "about",
  description: "Display information about this bot.",
  aliases: [],
  guildOnly: true,
  permissions: 0,
  minArgs: 0,
  usage: "",
  execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor(0x800000)
      .setThumbnail(`${client.user.avatarURL()}`)
      .setTitle(`About Me`)
      .setDescription(`I am a bot created for my personal server!`)
      .setAuthor({ name: `${pack.name} v${pack.version}` })
      .addFields([
        {
          name: `Developer:`,
          value: `${client.users.cache.get(client.config.ownerID)}`,
        },
        {
          name: `Library:`,
          value: `Discord.js v${version}\nNode ${process.version}`,
          inline: true,
        },
      ]);

    try {
      return message.channel.send({
        embeds: [embed],
      });
    } catch (e) {
      console.log(e);
    }
  },
};
