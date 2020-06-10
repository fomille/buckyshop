module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 8015,
    proxy: {
      '/api2': {
        target: process.env.VUE_APP_ApiURL,
        // target: 'https://new-dev.buckydrop.com/api',
        // target: 'http://202.105.98.154:6030',
        changeOrigin: true,
        pathRewrite: {
          '^/api2': ''
        }
      }
    }
  },
  filenameHashing: false,
  assetsDir: process.env.VUE_APP_ASSETDIR,
  publicPath: '/',
  css: {
    sourceMap: false
  }
}
