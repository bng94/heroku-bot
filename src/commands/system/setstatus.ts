import {
  Client,
  Message,
  PresenceStatusData,
  PresenceUpdateStatus,
} from "discord.js";

module.exports = {
  name: "setstatus",
  description: "Set Online, Idle, Invisible, Do Not Disturb Status of the bot!",
  aliases: ["ss"],
  guildOnly: true,
  permissions: 10,
  minArgs: 1,
  usage: "<on|idle|invisible|dnd>",
  async execute(message: Message, args: string[], client: Client) {
    let newStatus = args.join(" ") as keyof typeof status;
    const status: {
      on: PresenceStatusData;
      idle: PresenceStatusData;
      invisible: PresenceStatusData;
      dnd: PresenceStatusData;
    } = {
      on: "online",
      idle: "idle",
      invisible: "invisible",
      dnd: "dnd",
    };
    if (!status[newStatus]) newStatus = "on";
    client.user?.setStatus(status[newStatus]);
    message.channel.send(`Bot is now **${client.user?.presence.status}**`);
  },
};
