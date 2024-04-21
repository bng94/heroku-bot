import { Client, Message } from "discord.js";

module.exports = {
  name: "level",
  description: "Tells you your permission level for the bot.",
  aliases: ["mylevel"],
  permissions: 0,
  minArgs: 0,
  usage: "",
  execute(message: Message, args: string[], client: Client, level: number) {
    const title = client.config?.permissions?.find(
      (l) => l.level === level
    )?.name;
    message.reply(`Your permission level is: ${level} - ${title}`);
  },
};
