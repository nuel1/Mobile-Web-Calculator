const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
  navigateFallback: "/index.html",
  stripPrefix: "dist",
  root: "dist/",
  plugin: [
    new SWPrecacheWebpackPlugin({
      cacheId: "",
      filename: "service-worker.js",
      staticFileGlobs: ["dist/index.html", "dist/**.js", "dist/**.css"],
      stripPrefix: "dist/assets/",
      mergeStaticsConfig: true,
    }),
  ],
};
