/**
 * Registering slash commands file
 * Code work same as v12 but a lot cleanier 
 * Its through the API and not a work around anymore.
 */
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
        const guildId = [process.env.serverID, ''];

        /*
         * we aren't using a loop for the guildId array, 
         * since only got 1 serverId that I am using
        */
        const guild = client.guilds.cache.get(guildId);
        let commands;
        if (guild) {
            commands = guild.commands
        } else {
            commands = client.application?.commands
        }

        const cmds = client.commands;

        /** 
         * we filter out the commands for the other slash cmd we set
         * make sure to set slash = true in your command file.
         * see ../commands/miscellaneous/hugs.js for sample
        */
        const slashCmds = cmds.filter((cmd) => cmd.slash === true);

        //creates an array of the slashCmds Object
        let cmdArray = [...slashCmds.values()];

        /** 
         * *Looping through all slash cmds we've set and create them.
         * ! Make sure to comment this loop out once you have created them 
         * ! We should only create the slash cmds we want once and only once 
         * ! It is already saved as slash upon creation no need for more  
         * ! Only changes we need to do is the cmd file for different responses
        */
        for (const cmd of cmdArray) { 
            client.log(`Loading Slash CMD: ${cmd.name}`, 'SLASH CMD');
            let tempObj = {
                name: cmd.name,
                description: cmd.description
            }

            //Ensure we run into no errors if we have no slash options.
            if(cmd.slashOptions){
                tempObj = {...tempObj, options: cmd.slashOptions}
            }

            commands?.create(tempObj);
        } 
	},
};