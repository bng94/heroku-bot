const Discord = require('discord.js');
module.exports = {
    name: 'guildCreate',
    execute(guild, client) {
        let gen = guild.channels.cache.find(ch => ch.name === "general");
        if(!gen || (gen.cache.permissionsFor(client.user).has("SEND_MESSAGE") == false)){
          gen = guild.channels.cache.permissionsFor(client.user).has("SEND_MESSAGE").first();
        }
          gen.send(`Hey, thanks for the invite!\nPlease type '${client.config.prefix}help' to see my list of commands that are available.`);
    },
};