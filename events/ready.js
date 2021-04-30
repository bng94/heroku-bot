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
		await restartMsg.loadMsg(client);

		const startUpMsg = "Bot just started up!";
		const afterRestartMsg = "Bot is now back online!";

		if(client.restartChanTypeDM != false){
			const msg = client.restartCmdUsage ? afterRestartMsg : startUpMsg;
			client.sendOwnerMsg(msg);
		} else {
			const channel = await client.channels.cache.get(client.restartChanID)
			const fetchedMsg = await channel.messages.fetch(client.restartMsgID);
			fetchedMsg.edit(afterRestartMsg);
		}
		//Reset the DB, so if bot suddenly restarts, we will get the @startUpMsg in DM instead @afterRestartMsg message.
		client.restartLogger("", "", true, false);
	},
};