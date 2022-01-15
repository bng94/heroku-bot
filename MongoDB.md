# MongoDB Configuration

## About
This is for configuration of my restart msg connected to MongoDB. Currently not used in my Heroku Discord Bot, as it requires an IP Address from Heroku. Below I will describe the set up to get a MongoDB onto your discord bot, with my previous setup now removed for future builds of this Heroku hosted bot. 

> The below setup is for mongoose v6.1.5
> 
> Please note, I will not be go into full details but mostly display my setup.

### Install mongoose package
`npm install mongoose@latest --save `


### Install modules-alias package
 `npm install module-alias --save`
 
 I will be using modules-alias package for custom path so please install and in your `package.json` file, create a new `_moduleAliases` object with:
   ```json
    "_moduleAliases": {
        "@root": ".",
        "@modules": "./modules",
        "@schemas": "./schemas"
    }
   ```
### Environment Variable MONGO_URI 
Create `MONGO_URI` environment variable in your `.env` file, that should contain your MongoDB connection string. As this strong **MUST** not shared as it will give other accesses to your DB and modify things of their choosing.

```javascript
MONGO_URI=Your_MongoDB_Link_Here
```

### Create `mongo.js` file next to your index.js file
```javascript
const mongoose = require('mongoose');
const mongoPath = process.env.MONGO_URI;

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return mongoose;
}
```
### Create `schemas directory folder and an restart-schema.js` file:
This folder should contain all your schemas for your MongoDB connections

```javascript
const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
};
const reqBoolean = {
    type: Boolean,
    required: true
};
const restartSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString,
    messageId: reqString,
    channelTypeDM: reqBoolean,
    restartCmd: reqBoolean,
});

module.exports = mongoose.model('restart-message', restartSchema, 'restart-message')
```

### Create `restartMsg.js` file in your modules folder:

```javascript        
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
* Loads the data from DB when bot starts up
* This way, we can update restart message 
* Update Message: if bot was restarted from a cmd or something else
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
```
### Create or Add to `reboot.js / restart.js` cmd file, add the following lines before you call `process.exit(1)`:
```javascript    
let channelID = message.author.id;
const channelTypeDM = message.channel.type === "DM" ? true : false;
if(!channelTypeDM){
    channelID = message.channel.id;
}
let messageID;
await message.channel.send("Restarting...").then(msg => messageID = msg.id);
await client.restartLogger(channelID, messageID, channelTypeDM);
```

### Update your `ready.js` file with this:
```javascript
const mongo = require('@root/mongo');
const restartMsg = require('@modules/restartMsg.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.log(`${client.user.tag}, ready to serve!`,"Ready!");
        /** REQUIRED FOR MongoDB CONNECTION
        * In order to ensure an mongoDB connection, 
        * We required to await for mongo
        * One connection throughout the files for all mongoDB activity
        */
        await mongo();
        restartMsg(client);

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
        //Reset the DB, so if bot suddenly restarts
        //We will get @startUpMsg in DM instead @afterRestartMsg message.
        client.restartLogger("", "", true, false);
    },
};
```

### There are plenty of guides out there for MongoDB, for general questions about setup feel free to ask, [New Issue](https://github.com/bng94/heroku-bot/issues/new).