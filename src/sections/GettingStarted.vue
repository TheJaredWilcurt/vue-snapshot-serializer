<template>
  <section class="getting-started-section">
    <div class="wrapper">
      <h2>Getting Started</h2>

      <ol>
        <li>
          Install the dependency
          <ul>
            <li><code>npm install --save-dev vue3-snapshot-serializer</code></li>
          </ul>
        </li>
        <li>
          Register the serializer:
          <DoxenCodeSwapper
            :codeTypes="{
              Vitest: VITEST_CONFIG_EXAMPLE,
              Jest: JEST_CONFIG_EXAMPLE
            }"
          />
        </li>
        <li>
          If you want to tweak any of the default settings for snapshots, put them in your <code>global.beforeEach()</code>
          <DoxenCodeBox :code="GLOBAL_SETUP_EXAMPLE" />
        </li>
        <li>
          In tests, make sure to always pass in the Vue-Test-Utils wrapper containing the VNode so advanced features will work. If you pass in the HTML string instead, most features will still work, but not all.
          <DoxenCodeBox :code="WRAPPER_TEST_EXAMPLE" />
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
import {
  DoxenCodeBox,
  DoxenCodeSwapper
} from 'vue-doxen';

import {
  GLOBAL_SETUP_EXAMPLE,
  JEST_CONFIG_EXAMPLE,
  VITEST_CONFIG_EXAMPLE,
  WRAPPER_TEST_EXAMPLE
} from '@/helpers/codeSnippets.js';

export default {
  name: 'GettingStarted',
  components: {
    DoxenCodeBox,
    DoxenCodeSwapper
  },
  constants: {
    GLOBAL_SETUP_EXAMPLE,
    JEST_CONFIG_EXAMPLE,
    VITEST_CONFIG_EXAMPLE,
    WRAPPER_TEST_EXAMPLE
  }
};
</script>

<style>
.getting-started-section {
  background: #272865;
  border: 1px solid #111129;
  border-width: 1px 0px;
  padding-bottom: 1rem;
  color: #CCD;
}
</style>
