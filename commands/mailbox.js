exports.run = function(client, message, args) {
	var rand = Math.floor(Math.random() * 3);
	if((message.mentions.users.size === 1 && (process.env.botID != message.mentions.users.first().id) )){
		message.channel.send('**'+`${message.author.username}`+'**: Hey I got a surprise for you, '+`${message.mentions.users.first().username}`
		+'!\n**'+`${message.mentions.users.first().username}`+'**: Really...? \n**'
		+`${message.author.username}`+'**: Yeah, a letter\n**'+`${message.mentions.users.first().username}`+'**: A letter? I saw this coming!\n**'
		+`${message.author.username}`+'**: Wait... What!?!\n**'+`${message.mentions.users.first().username}`+'**: Look behind you.\n*A Mailbox appears*\n**'
		+`${message.author.username}`+'**: Argh! \n**'+`${message.mentions.users.first().username}`+'**: Go get them!\n'
		+'*Mailbox bites '+`${message.author.username}`+'*');
	}else if(message.mentions.users.size === 1){
		if(rand === 0){
			message.channel.send('**'+`${message.author.username}`+'**: I have some ice cream cake for you, '+`${message.mentions.users.first().username}`
		+'\n**'+`${message.mentions.users.first().username}`+'**: Really...?\n**'
		+`${message.author.username}`+'**: Yeah\n**'+`${message.mentions.users.first().username}`+'**:Yay, thanks!\n**'
		+`${message.author.username}`+'**: Also I got you a mailbox\n**'+`${message.mentions.users.first().username}`+'**:A mailbox...?\n**'
		+`${message.author.username}`+'**: Mailbox, I choose you!\n**'+`${message.mentions.users.first().username}`+'**:Argh!\n**'+`${message.author.username}`+'**: Mailbox use Bite!\n'
		+'*Mailbox bites '+`${message.mentions.users.first().username}`+'*\n');
		}else if(rand === 1){
			message.channel.send('**'+`${message.author.username}`+'**: Hey, '+`${message.mentions.users.first().username}`+' did you get the gift I send to you?'
		+'\n**'+`${message.mentions.users.first().username}`+'**: What gift?\n**'
		+`${message.author.username}`+'**: The gift I sent to you through that shipping company last week.\n**'+`${message.mentions.users.first().username}`+'**:Oh, that was from you? It\'s at the pick-up. Let me go get it.\n**'
		+`${message.author.username}`+'**: Oh okay, be careful on your way there!\n*'+`${message.mentions.users.first().username}`+' got into their car and drove there.*\n'+' **'+`${message.mentions.users.first().username}`+'** The box is shaking...?'
		+'\n*Mailbox jumps out of the box and startle '+`${message.mentions.users.first().username}`+'*\n**'
		+`${message.mentions.users.first().username}`+'**:Argh!\n*'+`${message.mentions.users.first().username}`+' rushed into their car*\n**'
		+`${message.author.username}`+'**: Hmm... I think '+`${message.mentions.users.first().username}`+' should be enjoying my gift right now! Haha!\n'
		+'*Mailbox attacks '+`${message.mentions.users.first().username}`+'\`s car and chases after their car*');
		}else if(rand === 3){
			message.channel.send('**'+`${message.author.username}`+'**: Hey I got a surprise for you, '+`${message.mentions.users.first().username}`
		+'!\n**'+`${message.mentions.users.first().username}`+'**: Really...?\n**'
		+`${message.author.username}`+'**: Yeah, a letter\n**'+`${message.mentions.users.first().username}`+'**: A letter? t-that\'s all?\n**'
		+`${message.author.username}`+'**: That\'s all...\n*'+`${message.mentions.users.first().username}`+' takes the letter*'+'\n*A wild Mailbox suddenly appears*\n**'
		+`${message.author.username}`+'**: I don\'t got the letter! \n**'+`${message.mentions.users.first().username}`+'**:Argh!\n'
		+'*Mailbox bites '+`${message.mentions.users.first().username}`+'*');
		}
	}else{
		message.channel.send('```~mailbox <user>\n\nSend a mailbox to the user!\n\nExample: mailbox @User```');
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "mailbox",
  description: "Send a mailbox to someone /sarcasm",
  usage: "mailbox"
};