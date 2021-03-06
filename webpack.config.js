"use strict";

const environment = (process.env.NODE_ENV || "development").trim();
const merge = require("webpack-merge");

if (environment === "development") {
  module.exports = require("./config/webpack.config.dev");
} else {
  let prodConfig = require("./config/webpack.config.prod");
  module.exports = merge(prodConfig, require("./config/planetposen.config.js"));
}
