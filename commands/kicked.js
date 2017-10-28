exports.run = function(client, message, args) {
	if((process.env.botID != message.mentions.users.first().id) && message.mentions.users.size === 1){
  		message.channel.send('**'+`${message.mentions.users.first().username}`+'**: This is so predictable.\n**'
  			+`${message.author.username}`+'**: Before you go....\n*'
  			+`${message.mentions.users.first().username}`+' threw a :boot: at '+`${message.author.username}`+'\'s head*\n**'
  			+`${message.author.username}`+'**: What happen?\n**'+`${message.mentions.users.first().username}`+'** Oh nothing... you were saying?\n**'
  			+`${message.author.username}`+'**: I can\'t remember...');
  	}else if(message.mentions.users.size === 1){
  		message.channel.send('**'+`${message.author.username}`+'**: Here is my :feet: and my :boot:.\n**'
  			+`${message.mentions.users.first().username}`+'**: Um.... okay?\n**'
  			+`${message.author.username}`+'**: You\'re going to get a kick out of this!\n*'
  			+`${message.author.username}`+' threw a :boot: at '+`${message.mentions.users.first().username}`+'\'s head*');
  	}else{
  		message.channel.send('```~kick <user>\n\nSend a kick to the user!\n\nExample: kick @User```');
  	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "kicked",
  description: "kick someone /sarcasm",
  usage: "kicked"
};