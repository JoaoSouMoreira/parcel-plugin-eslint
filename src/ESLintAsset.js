const fs = require('fs');
const JSAsset = require('parcel-bundler/src/assets/JSAsset');
const { CLIEngine } = require('eslint');

class ESLintAsset extends JSAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = 'js';
  }

  parseMessage(message) {
    let severity = '';
    if (message.fatal) {
      severity = 'error';
    } else {
      severity = message.severity === 2 ? 'error' : 'warning';
    }
    return `\n\n${message.line}:${message.column} ${severity} ${message.message} ${message.ruleId}`;
  }

  async load() {
    const code = await super.load();

    const defaultConfig = JSON.parse(fs.readFileSync(`${__dirname}/../.eslintrc`));
    const customConfig = await this.getConfig(['.eslintrc', '.eslintrc.json', '.eslintrc.js', 'package.json']);
    const config = Object.assign(defaultConfig, customConfig.eslintConfig || customConfig);
    const cli = new CLIEngine(config);

    const report =  cli.executeOnText(code, this.name);
    const fatalErrors = [];

    if (report.results.length > 0) {
      report.results.forEach(result => (
        result.messages.forEach((message) => {
          if (message.fatal || message.severity === 2) {
            fatalErrors.push(message);
            return;
          }
          console.warn(this.parseMessage(message));
        })
      ))
    }

    if (fatalErrors.length > 0) {
      const errorList = fatalErrors.reduce((acc, error) => `${acc}${this.parseMessage(error)}`, '');
      throw new Error(`\nFailed to compile\n${errorList}`)
    }
    return code;
  }
}

module.exports = ESLintAsset;
