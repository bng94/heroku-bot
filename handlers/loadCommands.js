const path = require('path');
const fs = require('fs');

module.exports = (client) => {
    const loadCommands = (dir) => {
        const commandFolders = fs.readdirSync(path.join(__dirname, dir));
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(path.join(__dirname, dir, folder)).filter(file => file.endsWith('.js')); 
            client.log(`Loading a total of ${commandFiles.length} commands from ${folder} folder.`, 'CMD');
            commandFiles.forEach(file =>{
                result = client.loadCommand(file, folder);
                if(result) console.log(result);
            })
        }
    }
    loadCommands('../commands')
};