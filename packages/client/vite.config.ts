/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: '../../.env' });

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  plugins: [
    react(),
    checker({ typescript: true }),
  ],
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]--[hash:base64:5]',
    },
  },
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
        sw: './sw.ts',
      },
      output: {
        entryFileNames: (assetInfo) => (assetInfo.name === 'sw'
          ? '[name].js'
          : 'assets/js/[name]-[hash].js')
        ,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'static'),
    },
  },
});
