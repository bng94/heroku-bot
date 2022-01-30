module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setActivity("Bots");
    client.log(`Serving ${client.guilds.cache.reduce((acc, curr) => (acc += curr.memberCount), 0 )} users`,"Ready!");
    client.log(`Servers: ${client.guilds.cache.size}`,"Ready!!");
    client.log(`${client.user.tag}`,"Ready!!!");


    const startUpMsg = "Bot just started up!";

    /** Commented out DM to bot owner due to spam from heroku free hosting usage */
    //client.sendOwnerMsg(startUpMsg);
    client.log(startUpMsg, "Ready MSG");
  },
};
