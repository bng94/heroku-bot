const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "guildMemberRemove",
  execute(member, client) {
    const guild = member.guild;
    console.log(`Someone left ${guild.name} server!`);
    /**
     * Find the Welcome Channel to send a message of who left the guild
     */
    const memberLog = guild.channels.cache.find((ch) => ch.name === "welcome");
    if (!memberLog) return;

    /**
     * Create an Embed Message that is ready to send when a user left the guild!
     */
    const embed = new EmbedBuilder()
      .setColor(0xff0300)
      .setAuthor({
        name: `${member.user.tag} (${member.user.id})`,
        iconURL: `${member.user.displayAvatarURL()}`,
      })
      .setTimestamp()
      .setFooter({ text: `User Left` });
    try {
      memberLog.send({
        embeds: [embed],
      });
    } catch (e) {
      memberLog.send({
        embeds: {
          color: 12589339,
          author: {
            name: `${member.user.tag} (${member.user.id})`,
            icon_url: `${member.user.displayAvatarURL()}`,
          },
          footer: {
            text: `User Left | ${client.timeNow()}`,
          },
        },
      });
      console.log(e);
    }
  },
};
