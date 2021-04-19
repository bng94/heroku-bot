module.exports = {
	name: 'boot',
	description: 'Give someone the boot...',
    aliases: [],
	guildOnly: true,
	permissions: 0,
    minArgs: 1, 
	usage: 'boot',
	execute(message, args, client) {

        let user = client.getUserFromMention(args[0]);

        if(!user){
            return message.channel.send(`You must mention someone!`);
        }
    
        const name = user.nickname ? user.nickname : user.username;
        const author = message.member.nickname ? message.member.nickname : message.author.username;
        if(user.id === client.config.ownerID || client.id === user.id){
            return message.channel.send(`
            **${name}:**: This is so predictable.\n**${author}**: Before you go...\n**${name}** threw a :boot: at **${author}**'s head\n**${author}**: What happen?\n**${name}**: Oh nothing, you were saying?\n**${author}**: I can't remember...
            `);
        } else {
            return message.channel.send(`
            **${author}**: Here is my :feet: and my :boot:.\n**${name}**: Um....Okay\n**${author}**: You're going to get a kick out of this!\n**${author}** threw a :boot: at **${name}**'s head
            `)
        }
	},
};