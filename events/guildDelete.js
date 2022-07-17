const Discord = require('discord.js');
module.exports = {
    name: 'guildDelete',
    execute(guild, client) {
        // display console log of which guild that this bot left.
        console.log(`Just leave ${guild.name} server!`)
    },
};