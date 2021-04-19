module.exports = {
    name: 'error',
    execute(e) {
        console.log(`============== ERROR ==============`);
        console.log(`Error caught at ${new Date()}`);
        console.log(e);
        console.log(`============ END ERROR ============`);
    },
};