module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setActivity("Bots");
    client.log(
      `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`,
      "Ready!"
    );

    const startUpMsg = "Bot just started up!";
    const afterRestartMsg = "Bot is now back online!";

	client.sendOwnerMsg(startUpMsg);
  },
};
