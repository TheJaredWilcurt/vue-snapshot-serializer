<template>
  <section class="wrapper">
    <h2>Advanced Usage</h2>

    <hr id="settings" />

    <h3>
      Adjusting Settings
      <a href="#settings">#</a>
    </h3>

    <p>In your <code>setup.js</code> file, I would recommend globally applying settings before every test run.</p>

    <DoxenCodeBox :code="GLOBAL_SETUP_EXAMPLE" />

    <p>
      With this in place, your snapshot settings will be reset before each test runs.
      This means you can freely override these settings in specific tests, like so:
    </p>

    <DoxenCodeBox :code="SPECIFIC_TEST_EXAMPLE" />

    <hr id="external-use" />

    <h3>
      Using this library outside of Vitest/Jest
      <a href="#external-use">#</a>
    </h3>

    <p>
      This library has many great features for formatting and cleaning up markup. For example, you may want to create your own function to validate expected markup in an End-to-End (E2E) testing tool, like Playwright or Cypress.
    </p>

    <DoxenCodeBox :code="VUE_MARKUP_FORMATTER_EXAMPLE" />

    <p>
      The <code>vueMarkupFormatter</code> function expects a string starting with <code>&lt;</code>,
      and will return a formatted string based on your <code>globalThis.vueSnapshots</code> settings.
      You can use <code>global</code>, <code>globalThis</code>, or <code>window</code> to set the
      <code>vueSnapshots</code> settings object depending on your JavaScript environment.
    </p>

    <hr id="types">

    <h3>
      Type inference
      <a href="#types">#</a>
    </h3>

    <p>
      The snapshot settings API is <strong>fully documented</strong>, <em>and less importantly</em>, <strong>typed</strong>, via <strong>JSDocs</strong>.
      If you <em>still think it's 2019</em> and are using TypeScript, maybe it's time to level up and switch to JSDocs, which is 100%
      compatible with the TypeScript engine built in to some editors. You can finally skip the slow recompilation step and nasty tooling.
      Though if you want to enforce it, just use <a href="https://github.com/gajus/eslint-plugin-jsdoc#readme">ESLint-Plugin-JSDoc</a> (it's great).
    </p>

    <p>
      Below we add a comment to import the type definition for the library's API, into the <code>setup.js</code> file,
      and store the type definition in the <code>SETTINGS</code> name space.
      Then we create a variable for our desired settings, and assign the <code>SETTINGS</code> type to it.
      At this point you can get hover text, auto-complete and if you add <code>//&nbsp;@ts&#8209;check</code> to the top of the file
      you'll get type checking (if your editor has the TS Engine built in). All this with <strong>normal</strong> JavaScript.
    </p>

    <DoxenCodeBox :code="TYPES_IMPORT_EXAMPLE" />

    <p>
      Other available type definitions are
      <code>SETTINGS</code>,
      <code>FORMATTER</code>,
      <code>FORMATTING</code>,
      <code>FORMATTERCB</code>,
      and
      <code>VOIDELEMENTS</code>.
      To learn more about them, read the
      <a href="https://github.com/tjw-lint/vue3-snapshot-serializer/blob/main/types.js">types.js</a>
      file.
    </p>
  </section>
</template>

<script>
import { DoxenCodeBox } from 'vue-doxen';

import {
  GLOBAL_SETUP_EXAMPLE,
  SPECIFIC_TEST_EXAMPLE,
  TYPES_IMPORT_EXAMPLE,
  VUE_MARKUP_FORMATTER_EXAMPLE
} from '@/helpers/codeSnippets.js';

export default {
  name: 'AdvancedUsage',
  components: {
    DoxenCodeBox
  },
  constants: {
    GLOBAL_SETUP_EXAMPLE,
    SPECIFIC_TEST_EXAMPLE,
    TYPES_IMPORT_EXAMPLE,
    VUE_MARKUP_FORMATTER_EXAMPLE
  }
};
</script>
