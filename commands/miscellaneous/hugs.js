const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'hug',
	description: 'Hug someone with a random anime hug gifs',
    aliases: ['hugs'],
	guildOnly: true,
	slash: true,
	slashOptions: [{ name: 'someone', description: 'Mention Someone', required: true, type: 6 }],
	permissions: 0,
    minArgs: 1,
	usage: '<@someone>',
	async execute(message, args, client, interaction) {

        let lookup = args[0];
        if(!message){
            lookup = args.someone;
        }
        let user = client.getUserFromMention(lookup);

        if(!user){
            return message ? message.channel.send(`You must mention someone!`) : `You must mention someone!`;
        }
        
        const url = await fetch(`https://nekos.life/api/v2/img/hug`).then(res => res.json()).then((body) => body.url);
        let embed = new Discord.MessageEmbed()
            .setImage(url)
            .setColor(0x00ff00);

        const hugged = user.nickname ? user.nickname : user.username;
        if(message){
            const hugger = message.member.nickname ? message.member.nickname : message.member.username;
            embed.setDescription(`**${hugger}** hugged **${hugged}**!`)
            return message.channel.send(embed);
        } 

        const hugger = interaction.member.nick ? interaction.member.nick : interaction.member.user.username;
        embed.setDescription(`**${hugger}** hugged **${hugged}**!`)
        return embed;
    },
};