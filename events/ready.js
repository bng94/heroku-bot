const mongo = require('@root/mongo');
const restartMsg = require('@modules/restartMsg.js')

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setActivity("Bots");  
		client.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "Ready!");
		
		/** REQUIRED
		 * In order to ensure an mongoDB connection, we required to await for mongo
		 * This will let you use one connection throughout the files for all mongoDB connection activity that you need to.
		*/
		await mongo();
		restartMsg(client);
		//We need to await here as we are use the variables in this file from the following module for the restart messages.

		const startUpMsg = "Bot just started up!";
		const afterRestartMsg = "Bot is now back online!";

		if(client.restartChanTypeDM !== false){
			const msg = client.restartCmdUsage ? afterRestartMsg : startUpMsg;

			//Avoid using this incase your bot hosting services is unstable
			//OR bot restarts frequently for whatever reasons.
			//Commenting it out ensure you don't get spammed via DM.
			// This is however useful it you want to track when and why your bot restarts.
			client.sendOwnerMsg(msg);
			client.log(msg, `LOGIN MSG`, 'READY');
		} else {
			const channel = await client.channels.cache.get(client.restartChanID)
			const fetchedMsg = await channel.messages.fetch(client.restartMsgID);
			fetchedMsg.edit(afterRestartMsg);
		}
		//Reset the DB, so if bot suddenly restarts, we will get the @startUpMsg in DM instead @afterRestartMsg message.
		client.restartLogger("", "", true, false);
	},
};