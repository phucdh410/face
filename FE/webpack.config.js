const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const fs = require("fs");

const directoryPath = path.resolve("public");

const handleDir = () => new Promise((resolve, reject) => fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return reject(new Error(`Unable to scan directory: ${err}`));
  }

  return resolve(files);
}));

module.exports = async (env, agrv) => {
  const isDev = agrv.mode === "development";
  const isAnalyze = env && env.analyze;
  const dirs = await handleDir();
  const copyPluginPatterns = dirs
    .filter((dir) => dir !== "index.html")
    .map((dir) => ({
      from: dir,
      to: "",
      context: path.resolve("public"),
    }));

  const basePlugins = [
    new Dotenv(),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      // favicon: './public/favicon.ico',
      // manifest: "./public/manifest.json",
      minify: !isDev ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : null,
    }),

    new CopyPlugin({
      patterns: copyPluginPatterns,
    }),
  ];

  let prodPlugins = [
    ...basePlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "static/css/[name].[contenthash:6].css",
    }),
    new CompressionPlugin({
      test: /\.(css|js|html|svg)$/,
    }),
    new webpack.ProgressPlugin(),
  ];

  if (isAnalyze) {
    prodPlugins = [...prodPlugins, new BundleAnalyzerPlugin()];
  }

  return {
    entry: "./src/index.js",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-syntax-dynamic-import",
              ],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          use: ["ts-loader", "eslint-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { sourceMap: !!isDev },
            },
            {
              loader: "sass-loader",
              options: { sourceMap: !!isDev },
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: isDev ? "[path][name].[ext]" : "static/fonts/[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: isDev
                  ? "[path][name].[ext]"
                  : "static/media/[name].[contenthash:6].[ext]",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      alias: {
        "@": path.resolve("src"),
        "@@": path.resolve(),
        "@mui/styled-engine": "@mui/styled-engine-sc",
      },
    },
    output: {
      path: path.resolve("build"),
      publicPath: "/",
      filename: "static/js/main.[contenthash:6].js",
      environment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        dynamicImport: false,
        forOf: false,
        module: false,
      },
    },
    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    devtool: isDev ? "source-map" : false,
    devServer: {
      port: 3002,
      hot: true,
      historyApiFallback: true,
      open: true,
    },
    plugins: isDev ? basePlugins : prodPlugins,
    performance: {
      hints: false,
      // Khi có 1 file build vượt quá giới hạn này (tính bằng byte) thì sẽ bị warning trên terminal.
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    watchOptions: {
      aggregateTimeout: 200, // Add a delay before rebuilding once the first file changed
      ignored: "**/node_modules",
      poll: 1000, // Check for changes every second
    },
  };
};
