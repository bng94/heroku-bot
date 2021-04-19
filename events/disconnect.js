module.exports = {
    name: 'disconnect',
    execute(client) {
        console.log(`You have been disconnected at ${new Date()}`);
        client.destroy().then(client.login.bind(client));
    },
};