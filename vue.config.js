module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 8015,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_DevServer,
        // target: 'https://new-dev.buckydrop.com/api',
        // target: 'http://202.105.98.154:6030',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  filenameHashing: false,
  /**
   * 打包静态文件存放目录
   */
  assetsDir: process.env.VUE_APP_ASSETDIR,
  /**
   * 链接资源路径
   */
  publicPath: process.env.VUE_APP_PublicDir,
  css: {
    sourceMap: false
  }
}
