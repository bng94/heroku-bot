import { Message } from "discord.js";

const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "dice",
  description: "Generate a dice roll",
  aliases: [],
  guildOnly: true,
  permissions: 0,
  minArgs: 0,
  usage: "dice",
  execute(message: Message) {
    const dieResult = Math.floor(Math.random() * 6) + 1;
    const embed = new EmbedBuilder()
      .setTimestamp()
      .setTitle(`You rolled a die!`)
      .setDescription(`Landed on: ` + dieResult);
    return message.channel.send({
      embeds: [embed],
    });
  },
};
