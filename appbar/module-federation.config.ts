import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'appbar',
  remotes: {
    uikit: `uikit@${process.env.PRODUCTION_DOMAIN}/uikit/latest/mf-manifest.json`,
  },
  exposes: {
    '.': './src/AppBar',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
  },
});
