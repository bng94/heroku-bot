module.exports = {
	name: 'purge',
	description: 'Delete the stated amount of messages along with the command call.',
    aliases: [],
	guildOnly: true,
	permissions: 4,
    minArgs: 1, 
	usage: '<#>',
	execute(message, args, client) {
        let amount = args[0];
        // if(amount.toLowerCase() == 'all') amount = 100;
        let limit = Number(amount) + 1;
        message.channel.messages.fetch({ limit: limit }).then(messages => {
            message.channel.bulkDelete(messages);
            message.reply("deleted " + (messages.array().length-1) + " messages, including deletion command.").then(msg=> setTimeout(()=>{msg.delete()}, 5000));
        }).catch(e => {
            client.log(e, true)
            message.channel.send("Failed to delete messages. This may be caused by attempting to delete messages that are over 2 weeks old.");
        });

	},
};