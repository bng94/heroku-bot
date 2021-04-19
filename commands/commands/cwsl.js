const Discord = require('discord.js');

module.exports = {
	name: 'cwsl',
	description: 'Display next and following Castle Wars Spotlight Dates!',
    aliases: ['cw'],
	guildOnly: true,
	permissions: 0,
	slash: true,
    minArgs: 0, 
    usage: '',
	execute(message, args, client) {
		let cw = client.cw;
        if(cw != "NOW"){
            cw=cw+` days`;
        }

        let embed = new Discord.MessageEmbed()
            .setTimestamp()
            .addField(`Castle Wars Spotlight in ${cw}`,`${client.nextCWSLDate}`)
            .addField(`Following Castle Wars Spotlight in ${client.followingCW} days`,`${client.followingCWSLDate}`);

        try{

            if(message){
                embed.setAuthor(`${message.author.username}#${message.author.discriminator}`, `${message.author.displayAvatarURL()}`)
                return message.channel.send({embed});
            }
            return embed;
        }catch(e){
            client.log(e, true);
        }
	},
};