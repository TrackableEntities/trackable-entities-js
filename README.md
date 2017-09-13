# TypeScript Library Starter Lite

Stripped down version of TypeScript Library Starter: <https://github.com/alexjoverm/typescript-library-starter>

[![Build Status](https://travis-ci.org/tonysneed/typescript-library-starter-lite.svg)](https://travis-ci.org/tonysneed/typescript-library-starter-lite)

### Differences

All the goodness of TypeScript Library Starter, but without:
  - Automatic code formatting with [Prettier](https://github.com/prettier/prettier)
  - Conventional commits with [Commitizen](https://github.com/commitizen/cz-cli)
  - Automatic releases with [Semantic Release](https://github.com/semantic-release/semantic-release) and [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog)

The following additions are included:
  - Linting with [Codelyzer](http://codelyzer.com) with [Angular Style Guide](https://angular.io/guide/styleguide) rules
  - Debugging and task configurations for [Visual Studio Code](https://code.visualstudio.com)
  - Key bindings for Mac and Windows versions of VS Code
    + To use go to Preference, Keyboard Shortcuts, then paste into keybindings.json file
  - Placement of spec files next to source code
    + Models for tests can be placed in a models folder
    + Models named with .spec.ts suffix are excluded from the docs
  - TypeScript configured to target [ES2015](https://babeljs.io/learn-es2015/) to support advanced features
    + You can change this to ES5 to support [Internet Explorer 11](http://kangax.github.io/compat-table/es5/#ie11)

### Usage

```bash
git clone https://github.com/tonysneed/typescript-library-starter-lite.git YOURFOLDERNAME
cd YOURFOLDERNAME

# Run npm install and write your library name when asked. That's all!
npm install
```

**Start coding!** `package.json` and entry files are already set up for you, so don't worry about linking to your main file, typings, etc. Just keep those files with the same names.

- It's recommended you use an extension for VS Code such as [JSDoc Comments](https://marketplace.visualstudio.com/items?itemName=stevencl.addDocComments), in order to add comments to your code that will be included in your generated docs.

### Features

 - Zero-setup. After running `npm install` things will be setup for you :wink:
 - **[RollupJS](https://rollupjs.org/)** for multiple optimized bundles following the [standard convention](http://2ality.com/2017/04/setting-up-multi-platform-packages.html) and [Tree-shaking](https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/).
 - Tests, coverage and interactive watch mode using **[Jest](http://facebook.github.io/jest/)**
 - **Docs automatic generation and deployment** to `gh-pages`, using **[TypeDoc](http://typedoc.org/)**
 - Automatic types `(*.d.ts)` file generation
 - **[Travis](https://travis-ci.org)** integration and **[Coveralls](https://coveralls.io/)** report

### Excluding peerDependencies

On library development, one might want to set some peer dependencies, and thus remove those from the final bundle. You can see in [Rollup docs](https://rollupjs.org/#peer-dependencies) how to do that.

The good news is here is setup for you, you only must include the dependency name in `external` property within `rollup.config.js`. For example, if you wanna exclude `lodash`, just write there `external: ['lodash']`.

### NPM scripts

 - `npm t`: Run test suite
 - `npm start`: Runs `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch) **(Cmd + Shift + T)**
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs **(Cmd + Shift + B)**
 - `npm run lint`: Lints code **(Ctrl + Shift + L)**

### Automatic CI builds and Docs generation

_**Prerequisites**: you need to create accounts for:_
 - [Travis CI](https://travis-ci.org/)
 - [NPM](https://www.npmjs.com/)

After publishing your repo to GitHub, copy the clone URL and paste it into the `url` property of the `repository` section of your package.json file.

Then log into Travis CI and add the repository to your account.

Run the following command to prepare hooks and stuff:

```bash
npm run semantic-release-prepare
```

Follow the console instructions to install semantic release run it (answer NO to "Generate travis.yml").

```bash
npm install -g semantic-release-cli
semantic-release-cli setup
# IMPORTANT!! Answer NO to "Generate travis.yml" question. Is already prepared for you :P
```

You will be prompted for your Travis and GitHub credentials so that Travis CI can publish docs to GitHub Pages.

> Note: Semantic release will ask for your your NPM credentials, but these will not be used because automatic releases are disabled.

After pushing your first commit to master, Travis CI will run a CI build that runs your tests and generates documentation for your library.
  - After the CI build completes, you can go to the Settings for your repo to note the URL where your docs are published to GitHub Pages.

### Git Hooks

By default, there is a disabled git hook. It's set up when you run the `npm run semantic-release-prepare` script. They make sure:
 - Your build is not going fail in [Travis](https://travis-ci.org) (or your CI server), since it's runned locally before `git push`

### Manually Creating a Release and Publishing to NPM

When you're ready to publish a release on GitHub, just do it.
  - You may want to follow a [branching model](http://nvie.com/posts/a-successful-git-branching-model) such as [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) or [GitHub Flow](https://help.github.com/articles/github-flow).

To publish to NPM manually, just follow their [instructions](https://docs.npmjs.com/getting-started/publishing-npm-packages).

### FAQ

#### What is `npm install` doing the first time runned?

It runs the script `tools/init` which sets up everything for you. In short, it:
 - Configures RollupJS for the build, which creates the bundles.
 - Configures `package.json` (typings file, main file, etc)
 - Renames main library file in src

## Credit and Further Information

For more information about the complete TypeScript Library Starter by [@alexjoverm](https://twitter.com/alexjoverm), see the project GitHub [repo](https://github.com/alexjoverm/typescript-library-starter) and hist [blog post](https://dev.to/alexjoverm/write-a-library-using-typescript-library-starter) explaining how to use it.

