
const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require("craco-antd");
const CracoAlias = require("craco-alias");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  reactScriptsVersion: "react-scripts",
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          "src/theme/customize.theme.less"
        )
      },
    },
    { plugin: CracoLessPlugin },
    {
      plugin: CracoAlias,
      options: {
        // see in examples section
        baseUrl: './src',
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      }
    },
    { plugin: new OpenBrowserPlugin({ url: 'http://localhost:3000' }) }
  ],
  webpack: {
    configure: webpackConfig => {
      webpackConfig.optimization.minimizer = [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            compress: {
              drop_console: true,
            }
          }
        })
      ]

      return webpackConfig;
    },
    plugins: [
        // new ConfigWebpackPlugin(),
        // ...whenDev(() => [new CircularDependencyPlugin()], []),
        // ...whenProd(() => [new WebpackClearConsole()], [])
    ]
  }
  // eslint: {
  //   mode: ESLINT_MODES.file
  // },
  // style: {
  //     modules: {
  //         localIdentName: ""
  //     },
  //     css: {
  //         loaderOptions: { /* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */ },
  //         loaderOptions: (cssLoaderOptions, { env, paths }) => { return cssLoaderOptions; }
  //     },
  //     sass: {
  //         loaderOptions: { /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */ },
  //         loaderOptions: (sassLoaderOptions, { env, paths }) => { return sassLoaderOptions; }
  //     },
  //     postcss: {
  //         mode: "extends" /* (default value) */ || "file",
  //         plugins: [],
  //         env: {
  //             autoprefixer: { /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */ },
  //             stage: 3, /* Any valid stages: https://cssdb.org/#staging-process. */
  //             features: { /* Any CSS features: https://preset-env.cssdb.org/features. */ }
  //         },
  //         loaderOptions: { /* Any postcss-loader configuration options: https://github.com/postcss/postcss-loader. */ },
  //         loaderOptions: (postcssLoaderOptions, { env, paths }) => { return postcssLoaderOptions; }
  //     }
  // },
  // eslint: {
  //     enable: true /* (default value) */,
  //     mode: "extends" /* (default value) */ || "file",
  //     configure: { /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */ },
  //     configure: (eslintConfig, { env, paths }) => { return eslintConfig; },
  //     loaderOptions: { /* Any eslint-loader configuration options: https://github.com/webpack-contrib/eslint-loader. */ },
  //     loaderOptions: (eslintOptions, { env, paths }) => { return eslintOptions; }
  // },
  // babel: {
  //     presets: [],
  //     plugins: [],
  //     loaderOptions: { /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */ },
  //     loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }
  // },
  // typescript: {
  //     enableTypeChecking: true /* (default value)  */
  // }
}