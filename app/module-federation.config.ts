import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'app',
  remotes: {
    appbar: `appbar@${process.env.PRODUCTION_DOMAIN}/appbar/latest/mf-manifest.json`,
    feed: `feed@${process.env.PRODUCTION_DOMAIN}/feed/latest/mf-manifest.json`,
    uikit: `uikit@${process.env.PRODUCTION_DOMAIN}/uikit/latest/mf-manifest.json`,
  },
  shareStrategy: 'loaded-first',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
  },
});
