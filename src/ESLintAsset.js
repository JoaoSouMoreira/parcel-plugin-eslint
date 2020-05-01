const fs = require('fs');
const JSAsset = require('parcel-bundler/src/assets/JSAsset');
const { CLIEngine } = require('eslint');
const { buildMessage, grabErrors } = require('./utils');

class ESLintAsset extends JSAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = 'js';
  }

  async load() {
    const code = await super.load();

    const defaultConfig = JSON.parse(fs.readFileSync(`${__dirname}/../.eslintrc`));
    const customConfig = await this.getConfig(['.eslintrc', '.eslintrc.json', '.eslintrc.js', 'package.json']);
    const config = Object.assign(defaultConfig, customConfig.eslintConfig || customConfig);
    const cli = new CLIEngine(config);

    const report =  cli.executeOnText(code, this.name);

    const { fatalErrors, warnings } = grabErrors(report.results);

    warnings.forEach(warning => console.warn(buildMessage(warning)));

    if (fatalErrors.length > 0) {
      const errorList = fatalErrors.reduce((acc, error) => `${acc}${this.parseMessage(error)}`, '');
      throw new Error(`\nFailed to compile\n${errorList}`)
    }
    return code;
  }
}

module.exports = ESLintAsset;
