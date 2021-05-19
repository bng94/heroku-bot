const path = require('path');
const fs = require('fs');

module.exports = (client) => {
    const loadEvents = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        let counter = 0;
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                loadEvents(path.join(dir, file))
            } else {
                const event = require(path.join(__dirname, dir, file))
                const eventName = path.basename(file, '.js');
                if(!eventName) continue;
                try{
                    if (event.once) {
                        client.once(eventName, async (...args) => await event.execute(...args, client));
                    } else {
                        client.on(eventName, async (...args) => await event.execute(...args, client));
                    }
                    counter++;
                } catch(e){
                    console.log(`Unable to load event ${file}: ${e}`);
                }
                    
            }
        }
         client.log(`Successfully loaded ${counter} events.`, 'Event');
    }

    loadEvents('../events')
};