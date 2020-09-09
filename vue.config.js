const path = require('path')
const name = require('./package.json')

// vue cli 配置
module.exports={
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  //lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false, // 当保存代码的时候对代码检查，可以使用，如果配置了该属性且安装了@vue/cli-plugin-eslint插件才会生效，再这关闭
  // 项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  // 也就是说map文件相当于是查看源码的一个东西。如果不需要定位问题，并且不想被看到源码，就把productionSourceMap置为false，既可以减少包大小，也可以加密源码。
  productionSourceMap: false,
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': path.join(__dirname, 'src'),
  //     }
  //   }
  // },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
        // 别名使用， vuecli 已经将@默认指向了src
        // ①
        // Utilities: path.resolve(__dirname, 'src/utilities/'),
        // Templates: path.resolve(__dirname, 'src/templates/'),
        // 使用import stickTop from 'components/stickTop'
        // import getArticle from 'api/article'
  //     }
  //   }
  // }
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    //请求转换，xxx-api/login => mock/login， 使用了mock做测试
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:8081`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
  }

}