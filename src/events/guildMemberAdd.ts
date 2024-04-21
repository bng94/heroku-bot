import {
  Client,
  EmbedBuilder,
  Events,
  GuildBasedChannel,
  GuildMember,
  GuildTextBasedChannel,
  TextChannel,
} from "discord.js";

module.exports = {
  name: Events.GuildMemberAdd,
  execute(member: GuildMember, client: Client) {
    const guild = member.guild;
    console.log(`Someone joined ${guild.name} server!`);

    /**
     * Find the Welcome Channel to send a message of who joins the guild
     */
    const memberLog: any = guild.channels.cache.find(
      (ch) => ch.name === "welcome"
    );
    if (!memberLog) return;

    try {
      setTimeout(function () {
        /**
         * Create an Embed Message that is ready to send when a user joins the guild!
         */
        const embed = new EmbedBuilder()
          .setColor(0x34f937)
          .setAuthor({
            name: `${member.user.tag} (${member.user.id})`,
            iconURL: `${member.user.displayAvatarURL}`,
          })
          .setTimestamp()
          .setFields({
            name: "Account created At",
            value: `${client.users?.cache
              .find((x) => x.id === member.user.id)
              ?.createdAt.toString()}`,
          })
          .setFooter({ text: `User Joined` });
        memberLog?.send({
          embeds: [embed],
        });
      }, 500);
    } catch (e) {
      client.log(e);
      client.sendOwnerMsg(`Member Log message failed to send.`);
      setTimeout(function () {
        memberLog.send(
          `${member.user.tag} (${
            member.user.id
          })\n\n Account created At: ${client.users?.cache
            .find((x) => x.id === member.user.id)
            ?.createdAt.toString()} \n\n User Joined `
        );
      }, 500);
    }
  },
};
