const { override } = require('customize-cra');

module.exports = override(
  (config, env) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "stream": require.resolve('stream-browserify'),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      os: require.resolve('os-browserify/browser')
    };
    return config;
  }
);
