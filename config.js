const config = {
  "ownerID": "210587665723162626",
  "admins": "210587665723162626",
  "support": "210587665723162626",
  "prefix": "-",

  //defines the mod role and admin role names for permissions.
  "modRole": "Mod",
  "adminRole": "Admin",

  // PERMISSION LEVEL DEFINITIONS.
  permissions: [
    //Default 
    {
      level: 0,
      name: "User",
      check: () => true
    }, 
    { 
      level: 3,
      name: "Moderator",
      check: (author, channel, guild, guildMember) => {
        try {
          const modRole = guild.roles.cache.find(r => 
            r.name.toLowerCase() === config.modRole.toLowerCase()
          );
          if (modRole && guildMember._roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    { 
      level: 4,
      name: "Administrator",
      check: (author, channel, guild, guildMember) => {
        try {
          const adminRole = guild.roles.cache.find(r => 
            r.name.toLowerCase() === config.adminRole.toLowerCase()
          );
          return (adminRole && guildMember._roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { 
      level: 5,
      name: "Server Owner",
      check: (author, channel, guild) => {
        channel.type === 'GUILD_TEXT' ? (guild.ownerId === author.id ? true : false) : false
      }
    },
    // Level 5 6 7, are defined whatever feel fits
    { 
      level: 8,
      name: "Bot Support",
      // The check is by reading if an ID is part of this array. Yes, this means you need to
      // change this and reboot the bot to add a support user. Make it better yourself!
      check: (author) => {
        if(!config.support){
          if(config.ownerID === author.id){
            return true;
          } else {
            return false;
          }
        }
        
        return config.support.includes(author.id);
      }
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    { 
      level: 9,
      name: "Bot Admin",
      check: (author) => {
        if(!config.admins){
          if(config.ownerID === author.id){
            return true;
          } else {
            return false;
          }
        }
        
        return config.admins.includes(author.id);
      }
    },
    //Highest Permissions because of dangerous commands such as eval is only ran by the owner
    { 
      level: 10,
      name: "Bot Owner",
      // Another simple check, compares the message author id to the one stored in the config file.
      check: (author) => config.ownerID === author.id
    }

  ],
};

module.exports = config;