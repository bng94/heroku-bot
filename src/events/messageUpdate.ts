import { ChannelType, Client, EmbedBuilder, Events, Message } from "discord.js";

module.exports = {
  name: Events.MessageUpdate,
  execute(oMessage: Message, nMessage: Message, client: Client) {
    // find the #mod-log channel and if exists then log message that has been edited
    const logChannel = client.channels.cache.find(
      (ch) => ch.type === ChannelType.GuildText && ch.name === "mod-log"
    );
    if (
      !logChannel ||
      (logChannel && logChannel?.type !== ChannelType.GuildText)
    )
      return;
    if (nMessage.guild != logChannel.guild) return;
    if (
      nMessage.channel.type === ChannelType.GuildText &&
      nMessage.channel.name === "mod-log"
    )
      return; // If message is in the admin-log channel, do nothing.
    if (nMessage.author.bot) return; // Do nothing if the message edited was from a bot.
    if (nMessage.content === oMessage.content) return; // Do nothing if the message is the same
    //let createdAt = moment(nMessage.createdAt).format('ddd LLL [GMT+0]');

    const embed = new EmbedBuilder()
      .setColor(0xfffe1f)
      .setTitle(`Message Edited`)
      .setTimestamp();
    //.setFooter(`Message Created At: ${createdAt}`);

    embed
      .setDescription(
        `**Author:** ${nMessage.author} (${nMessage.author.id})\n**Channel:** ${nMessage.channel}`
      )
      .setFields([
        { name: `Before:`, value: oMessage.content },
        { name: `After:`, value: nMessage.content },
      ]);
    if (nMessage.attachments.size > 0) {
      let attachment = nMessage.attachments;
      embed.setImage(attachment[0].proxyURL);
    }

    logChannel
      .send({
        embeds: [embed],
      })
      .catch((e) => client.log(e, true));
  },
};
