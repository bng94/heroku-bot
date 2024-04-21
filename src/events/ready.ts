import { Client, Events } from "discord.js";

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client) {
    // Sets the Activity of the bot to, "Bot is online"
    client.user?.setActivity("Bot is online");

    const serverSize = client.guilds.cache.size;

    // State the bot's discord tag, and how many server(s) it is in and then the total count of users it fetched.
    client.log(
      `${client.user?.tag} is currently in ${
        serverSize > 1 ? `${serverSize} servers` : `${serverSize} server`
      } and is serving ${client.guilds.cache.reduce(
        (acc, curr) => (acc += curr.memberCount),
        0
      )} users`,
      "Ready"
    );

    const startUpMsg = "Bot just started up!";

    /** Commented out DM to bot owner due to spam from heroku free hosting server */
    //client.sendOwnerMsg(startUpMsg);

    // log and say bot is online!
    client.log(startUpMsg, "Ready MSG");
  },
};
