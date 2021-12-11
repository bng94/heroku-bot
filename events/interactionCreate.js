/**
 * This file register/create our slash commands reply
 */

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;

        const cmd = client.commands.get(commandName);

        /** 
         * We register our slash cmd replies woth a small code
         * in our slash cmd file we create an async interactionReply()
         * This way the name interactionReply reflect the actual method
         * Also creates our code reusable and leave the functionality in the cmd files as it should be.
        */
        cmd.interactionReply(interaction, client);
        // !passing client is option, useful if you are using client in your slash cmds.!
    },
};