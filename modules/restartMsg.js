const restartSchema = require('@schemas/restart-schema')

module.exports = (client) => {

  //Create or Update mongoDB when bot was restarted
  client.restartLogger = async(channelId, messageId, channelTypeDM, restartCmd = true) => {
    await restartSchema.findOneAndUpdate(
      {
        _id: client.user.id,
      },
      {
        _id: client.user.id,
        channelId,
        messageId,
        channelTypeDM,
        restartCmd,
      },
      {
        upsert: true,
      }
    )
  }
  
  /**
   * Loads the data from DB, so we can update restart message if bot was restarted from cmd usage.
   */
  const loadMsg = async (client) => {
    const result = await restartSchema.findOne({ _id: client.user.id })
    client.restartChanID = result.channelId;
    client.restartMsgID = result.messageId;
    client.restartChanTypeDM = result.channelTypeDM;
    client.restartCmdUsage = result.restartCmd;
    console.log(`Cmd used?: ${client.restartCmdUsage} DM?: ${client.restartChanTypeDM}`);
  };
  loadMsg(client);
};
