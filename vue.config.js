const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
  },
  chainWebpack: (config) => {
    config.plugins.delete('pwa');
    config.plugins.delete('workbox');
    config
      .plugin('html')
      .tap((args) => {
        args[0].environment = process.env.NODE_ENV;
        return args;
      });
  },
});
