// import webpack from 'webpack'

module.exports = function override(config, env) {
  // config.plugins = config.plugins || [];

  config.plugins = [
    new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery"
   })
  ]

  console.log(config);

  return config;
}
