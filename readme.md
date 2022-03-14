# @gitzone/tsbundle
a bundler using rollup for painless bundling of web projects

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@gitzone/tsbundle)
* [gitlab.com (source)](https://gitlab.com/gitzone/tsbundle)
* [github.com (source mirror)](https://github.com/gitzone/tsbundle)
* [docs (typedoc)](https://gitzone.gitlab.io/tsbundle/)

## Status for master

Status Category | Status Badge
-- | --
GitLab Pipelines | [![pipeline status](https://gitlab.com/gitzone/tsbundle/badges/master/pipeline.svg)](https://lossless.cloud)
GitLab Pipline Test Coverage | [![coverage report](https://gitlab.com/gitzone/tsbundle/badges/master/coverage.svg)](https://lossless.cloud)
npm | [![npm downloads per month](https://badgen.net/npm/dy/@gitzone/tsbundle)](https://lossless.cloud)
Snyk | [![Known Vulnerabilities](https://badgen.net/snyk/gitzone/tsbundle)](https://lossless.cloud)
TypeScript Support | [![TypeScript](https://badgen.net/badge/TypeScript/>=%203.x/blue?icon=typescript)](https://lossless.cloud)
node Support | [![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
Code Style | [![Code Style](https://badgen.net/badge/style/prettier/purple)](https://lossless.cloud)
PackagePhobia (total standalone install weight) | [![PackagePhobia](https://badgen.net/packagephobia/install/@gitzone/tsbundle)](https://lossless.cloud)
PackagePhobia (package size on registry) | [![PackagePhobia](https://badgen.net/packagephobia/publish/@gitzone/tsbundle)](https://lossless.cloud)
BundlePhobia (total size when bundled) | [![BundlePhobia](https://badgen.net/bundlephobia/minzip/@gitzone/tsbundle)](https://lossless.cloud)
Platform support | [![Supports Windows 10](https://badgen.net/badge/supports%20Windows%2010/yes/green?icon=windows)](https://lossless.cloud) [![Supports Mac OS X](https://badgen.net/badge/supports%20Mac%20OS%20X/yes/green?icon=apple)](https://lossless.cloud)

## Usage

Use TypeScript for best in class intellisense.

tsbundle will bundle modern JavaScript websites in an Google Bot conformant way so things like AdSense do work.

tsbundle supports two modes of usage: CLI and API usage.

### CLI

```shell
# Note: This is code that belongs into your terminal ;)
# Install the tool for cli usage

# Globally
npm install -g @gitzone/tsbundle

# Locally for use in your pacakge.json
npm install --save-dev @gitzone/tsbundle

# then use it
tsbundle --from="./ts/index.ts" --to="dist/bundle.js"

## note you can call tsbundle without arguments. Default values are --from="./ts_web/index.ts" --to="dist_bundle/bundle.js"
## You can use --production to enable minification using terser
```

## API

You are using TypeScript, aren't you? Most of the stuff is apparent from the IDE intellisense.

```typescript
import { TsBundle } from '@gitozne/tsbundle';

const myTsBundleInstance = new TsBundle();

const run = async () => {
  await myTsBundleInstance.buildTest('./from/my.ts', './to/mybundle.js');
  // OR
  await myTsBundleInstance.buildProduction('./from/my.ts', './to/mybundle.js');
};
```

## Contribution

We are always happy for code contributions. If you are not the code contributing type that is ok. Still, maintaining Open Source repositories takes considerable time and thought. If you like the quality of what we do and our modules are useful to you we would appreciate a little monthly contribution: You can [contribute one time](https://lossless.link/contribute-onetime) or [contribute monthly](https://lossless.link/contribute). :)

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
