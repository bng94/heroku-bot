const Discord = require('discord.js');
module.exports = {
    name: 'messageUpdate',
    execute(oMessage, nMessage, client) {
        let logChannel = client.channels.cache.find(ch => ch.name === 'mod-log');
        if(!logChannel) return;
        if(nMessage.guild != logChannel.guild) return;
        if (nMessage.channel.name === "mod-log") return; // If message is in the admin-log channel, do nothing.
        if (nMessage.author.bot) return; // Do nothing if the message edited was from a bot.
        if(nMessage.content === oMessage.content) return; // Do nothing if the message is the same
        //let createdAt = moment(nMessage.createdAt).format('ddd LLL [GMT+0]');
    
        let today = new Date().toUTCString();
    
        const embed = new Discord.MessageEmbed()
        .setColor(0xfffe1f)
        .setTitle(`Message Edited`)
        .setTimestamp(today);
        //.setFooter(`Message Created At: ${createdAt}`);
    
        embed.setDescription(`**Author:** ${nMessage.author} (${nMessage.author.id})\n**Channel:** ${nMessage.channel}`).addField(`Before:`,oMessage).addField(`After:`,nMessage);
        if (nMessage.attachments.size > 0) {
            let attachment = nMessage.attachments.array();
            embed.setImage(attachment[0].proxyURL);
        }
    
        logChannel.send({
        embeds: [embed]
      });.catch((e)=> client.log(e, true));
    },
};