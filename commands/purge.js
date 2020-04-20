//Purge is a cmd that purge x messages that are sent. Need to include the own ~purge message as a +1. Lazy to add in message.delete()
// const Discord = require('discord.js');
// const {caseNumber} = require('../modules/caseNumber.js');
exports.run = async (client, message, args, level) => {
    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);

    if (!amount) return message.reply('You must specify an amount to delete!').then((message) => { message.delete(2000) });
    if (!amount && !user) return message.reply('You must specify a user and amount, or just an amount!').then((message) => { message.delete(2000) });
    if (amount >= 100) return message.reply('You can\'t purge more than 100 messages at a time, please input a number between 1-99').then((message) => { message.delete(2000) });

    message.channel.fetchMessages({limit: 100}).then((messages) => {
        if (user) {
            const filterBy = user ? user.id : client.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        }
        message.channel.bulkDelete(user ? messages : amount+1).catch(error => console.error(error.stack));
        message.channel.send(`Purged **${amount}** ${amount === 1 ? 'message.' : 'messages.'}`).then(async (msg) => { await msg.delete(2000); });
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["p"],
  permLevel: "Administrator"
};

exports.help = {
  name: "purge",
  category: "Admin",
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};
