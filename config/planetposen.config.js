"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const helpers = require("./helpers");

const PlanetposenConfig = {
  entry: {
    planetposen: ["@babel/polyfill", helpers.root("frontend", "main")]
  },
  optimization: {
    minimizer: [
      new HtmlWebpackPlugin({
        chunks: ["planetposen"],
        filename: "../index.html",
        template: "./frontend/index.html",
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: false,
          preserveLineBreaks: true,
          removeAttributeQuotes: true
        }
      })
    ]
  }
};

module.exports = PlanetposenConfig;
