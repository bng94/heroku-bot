import { Client, Interaction, Message, SlashCommandBuilder } from "discord.js";

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
  execute(message: Message, args: string[], client: Client) {
    message.channel.send("Calculating...").then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp;

      resultMessage.edit(
        `Bot latency: ${ping}, API Latency: ${client.ws.ping}`
      );
    });
  },
  async interactionReply(interaction: Interaction, client: Client) {
    if (!interaction.isCommand()) return;
    await interaction.deferReply();
    await client.wait(3000);
    await interaction.editReply({
      content: "Pong",
    });
  },
};
