/* eslint-disable import-x/no-extraneous-dependencies */
import { resolve } from 'node:path';

import pluginJs from '@eslint/js';
import tjwBase from 'eslint-config-tjw-base';
import tjwImport from 'eslint-config-tjw-import-x';
import tjwVue from 'eslint-config-tjw-vue';
import pluginImport from 'eslint-plugin-import-x';
import pluginVue from 'eslint-plugin-vue';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

const __dirname = import.meta.dirname;
const vue3Recommended = pluginVue.configs['flat/recommended'];
const vueA11yRecommended = pluginVueA11y.configs['flat/recommended'];

const config = [
  pluginJs.configs.recommended,
  pluginImport.flatConfigs.recommended,
  ...vue3Recommended,
  ...vueA11yRecommended,
  tjwBase.configs.recommended,
  tjwImport,
  tjwVue,
  {
    languageOptions: {
      ecmaVersion: 2026
    },
    // project specific rules/settings
    rules: {
      'vuejs-accessibility/label-has-for': [
        'error',
        {
          components: ['Label'],
          required: {
            some: ['nesting', 'id']
          },
          allowChildren: false
        }
      ]
    },
    settings: {
      'import-x/resolver': {
        vite: {
          viteConfig: {
            resolve: {
              alias: {
                '@': resolve(__dirname, 'src')
              }
            }
          }
        }
      }
    }
  }
];

export default config;
