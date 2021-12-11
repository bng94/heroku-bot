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

        //we loop through all slash cmds we've set and create them.
        for(let cmd in slashCmds){
            commands?.create({
                name: cmd.name,
                description: cmd.description,
                options: cmd.slashOptions ? cmd.slashCmds : '',
            })
        }
	},
};