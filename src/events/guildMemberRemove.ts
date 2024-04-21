import { Client, EmbedBuilder, Events, GuildMember } from "discord.js";
module.exports = {
  name: Events.GuildMemberRemove,
  execute(member: GuildMember, client: Client) {
    const guild = member.guild;
    console.log(`Someone left ${guild.name} server!`);
    /**
     * Find the Welcome Channel to send a message of who left the guild
     */
    const memberLog: any = guild.channels.cache.find(
      (ch) => ch.name === "welcome"
    );
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
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: `${member.user.tag} (${member.user.id})`,
              iconURL: `${member.user.displayAvatarURL()}`,
            })
            .setFooter({
              text: `User Left}`,
            }),
        ],
      });
      console.log(e);
    }
  },
};
