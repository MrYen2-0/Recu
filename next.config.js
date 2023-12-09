/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
    env: {
        API_SERVER: process.env.API_SERVER,
    }
}

module.exports = nextConfig
