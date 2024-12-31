const path = require('path');

module.exports = {
  alias: {
    '@components': path.resolve(__dirname, './components'),
    '@custom-components': path.resolve(__dirname, './custom-components'),
    '@pages': path.resolve(__dirname, './pages'),
    '@modules': path.resolve(__dirname, './modules'),
    '@system': path.resolve(__dirname, './system'),
    '@demos': path.resolve(__dirname, './demos'),
    '@common': path.resolve(__dirname, './common'),
    '@data': path.resolve(__dirname, './data'),
    '@root': __dirname,
  }
}; 