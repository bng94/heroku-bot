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
	async execute(message, args, client) {
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(' ');
    const modLog = message.guild.channels.cache.find(ch => ch.name === 'mod-log');
    if (!user) return message.reply('You must mention someone to kick them.').catch(console.error);
    if (reason.length < 1) return message.reply('You must supply a reason for the ban.');  
    if (!modLog) return message.reply('You need a mod-log channel before you can kick in the guild!');

    const guildMember = await message.guild.members.fetch(user);

    if (!guildMember.kickable) return message.reply('I cannot kick that member');
    guildMember.kick(reason);
    message.channel.send(`${user.tag} has been Kicked!`);

    const embed = new Discord.MessageEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setAuthor({
        name: `${message.author.username}#${message.author.discriminator}`,
        iconURL: `${message.author.displayAvatarURL()}`,
      })
      .setFields({
        name: 'User:',
        value: user.tag,
        inline: true
      },{
        name: 'User ID:',
        value: user.id,
        inline: true
      },{
        name: 'Action:',
        value: `Kick`,
        inline: true
      },{
        name: 'Reason:',
        value: reason,
        inline: true
      });
    modLog.send({
        embeds: [embed]
      });;
	},
};