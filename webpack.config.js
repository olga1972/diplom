const path = require('path');
module.exports = {
    entry: './src/js/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build/js/')
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: [
              ['latest', { modules: false }],
            ],
          },
        },
      ],
    },
  };