const path = require('path');
const fs = require('fs');

module.exports = (client) => {
    const loadModules = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))

        /**
         * files to not load when using this handler
         * functions and time should be first as it is used for dailyActivity.js, spotlight is ran every time when daily() from dailyActivity is called. 
        */
        const filesToExclude = ['function.js', 'spotlight.js', 'restartMsg.js', 'time.js'];

        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                loadModules(path.join(dir, file))
            } else if (filesToExclude.includes(file) === false) {
                const feature = require(path.join(__dirname, dir, file))
                try {
                    feature(client)
                } catch(e){
                    client.log(`Unable to Load feature: ${file}:\n${e}`, true)
                }
            }
        }
    }
    loadModules('../modules')
};