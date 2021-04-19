const Discord = require('discord.js');
module.exports = {
	name: 'unban',
	description: 'Unban someone from the server.',
    aliases: [],
	guildOnly: true,
	permissions: 4,
    minArgs: 2,
    maxArgs: -1, 
	usage: '<@user> <reason>',
	execute(message, args, client) {
        const reason = args.slice(1).join(' ');
        const user = message.mentions.users.first();
        const modLog = message.guild.channels.cache.find(ch => ch.name === 'mod-log');
        if (!modLog) return message.reply('You need a mod-log channel before you can kick in the guild!');
        if (!user) return message.reply('You must mention someone to kick them.').catch(console.error);

        try{
            let bans = message.guild.fetchBans();
            if(bans.has(user.id)){
                message.guild.members.unban(user.id, reason);
                message.channel.send(`${user} has been unbanned.`);
            }
        } catch (e){
            message.channel.send(`An error occurred! `+e);
        }
    },
};