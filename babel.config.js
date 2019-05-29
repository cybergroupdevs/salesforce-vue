module.exports = {
  presets: [
    [
      '@vue/app',
      {
        polyfills: ['es6.promise', 'es6.symbol'],
      },
    ],
    '@babel/preset-env',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
}
