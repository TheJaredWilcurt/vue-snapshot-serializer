import pluginJs from '@eslint/js';
import tjwBase from 'eslint-config-tjw-base';
import tjwVue from 'eslint-config-tjw-vue';
import pluginVue from 'eslint-plugin-vue';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

const vue3Recommended = pluginVue.configs['flat/recommended'];
const vueA11yRecommended = pluginVueA11y.configs['flat/recommended'];

export default [
  pluginJs.configs.recommended,
  ...vue3Recommended,
  ...vueA11yRecommended,
  tjwBase.configs.recommended,
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
    }
  }
];
