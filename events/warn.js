module.exports = {
    name: 'warn',
    execute(e) {
        console.log(`============== WARN ==============`);
        console.log(`Warn: ${new Date()}`);
        console.log(e);
        console.log(`============ END WARN ============`);
    },
};