const Discord = require('discord.js');
module.exports = {
    name: 'guildMemberAdd',
    execute(member, client) {
        const guild = member.guild;
        console.log(`Someone joined ${guild.name} server!`);

        let memberLog = guild.channels.cache.find(ch => ch.name === "welcome");
        if(!memberLog) return;

        try{
            setTimeout(function(){
              const embed = new Discord.MessageEmbed()
                .setColor(0x34f937)
                .setAuthor(`${member.user.tag} (${member.user.id})`, `${member.user.displayAvatarURL}`)
                .setTimestamp()
                .addField("Account created At", `${client.users.cache.find(x => x.id === member.user.id).createdAt.toString()}`)
                .setFooter(`User Joined`);
                memberLog.send({embed});
            },500);
          }catch(e){
            client.log(e);
            client.sendOwnerMsg(`Member Log message failed to send.`);
            setTimeout(function(){memberLog.send(`${member.user.tag} (${member.user.id})\n\n Account created At: ${client.users.cache.find(x => x.id === member.user.id).createdAt.toString()} \n\n User Joined | ${client.timeNow()}`);},500);
          }
    },
};