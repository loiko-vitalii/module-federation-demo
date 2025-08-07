import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

const IS_PROD = process.env.NODE_ENV === 'production' && !process.env.CI;

export default createModuleFederationConfig({
  name: 'feed',
  remotes: {
    uikit: `uikit@${IS_PROD ? `${process.env.PRODUCTION_DOMAIN}/uikit/latest` : 'http://localhost:3003'}/mf-manifest.json`,
  },
  exposes: {
    '.': './src/Feed',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
  },
});
