module.exports = async client => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  await client.wait(1000);

  // Both `wait` and `client.log` are in `./modules/functions`.
	console.log(`You have been disconnected at ${new Date()}`);
};
