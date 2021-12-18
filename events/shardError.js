module.exports = {
	name: 'shardError',
	async execute(error) {
        console.error('A websocket connection encountered an error:', error);
	},
};