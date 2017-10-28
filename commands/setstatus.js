exports.run = function(client, message, args) {
	var action = message.content.split(' ').slice(1).join(' ');
	if(message.author.id === process.env.ownerID){
		client.user.setStatus(action);
	} else{
		message.channel.send("You do not have permission to invoke this command.")
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "setstatus",
  description: "bot's status /sarcasm",
  usage: "setstatus"
};