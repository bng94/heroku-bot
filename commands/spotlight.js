exports.run = function(message, cw, currentSpotlight, nextSpotlight, date, aDate, num, addedTime, timetillnextsl) {
  console.log(`\nCurrent Date: `+date+`\nDate: `+aDate+`\nNum is:`+num);
  console.log(`Today date and a Date difference: `+(aDate-date));
  console.log(`timetillnextsl until next...`);
  console.log(addedTime);
    
  if(cw != -1 && cw != "NOW"){
    message.channel.send({embed: {
        fields: [{
          name: 'Current Spotight:',
          value: `${currentSpotlight}`
        },
        {
          name: 'Next Spotight in '+`${timetillnextsl}`+' days is:',
          value: `${nextSpotlight}`
        },
        {
          name: 'Castle Wars Spotlight:',
          value: `${cw} days`
        }]
      }
    });
  }else if(cw === "NOW"){
    message.channel.send({embed: {
        fields: [{
          name: 'Current Spotight:',
          value: `${currentSpotlight}`
        },
        {
          name: 'Next Spotight in '+`${timetillnextsl}`+' days is:',
          value: `${nextSpotlight}`
        },
        {
          name: 'Castle Wars Spotlight:',
          value: '**NOW!**'
        }]
      }
    });
  }
  console.log('Current Spotlight is: '+`${currentSpotlight}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Spotlight', 'sl'],
  permLevel: 0
};

exports.help = {
  name: "spotlight",
  description: "State the current minigame spotlight in RuneScape 3 and as well as when the next Castle War Spotlight is",
  usage: "~spotlight"
};