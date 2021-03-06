require('dotenv').config()
const withCSS = require('@zeit/next-css')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = withCSS({
  webpack: (config) => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ]

    config.node = {
      console: false,
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    }

    return config
  },
})
