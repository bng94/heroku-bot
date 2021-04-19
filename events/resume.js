const Discord = require('discord.js');
module.exports = {
    name: 'resume',
    execute(replayed) {
        console.log(`Whenever a WebSocket resumes, at ${new Date()}`+replayed);
    },
};