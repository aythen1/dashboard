const path = require('path');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  webpack: {
    // configure: (webpackConfig) => {
      configure: (webpackConfig, { env, paths }) => {
      if (!webpackConfig.ignoreWarnings) {
        webpackConfig.ignoreWarnings = [];
      }

      // webpackConfig.ignoreWarnings.push({ module: /css/ });

      webpackConfig.resolve.alias['@components'] = path.resolve(__dirname, 'src/views/app/components/shared/index.js');
      webpackConfig.resolve.alias['@addon'] = path.resolve(__dirname, 'src/views/app/pages/Addon');
      webpackConfig.resolve.alias['@'] = path.resolve(__dirname, 'src');

      // Add NodePolyfillPlugin to the webpack configuration
      // webpackConfig.plugins = [
      //   ...(webpackConfig.plugins || []),
      //   new NodePolyfillPlugin(),
      // ];


      // Agregar polyfills para los módulos http, net, dns y dgram
       webpackConfig.resolve.fallback = {
        // child_process: false,
        // dgram: require.resolve("dgram-browserify"),
        // "assert": require.resolve("assert/"),
        // "http": require.resolve("stream-http"),
        // "https": require.resolve("https-browserify"),
        // "zlib": require.resolve("browserify-zlib"),
        // "os": require.resolve("os-browserify/browser")
      };


      // Excluir el módulo native-dns-cache del proceso de compilación
      // webpackConfig.externals = {
      // };
      
      // webpackConfig.externals = {
      //   'native-dns-cache': 'native-dns-cache',
      // };


      return webpackConfig;
    },
  },
  style: {
    modules: {
      localIdentName: '[local]_[hash:base64:5]',
    },
  },
};



// module.exports = {
//   plugins: [{
//     // plugin: new NodePolyfillPlugin()
//   },
//     // {
//     //   plugin: require('craco-plugin-scoped-css'),
//     // },
//     {
//       plugin: require("craco-alias"),
//       options: {
//         source: "options",
//         // baseUrl: "./",
//         aliases: {
//           "@components": "src/views/app/components/shared/index.js",
//           "@addon": "src/views/app/pages/Addon",
//           "@": "src"
//         }
//       }
//     }
//   ],
//   webpack: {
//     configure: {
//       resolve: {
//         fallback: {
//           "fs": false,
//           "tls": false,
//           "net": false,
//           "path": false,
//           "zlib": false,
//           "http": false,
//           "https": false,
//           "stream": false,
//           "crypto": false,
//           "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
//         } 
//       },
//     },
//     configure: {
//       // output: {
//       //   publicPath: 'myAppUrl/'
//       // }
//     }
//   }
// }