module.exports = {
	name: 'eval',
	description: 'Evaluates stuff!',
    aliases: [],
	guildOnly: true,
	permissions: 10,
    minArgs: 0, 
    maxArgs: -1, 
	usage: '<code>',
	async execute(message, args, client) {
        // doubles check to ensure safety.
		if(message.author.id !== client.config.ownerID) return; 
        setTimeout(() => {message.delete()}, 30000);

        const code = args.join(" ");
        try {
            const evaled = eval(code);
            const clean = await client.clean(client, evaled);
            message.channel.send(`\`\`\`js\n${clean}\n\`\`\``).then(msg => setTimeout(() => {msg.delete();}, 30000));
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``).then(msg => setTimeout(() => {msg.delete();}, 30000));
        }
	},
};