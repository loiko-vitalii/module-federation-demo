import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

const IS_PROD = process.env.NODE_ENV === 'production';

export default createModuleFederationConfig({
  name: 'app',
  remotes: {
    appbar: `appbar@${IS_PROD ? `${process.env.PRODUCTION_DOMAIN}/appbar/latest` : 'http://localhost:3001'}/mf-manifest.json`,
    feed: `feed@${IS_PROD ? `${process.env.PRODUCTION_DOMAIN}/feed/latest` : 'http://localhost:3002'}/mf-manifest.json`,
    uikit: `uikit@${IS_PROD ? `${process.env.PRODUCTION_DOMAIN}/uikit/latest` : 'http://localhost:3003'}/mf-manifest.json`,
  },
  shareStrategy: 'loaded-first',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
  },
});
