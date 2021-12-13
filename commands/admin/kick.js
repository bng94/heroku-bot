const Discord = require('discord.js');
module.exports = {
	name: 'kick',
	description: 'kick someone from the server.',
  aliases: ['k'],
	guildOnly: true,
	permissions: 4,
  minArgs: 2,
  maxArgs: -1, 
	usage: '<@user> <reason>',
	execute(message, args, client) {
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(' ');
    const modLog = message.guild.channels.cache.find(ch => ch.name === 'mod-log');
    if (!user) return message.reply('You must mention someone to kick them.').catch(console.error);
    if (reason.length < 1) return message.reply('You must supply a reason for the ban.');  
    if (!modLog) return message.reply('You need a mod-log channel before you can kick in the guild!');

    if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
    message.guild.member(user).kick(reason);
    message.channel.send(`${user.tag} has been Kicked!`);

    const embed = new Discord.MessageEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`,`${message.author.displayAvatarURL()}`)
      .addField(`User:`,user.tag, true)
      .addField(`User ID:`, user.id, true)
      .addField(`Action:`,`Kick`,true)
      .addField(`Reason:`, reason, true);
    modLog.send({
        embeds: [embed]
      });;
	},
};