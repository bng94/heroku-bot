const Discord = require("discord.js");
module.exports = {
  name: "guildMemberRemove",
  execute(member, client) {
    const guild = member.guild;
    console.log(`Someone left ${guild.name} server!`);
    let memberLog = guild.channels.cache.find((ch) => ch.name === "welcome");
    if (!memberLog) return;

    const embed = new Discord.MessageEmbed()
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
