const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*"],
  },
  module: {
    rules: [{
        test: /\.(scss|css)$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },],
  },
  resolve: {
    extensions: [".js", ".html"],
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [{from: "./src/index.html", to: 'index.html'},] 
    })
  ],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./build"),
    clean: true,
  },
};