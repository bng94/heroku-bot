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
	execute(message, args, client, level) {
        try{
            const embed = spotlightEmbed(client);
            return message.channel.send({embeds: [embed]});
        }catch(e){
            client.log(e, true);
        }
	},
    async interactionReply(interaction, client) {
        const embed = spotlightEmbed(client);
        await interaction.reply({
            embeds: [embed],
        })
    }  
};

const spotlightEmbed = (client) => {
    let cw = client.cw;
    if(cw != "NOW"){
        cw=cw+` days`;
    }

    const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setDescription(`Castle Wars Spotlights Dates`)
        .addFields([{
            name: `Next Spotlight in ${cw}`,
            value: `${client.nextCWSLDate}`
        }, {
            name: `Following Spotlight in ${client.followingCW} days`,
            value: `${client.followingCWSLDate}`
        }]);
    return embed;

}