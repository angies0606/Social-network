const {alias} = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@api': 'src/api',
    '@assets': 'src/assets',
    '@components': 'src/components',
    '@redux': 'src/redux',
    '@utils': 'src/utils'
  })(config);

  return config;
}