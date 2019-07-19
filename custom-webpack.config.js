const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MAPS_API_KEY: JSON.stringify(process.env.MAPS_API_KEY)
      }
    })
  ]
};
