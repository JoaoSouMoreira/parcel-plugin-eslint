# @joaosomoreira/parcel-plugin-eslint

## Using Plugin
To use this plugin, it just needs to be installed and listed as a dependency (or devDependency) in your package.json. Parcel will automatically pick up any plugins that are prefixed with `parcel-plugin-`

### NPM
```
npm i @joaosomoreira/parcel-plugin-eslint -D
```

### Yarn
```
yarn add @joaosomoreira/parcel-plugin-eslint -D
```

## Config
This plugin has a default configuration set as:
```json
{
  "root": true,
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
    }
  },
  "extends": [
    "eslint:recommended"
  ],
  "ignorePatterns": ["node_modules/"],
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true
  }
}
```

It will also pick up any eslint configuration files in your project and resolve them along with the default above.

## Issues
Feel free to open any issues for problems or suggestions you find. Even better if you have a PR for these, all PRs will be reviewed.
