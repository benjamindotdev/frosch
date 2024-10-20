const path = require("path");

module.exports = {
  entry: "./frontend/src/script.js", // Entry point of your application
  output: {
    filename: "bundle.js", // Output bundle file
    path: path.resolve(__dirname, "frontend/dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  mode: "development", // Change to 'production' for production builds
};
