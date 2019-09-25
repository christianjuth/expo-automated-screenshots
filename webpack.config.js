const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  // assign argv properties to an empty object. currently argv is undefined, causing the issue.
  const config = await createExpoWebpackConfigAsync(env, Object.assign({}, argv));

  // customize the configuration to your needs

  return config;
};
