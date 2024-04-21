import { Client, Message } from "discord.js";

module.exports = {
  name: "setgame",
  description: "Set Activity Status of the bot!",
  aliases: [],
  guildOnly: true,
  permissions: 10,
  minArgs: 1,
  usage: "<action>",
  execute(message: Message, args: string[], client: Client) {
    let action = message.content.split(" ").slice(1).join(" ");
    client.user?.setActivity(action);
  },
};
