<template>
  <section class="wrapper">
    <h2>Advanced Usage</h2>

    <h3>Adjusting Settings</h3>

    <p>In your <code>setup.js</code> file, I would recommend globally applying settings before every test run.</p>

    <DoxenCodeBox :code="GLOBAL_SETUP_EXAMPLE" />

    <p>
      With this in place, your snapshot settings will be reset before each test runs.
      This means you can freely override these settings in specific tests, like so:
    </p>

    <DoxenCodeBox :code="SPECIFIC_TEST_EXAMPLE" />

    <h3>Using this library outside of Vitest/Jest</h3>

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
  </section>
</template>

<script>
import { DoxenCodeBox } from 'vue-doxen';

import {
  GLOBAL_SETUP_EXAMPLE,
  SPECIFIC_TEST_EXAMPLE,
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
    VUE_MARKUP_FORMATTER_EXAMPLE
  }
};
</script>
