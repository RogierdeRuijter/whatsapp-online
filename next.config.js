/** @type {import('next').NextConfig} */
const { parsed } = require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_USERNAME: "RogierDeRuijter",
    ...parsed,
  },
};

module.exports = nextConfig;
