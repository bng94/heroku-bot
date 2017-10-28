exports.run = function(client, message, args) {
	const iceArray = [':ice_cream:',':icecream:',':shaved_ice:'];
	var randice = Math.floor(Math.random() * iceArray.length);
	if((process.env.botID != message.mentions.users.first().id) && message.mentions.users.size === 1){
		message.channel.send('**'+`${message.mentions.users.first().username}`+'**, you got '+`${iceArray[randice]}`+' from **'
			+`${message.author.username}`+'**\n\n**'+`${message.mentions.users.first().username}`+'** gives **'+
			`${message.author.username}`+'** :icecream: as thanks!');
	}else if(message.mentions.users.size === 1){
		message.channel.send('**'+`${message.mentions.users.first().username}`+'**, you got '+`${iceArray[randice]}`+' from **'
			+`${message.author.username}`+'**');
  	}else{
  		message.channel.send('```~icecream <user>\n\n Gives an icecream to the user!\n\nExample: icecream @User```');
  	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "icecream",
  description: "Give someone an icecream /sarcasm",
  usage: "icecream"
};