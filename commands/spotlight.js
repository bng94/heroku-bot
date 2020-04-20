/*Spotlight commands, tell the current and next spotlight, as well as next cw spotlight. The following cw spotlight is mentioned when command is just cw or cwsl*/
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
  console.log(`timetillnextsl until next spotlight is `+client.timetillnextsl);
  console.log(`Current Spotlight is: ${client.currentSpotlight}`);
  console.log(`Next Spotlight is: ${client.nextSpotlight}`);
  let cw = client.cw;

	var monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  var cwSlDate = new Date();
  var cwSlEndDate = new Date();
  if(cw != "NOW"){
    cwSlDate.setDate(cwSlDate.getDate() + cw);
    cw=cw+` days`;
  }else{
    cwSlDate.setDate(cwSlDate.getDate() - (2-client.timetillnextsl));
  }
  cwSlEndDate.setDate(cwSlDate.getDate() + 2);

  var afterCwSlDate = new Date();
  var afterCwSlEndDate = new Date();
  afterCwSlDate.setDate(cwSlEndDate.getDate() + client.followingCW);
  afterCwSlEndDate.setDate(afterCwSlDate.getDate() + 2);

  var embed = new Discord.RichEmbed()
    .addField(`Current Spotight:`,client.currentSpotlight)
    .addField(`Next Spotight in ${client.timetillnextsl} days is:`,client.nextSpotlight)
    .addField(`Castle Wars Spotlight:`,cw);

  //something is wrong with slFunction.js line 64 + line 70, followingCW = -1...
  let replacement = client.followingCW+2+client.cw;

  if(args.includes("cw") || args.includes("cwsl")){
    embed = new Discord.RichEmbed()
      .addField(`Castle Wars Spotlight in ${cw}`,`${monthShort[cwSlDate.getMonth()]}-${cwSlDate.getDate()}-${cwSlDate.getFullYear()} to ${monthShort[cwSlEndDate.getMonth()]}-${cwSlEndDate.getDate()}-${cwSlEndDate.getFullYear()}`)
      .addField(`The following Castle Wars Spotlight is in ${replacement} days`,`${monthShort[afterCwSlDate.getMonth()]}-${afterCwSlDate.getDate()}-${afterCwSlDate.getFullYear()} to ${monthShort[afterCwSlDate.getMonth()]}-${afterCwSlEndDate.getDate()}-${afterCwSlEndDate.getFullYear()}`);
  }

  try{
    let mention = message.mentions.channels.first() ? message.mentions.channels.first() :  message.mentions.users.first();
    if(level >= 5 && mention){
      return mention.send({embed});
    }
    message.channel.send({embed});
  }catch(e){
    console.log(e);
    message.channel.send("Embed has failed...\n"+ytlink);
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Spotlight', 'sl','cw','cwsl'],
  permLevel: "User"
};

exports.help = {
  name: "spotlight",
  category: "Miscellaneous",
  description: "State what is the current and when the next Castle Wars-minigame spotlight is for RuneScape 3",
  usage: "spotlight"
};
