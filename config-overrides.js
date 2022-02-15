const {alias} = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@api': 'src/api',
    '@assets': 'src/assets',
    '@components': 'src/components',
    '@redux': 'src/redux',
    '@utils': 'src/utils',
    '@ui-kit': 'src/ui-kit',
    '@contexts': 'src/contexts'
  })(config);

  return config;
}