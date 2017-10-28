exports.run = function(client, message) {
	message.channel.send('Pinging...').then(sent => 
	    	sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ping",
  description: "Ping/Pong command. I wonder what this does? /sarcasm",
  usage: "ping"
};