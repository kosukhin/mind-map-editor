const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: (tag) => tag.includes('-'),
        };
        return options;
      });

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
