import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'app',
  remotes: {
    appbar: 'appbar@http://localhost:3001/mf-manifest.json',
    feed: 'feed@http://localhost:3003/mf-manifest.json',
    uikit: 'uikit@http://localhost:3004/mf-manifest.json',
  },
  shareStrategy: 'loaded-first',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
  },
});
