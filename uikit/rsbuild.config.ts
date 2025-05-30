import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import moduleFederationConfig from './module-federation.config';

const VERSION = process.env.npm_package_version;
const DOMAIN = process.env.PRODUCTION_DOMAIN;

export default defineConfig({
  plugins: [pluginReact(), pluginTypedCSSModules(), pluginModuleFederation(moduleFederationConfig)],
  server: {
    port: 3003,
  },
  output: {
    cssModules: {
      namedExport: true,
    },
    assetPrefix: `${DOMAIN}/uikit/${VERSION}`,
  },
});
