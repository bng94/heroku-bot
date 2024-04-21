import {
  ChannelType,
  Client,
  Events,
  Guild,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";

module.exports = {
  name: Events.GuildCreate,
  execute(guild: Guild, client: Client) {
    // Find the #general channel upon getting invited to join the channel.
    let gen: TextChannel | null = guild.channels.cache.find(
      (ch) => ch.name === "general"
    ) as TextChannel | null;
    if (!gen) {
      // If #general channel is not found, find the first text channel where the bot can send messages.
      gen = guild.channels.cache
        .filter(
          (ch) =>
            ch.type === ChannelType.GuildText &&
            ch
              .permissionsFor(client.user!)
              ?.has(PermissionFlagsBits.SendMessages)
        )
        .first() as TextChannel | null;
    }

    if (!gen) {
      gen = guild.channels.cache
        .filter(
          (ch) =>
            ch.type === ChannelType.GuildText &&
            ch
              .permissionsFor(client.user!)
              ?.has(PermissionFlagsBits.SendMessages)
        )
        .first() as TextChannel | null;
    } else {
      gen
        .fetch()
        .then((ch) =>
          ch.send(
            `Hey, thanks for the invite!\nPlease type '${client.config.prefix}help' to see my list of commands that are available.`
          )
        );
    }
  },
};
