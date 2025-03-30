import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import moduleFederationConfig from './module-federation.config';

export default defineConfig({
  plugins: [pluginReact(), pluginTypedCSSModules(), pluginModuleFederation(moduleFederationConfig)],
  server: {
    port: 3004,
  },
  output: {
    cssModules: {
      namedExport: true,
    },
  },
});
