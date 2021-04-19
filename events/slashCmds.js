const Discord = require('discord.js');
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
        const guildId = [process.env.serverID, ''];
        const getApp = (guildId) => {
            const app = client.api.applications(client.user.id)
            if (guildId) {
                app.guilds(guildId)
            }
            return app
        }
        
        for (const id of guildId) {
            const commands = await getApp(id).commands.get()
            //print out how much slash cmds were loaded.
            //you can find the slash command's ID from here
            console.log(commands)
        };
        
        //You can delete slash command once you insert the slash command id
        // if its not within the guild, set replace the serverID with empty string
        // try{
        // 	await getApp(process.env.serverID).commands('INSERT SLASH CMD ID').delete()
        // } catch(e){
        // 	client.log(e, true)
        // }
                
        //creates the slash command responses
        client.ws.on('INTERACTION_CREATE', async (interaction) => {
            console.log(`interaction.data ======`)
            console.log(interaction.data)
            const { name, options } = interaction.data
        
            const command = name.toLowerCase()
        
            const args = {}
        
            //can use to console.log the options for
            //console.log(options)
        
            if (options) {
                for (const option of options) {
                    const { name, options: innerOptions, value } = option
                    console.log(`in options ======`)
                    console.log(innerOptions)
                    if(innerOptions){
                        for (const innerOption of innerOptions) {
                            console.log(innerOptions.type)
                            const { name, value } = innerOption
                            args[name] = value
                        }
                    } else {
                        args[name] = value
                    }
                }
            }
        
            //can use to console.log the args for
            //console.log(args)
            const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        
            if (command === cmd.name) 
                reply(interaction, cmd.execute(undefined, args , client, interaction));
        })
        
        //slash commands replies
        const reply = async (interaction, response) => {
            response = await response;
            let data = {
                content: response,
            }	
            // log slash response	
            // console.log(` ======== response ========`)
            // console.log(JSON.stringify(response));
        
            // Check for embeds
            if (typeof response === 'object') {
                data = await createAPIMessage(interaction, response)
            }		
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data,
                },
            })
        }
        
        //Magic.
        const createAPIMessage = async (interaction, content) => {
            const { data, files } = await Discord.APIMessage.create(
                client.channels.resolve(interaction.channel_id),
            content)
            .resolveData()
            .resolveFiles()
        
            return { ...data, files }
        }

	},
};