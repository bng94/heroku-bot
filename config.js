const { ChannelType } = require("discord.js");

const config = {
  ownerID: process.env.OWNER_ID,
  admins: process.env.OWNER_ID,
  support: process.env.OWNER_ID,
  prefix: "!",
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.DEVELOPMENT_GUILD_ID,
  displayAdminCommandCallsByNonAdmin: false,
  roles: {
    modRole: {
      name: "mod",
    },
    adminRole: {
      name: "admin",
    },
  },
  modRole: "Mod",
  adminRole: "Admin",
  permissions: [
    {
      level: 0,
      name: "User",
      check: () => true,
    },
    {
      level: 3,
      name: "Moderator",
      check: ({ guild, guildMember }) => {
        const modRole = guild.roles.cache.find(
          (r) =>
            r.name.toLowerCase() === config.roles.modRole.name.toLowerCase()
        );
        const oldModRole = guild.roles.cache.find(
          (r) => r.name.toLowerCase() === config.modRole.toLowerCase()
        );
        if (modRole && guildMember.roles.cache.has(modRole.id)) {
          if (oldModRole && guildMember.roles.cache.has(oldModRole.id)) {
            return true;
          } else {
            return false;
          }
        }
      },
    },
    {
      level: 4,
      name: "Administrator",
      check: ({ guild, guildMember }) => {
        const adminRole = guild.roles.cache.find(
          (r) =>
            r.name.toLowerCase() === config.roles.adminRole.name.toLowerCase()
        );
        const oldAdminRole = guild.roles.cache.find(
          (r) => r.name.toLowerCase() === config.adminRole.toLowerCase()
        );
        if (adminRole && guildMember.roles.cache.has(adminRole.id)) return true;
        else if (oldAdminRole && guildMember.roles.cache.has(oldAdminRole.id))
          return true;
        else {
          return false;
        }
      },
    },
    {
      level: 5,
      name: "Server Owner",
      check: ({ author, channel, guild }) => {
        return channel.type === ChannelType.GuildText
          ? guild.ownerId === author.id
            ? true
            : false
          : false;
      },
    },
    {
      level: 8,
      name: "Bot Support",
      check: ({ author }) => {
        if (!config.support) {
          if (config.ownerID === author.id) {
            return true;
          } else {
            return false;
          }
        }

        return config.support.includes(author.id);
      },
    },
    {
      level: 9,
      name: "Bot Admin",
      check: ({ author }) => {
        if (!config.admins) {
          if (config.ownerID === author.id) {
            return true;
          } else {
            return false;
          }
        }

        return config.admins.includes(author.id);
      },
    },
    {
      level: 10,
      name: "Bot Owner",
      check: ({ author }) => {
        return config.ownerID === author.id;
      },
    },
  ],
};

module.exports = config;
