const {alias} = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@api': 'src/api',
    '@assets': 'src/assets',
    '@routes': 'src/routes',
    '@components': 'src/components',
    '@redux': 'src/redux',
    '@utils': 'src/utils',
    '@ui-kit': 'src/ui-kit',
    '@features': 'src/features'
  })(config);

  return config;
}