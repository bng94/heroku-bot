//Rates whatever the user inputs
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  var number = Math.floor((Math.random()*100)+1);
  var values = {
    "me": "you",
    "you": "me"
  };

  var rated = args.join(' ');
  if(rated.includes(client.config.botID)){
    do{
      number = Math.floor((Math.random()*100)+1);
    }while(number < 75);
  }

  message.channel.send(`I'd rate ${rated} a **${number}/100**`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "rate",
  category: "Miscellaneous",
  description: "Rate something between 0 and 100.",
  usage: "rate"
};
