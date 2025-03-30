import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'appbar',
  remotes: {
    uikit: 'uikit@http://localhost:3004/mf-manifest.json',
  },
  exposes: {
    '.': './src/components/AppBar',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
  },
});
