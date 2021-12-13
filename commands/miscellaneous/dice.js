const path = require('path');
const directory = path.basename(__dirname);
const Discord = require('discord.js');

module.exports = {
	name: 'dice',
	description: 'Generate a dice roll',
    category: directory,
    aliases: [],
	guildOnly: true,
	permissions: 0,
    minArgs: 0, 
	usage: 'dice',
	execute(message, args, client) {
        const dieResult = Math.floor(Math.random() * 6)+1;
        const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle(`You rolled a die!`)
        .setDescription(`Landed on: `+dieResult);
        return message.channel.send({
        embeds: [embed]
      });;
    },
};