const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: isProduction ? '/github/' : '/',
  parallel: false,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
  ],
  lintOnSave:false,
  configureWebpack: config => {
    if (isProduction) {
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 102400,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `npm.${packageName.replace('@', '')}`;
              },
            },
          },
        },
      };
    }
  },
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true,
              }),
            ],
          }),
          compilerOptions: {
            module: 'es2015',
          },
        });
        return options;
      });
  },
  devServer: {
    host: '0.0.0.0',
  },
  productionSourceMap: false,
};
