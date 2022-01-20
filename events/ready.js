module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setActivity("Bots");
    client.log(`Serving ${client.guilds.cache.reduce((acc, curr) => (acc += curr.memberCount), 0 )} users`,"Ready!");
    client.log(`Servers: ${client.guilds.cache.size}`,"Ready!!");
    client.log(`${client.user.tag}`,"Ready!!!");


    const startUpMsg = "Bot just started up!";
    const afterRestartMsg = "Bot is now back online!";

	client.sendOwnerMsg(startUpMsg);
  },
};
