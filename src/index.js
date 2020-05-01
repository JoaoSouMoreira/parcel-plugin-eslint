
module.exports = function (bundler) {
  bundler.addAssetType('vue', require.resolve('./VueESLintAsset.js'));
  bundler.addAssetType('js', require.resolve('./ESLintAsset.js'));
  bundler.addAssetType('jsx', require.resolve('./ESLintAsset.js'));
};
