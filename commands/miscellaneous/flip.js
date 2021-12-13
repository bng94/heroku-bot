const Discord = require('discord.js');

module.exports = {
	name: 'flip',
	description: 'Flip a coin',
  aliases: [],
	guildOnly: true,
	permissions: 0,
  minArgs: 0, 
	usage: 'flip',
	execute(message, args, client) {
        const flipResult = Math.floor(Math.random() * 2) == 0 ? "**HEADS**" : "**TAILS**";
        const embed = new Discord.RichEmbed()
        .setTimestamp()
        .setTitle(`You tossed a coin!`)
        .setDescription(`Landed on: ${flipResult}`);
      return message.channel.send({
        embeds: [embed]
      });;
    },
};