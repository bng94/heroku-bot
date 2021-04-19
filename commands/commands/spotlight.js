const path = require('path');
const directory = path.basename(__dirname);
const Discord = require('discord.js');

module.exports = {
	name: 'spotlight',
	description: 'Display the current and next spotlight dates!',
    category: directory,
    aliases: ['sl'],
	guildOnly: true,
	permissions: 0,
    minArgs: 0, 
    usage: '',
	execute(message, args, client) {
        console.log(`Time until next spotlight is `+client.timeToNextSL+` Days.`);
        console.log(`Current Spotlight is: ${client.currentSL}`);
        console.log(`Next Spotlight is: ${client.nextSL}`);
        let cw = client.cw;
    
        if(cw != "NOW"){
        cw=cw+` days`;
        }
    
        let embed = new Discord.MessageEmbed()
        .addField(`Current Spotight:`,client.currentSL)
        .addField(`Next Spotight in ${client.timeToNextSL} days is:`,client.nextSL);
    
        if(client.currentSL != "Castle Wars"){
        embed.addField(`Castle Wars SpotLight:`,cw);
        }
    
        try{
            message.channel.send({embed});
        }catch(e){
            client.log(e, true);
            message.channel.send("Embed has failed...");
        }
    },
};