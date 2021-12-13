const path = require('path');
const directory = path.basename(__dirname);

const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
	name: 'lockdown',
	description: `Deny those without "send message" permissions to send message in current channel!`,
  category: directory,
  aliases: [],
	guildOnly: true,
	permissions: 4,
  minArgs: 1, 
	usage: '<time>',
	execute(message, args, client) {
    if (!client.lockit) client.lockit = [];
    const time = args.join(' ');
    const validUnlocks = ['release', 'unlock'];
    if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds').then(msg => setTimeout(() => {msg.delete();}, 15000));
    message.delete();
  
    const modLog = message.channel;
  
    let embed = new Discord.MessageEmbed()
        .setColor(0xffff00)
        .setTimestamp()
        .setThumbnail(`${message.guild.iconURL()}`)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`,`${message.author.displayAvatarURL()}`)
        .addField(`Channel:`,`${message.channel}`,true)
        .addField(`Channel ID:`,`${message.channel.id}`,true);

    if (validUnlocks.includes(time)) {
        message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false }).then(() => {
        message.channel.send('Lockdown lifted.').then(msg => setTimeout(() => {msg.delete();}, 300));
        clearTimeout(client.lockit[message.channel.id]);
        delete client.lockit[message.channel.id];
      }).catch((e)=> client.log(e, true));
    } else {
      embed.addField(`Action:`,`Lockdown`,true);
      embed.addField(`Length:`, time, true);
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false }).then(() => {
        message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`).then((msg) => {
          client.lockit[message.channel.id] = setTimeout(() => {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null }).then(message.channel.send('Lockdown lifted.').then(msg => setTimeout(() => {msg.delete();}, 500))).catch(console.error);
            delete client.lockit[message.channel.id];
          }, ms(time));
          setTimeout(() => {msg.delete();}, 500);
        }).catch((e)=> client.log(e, true));
      });
    }
  
    try{
        modLog.send({
        embeds: [embed]
      });;
    }catch(e){
        client.log(e,true);
    }
	},
};