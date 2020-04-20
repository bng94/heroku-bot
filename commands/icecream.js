//Gives icecream to a user. Return icecream as a gift if its bot owner
exports.run = async (client, message, args, level) => {
	const iceArray = [':ice_cream:',':icecream:',':shaved_ice:'];
	var randice = Math.floor(Math.random() * iceArray.length);

	if(message.mentions.users.size == 0){
		return message.channel.send(`You must mention someone!`);
	}else if(message.mentions.users.size > 1){
		return message.channel.send(`You can only mention one user!`);
	}

	if((client.config.ownerID === message.mentions.users.first().id) && message.mentions.users.size === 1){
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
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "icecream",
  category: "Miscellaneous",
  description: "Give someone an icecream...",
  usage: "icecream <@user>"
};
