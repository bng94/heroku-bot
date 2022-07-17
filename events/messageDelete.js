const Discord = require('discord.js');
module.exports = {
    name: 'messageDelete',
    execute(message, client) {
        // find the #mod-log channel and if exists then log message that has been deleted
        const logChannel = client.channels.cache.find(ch => ch.name === 'mod-log');
        if(!logChannel) return;
        if(message.guild != logChannel.guild) return;

        // Get the arguments after a command
        const args = message.content.slice(1).trim().split(/ +/g); 
        // Get the command used
        const command = args.shift().toLowerCase(); 
        if (client.commands.has(command)) return;
        // If message is in the log channel, do nothing.
        if (message.channel === message.guild.channels.cache.find(c => c.name === "mod-log")) return; 
        // Do nothing if the message deleted was from a bot.
        if (message.author.bot) return; 
    
        // let createdAt = moment(message.createdAt).format('ddd LLL [GMT+0]');
    
        const embed = new Discord.MessageEmbed()
        .setColor(0xff1900)
        .setTitle(`Message Deleted`)
        .setTimestamp();
        //.setFooter(`Message Created At: ${createdAt}`);
        embed.setDescription(`**Author:** ${message.author} (${message.author.id})\n**Channel:** ${message.channel} \n**Content:** ${message.content}`);
        if (message.attachments.size > 0) {
            let attachment = message.attachments.array();
            embed.setImage(attachment[0].proxyURL);
        }
        logChannel.send({
        embeds: [embed]
      }).catch((e)=> client.log(e, true));
    },
};