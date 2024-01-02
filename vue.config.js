const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: './packages/index.js',
    output: {
      filename: 'js/[name].js',
      libraryTarget: 'commonjs',
      libraryExport: 'default'
    },
  },
  css: {
    extract: {
      filename: 'css/style.css'
    }
  },
  devServer: {
    port: 3000
  },
})
