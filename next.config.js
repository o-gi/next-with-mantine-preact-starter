/** @type {import('next').NextConfig} */
const withPreact = require("next-plugin-preact");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withPreact({})], {
  reactStrictMode: true,
});
