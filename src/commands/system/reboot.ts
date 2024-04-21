import { Client, Message } from "discord.js";

module.exports = {
  name: "reboot",
  description: "Shuts down the bot! Restarts if using PM2",
  aliases: ["restart"],
  guildOnly: false,
  permissions: 8,
  minArgs: 0,
  usage: "",
  async execute(message: Message, args: string[], client: Client) {
    message.channel.send("Restarting...");

    client.commands.forEach(async (cmd) => {
      client.unLoadCommand(cmd.name, cmd.category);
    });
    process.exit(1);
  },
};
