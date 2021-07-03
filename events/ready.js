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

		if(client.restartChanTypeDM != false){
			const msg = client.restartCmdUsage ? afterRestartMsg : startUpMsg;
			//The following code should be used if you aren't using free version of heroku and hosting on your PC or another server/device.
			//client.sendOwnerMsg(msg);
			//Since im using heroku for free, this bot restarts frequently on a daily basis, since my bot is running 24/7 and these DM are quite repetitive, so instead will console.log it using our client.log() function from the function.js file.
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