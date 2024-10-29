<template>
  <section class="wrapper">
    <h2>API/Features</h2>

    <p>
      <code>global.vueSnapshots</code> options:
    </p>

    <ApiTable :features="TOP_LEVEL_API_DETAILS" />

    <p>
      <code>global.vueSnapshots.formmatting</code> options:
    </p>
    <p>
      These settings only apply when using the default formatter, <code>'diffable'</code>.
    </p>

    <ApiTable :features="FORMATTING_API_DETAILS" />

    <p>The below settings are all the defaults, so if you like them, you don't need to pass them in.</p>

    <DoxenCodeBox :code="ALL_SETTINGS_OBJECT" />

    <p>
      <strong>Note:</strong> You can set the global defaults for your entire project in your global <code>beforeEach</code>, so it aways resets to those defaults before each test. Then In a specific test you can override those defaults as needed if a test works better with a setting.
    </p>
  </section>
</template>

<script>
import { DoxenCodeBox } from 'vue-doxen';

import ApiTable from '@/ApiTable.vue';

import {
  ALL_SETTINGS_OBJECT,
  FORMATTING_API_DETAILS,
  TOP_LEVEL_API_DETAILS
} from '@/helpers/codeSnippets.js';

export default {
  name: 'ApiFeatures',
  components: {
    ApiTable,
    DoxenCodeBox
  },
  constants: {
    ALL_SETTINGS_OBJECT,
    FORMATTING_API_DETAILS,
    TOP_LEVEL_API_DETAILS
  }
};
</script>
