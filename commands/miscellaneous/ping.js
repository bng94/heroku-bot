const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Ping Pong Command!",
  aliases: ["p"],
  guildOnly: true,
  permissions: 0,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping Pong Command"),
  minArgs: 0,
  usage: "",
  execute(message, args, client, level) {
    message.channel.send("Calculating...").then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp;

      resultMessage.edit(
        `Bot latency: ${ping}, API Latency: ${client.ws.ping}`
      );
    });
  },
  async interactionReply(interaction, client) {
    await interaction.deferReply();
    await client.wait(3000);
    await interaction.editReply({
      content: "Pong",
    });
  },
};
