const { version } = require("discord.js");
const pack = require("@root/package.json");
const Discord = require('discord.js');

module.exports = {
	name: 'about',
	description: 'Display information about this bot.',
  aliases: [],
	guildOnly: true,
	permissions: 0,
  minArgs: 0, 
	usage: '',
	execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
        .setColor(0x800000)
        .setThumbnail(`${client.user.avatarURL()}`)
        .setTitle(`About Me`)
        .setDescription(`I am a bot created for my personal server!`)
        .setAuthor(`${pack.name} v${pack.version}`)
        .addField(`Developer:`,`${client.users.cache.get(client.config.ownerID)}`)
        .addField(`Library:`,`Discord.js v${version}\nNode ${process.version}`,true)
        .addField(`My Server:`,process.env.serverLink,true);
    
      try{
        message.channel.send({embed});
      }catch(e){
        console.log(e);
      }
	},
};