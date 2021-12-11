const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'hug',
    description: 'Hug someone with a random anime hug gifs',
    aliases: ['hugs'],
    guildOnly: true,
    slash: true,
    slashOptions: [{
        name: 'someone',
        description: 'Mention Someone',
        required: true,
        type: 6
    }],
    permissions: 0,
    minArgs: 1,
    usage: '<@someone>',
    async execute(message, args, client) {

        const lookup = args.join(' ').toString().trim();
        const user = await client.getUserFromMention(lookup);
        if (!user) return message.channel.send(`You must mention someone!`);
        const hugger = message.member.nickname ? message.member.nickname : message.member.username; 
        
        try {
            const embed = await hugMsg(user, hugger);
            return message.channel.send({ embeds: [embed] });
        } catch (e){
            client.log(e);
        }
    },
    async interactionReply(interaction, client){
		await interaction.deferReply();
        const { options } = interaction;
        const user = await options.getUser('someone');
        if(!user) return `You must mention someone!`;
        const hugger = interaction.member.nick ? interaction.member.nick : interaction.member.user.username;

        try {
            const embed = await hugMsg(user, hugger);
            await interaction.editReply({
                embeds: [embed],
            })
        } catch (e){
            client.log(e);
        }

    }
};

const hugMsg = async (user, hugger) => {

    try{
        const url = await fetch(`https://nekos.life/api/v2/img/hug`)
            .then(res => res.json())
            .then((body) => body.url);
            
        const hugged = user.nickname ? user.nickname : user.username;
        console.log(hugged);
        return new Discord.MessageEmbed()
            .setDescription(`**${hugger}** hugged **${hugged}**!`)
            .setImage(url)
            .setColor(0x00ff00)
            .setTimestamp();
    } catch(e){
        console.log(`errrrrrrrr`)
        console.log(e);

    }

}