module.exports = async (client, e) => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  await client.wait(1000);
  console.log(`Error caught at ${new Date()}`);
  console.log(e);
};
