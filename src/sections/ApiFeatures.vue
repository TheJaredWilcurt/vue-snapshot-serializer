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
      <strong>Note:</strong> In your global <code>beforeEach</code>, you can add any settings you want to apply across your entire project. So before each test it will reset the snapshot settings. Then in specific tests you can override those settings as needed if the test works better with a setting changed.
    </p>
  </section>
</template>

<script>
import { DoxenCodeBox } from 'vue-doxen';

import ApiTable from '@/components/ApiTable.vue';

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
