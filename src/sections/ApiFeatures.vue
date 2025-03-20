<template>
  <section class="wrapper">
    <h2>
      API/Features
      <a href="#api">#</a>
    </h2>

    <p>
      <code class="hljs">
        <span class="hljs-variable">global</span>
        <span>.</span>
        <span class="hljs-property">vueSnapshots</span>
      </code>
      options:
    </p>

    <ApiTable :features="TOP_LEVEL_API_DETAILS" />

    <p>
      <code class="hljs">
        <span class="hljs-variable">global</span>
        <span>.</span>
        <span class="hljs-property">vueSnapshots</span>
        <span>.</span>
        <span class="hljs-property">formmatting</span>
      </code>
      options:
    </p>
    <p>
      These settings only apply when using the default formatter,
      <code class="hljs hljs-string">'diffable'</code>.
    </p>

    <ApiTable :features="FORMATTING_API_DETAILS" />

    <div class="box">
      <p>
        For the <code class="hljs hljs-string">'classic'</code> formatter,
        you can use
        <code class="hljs">
          <span class="hljs-variable">global</span>
          <span>.</span>
          <span class="hljs-property">vueSnapshots</span>
          <span>.</span>
          <span class="hljs-property">classicFormmatting</span>
        </code>
        to pass in an object of settings.
        The default settings object is:
      </p>

      <DoxenCodeBox
        :code="CLASSIC_FORMATTING_DEFAULTS"
        :copy="false"
      />

      <p>
        Additional details about the
        <code class="hljs"><span class="hljs-property">classicFormmatting</span></code>
        options can be seen in the
        <code class="hljs"><a href="https://github.com/tjw-lint/vue3-snapshot-serializer/blob/main/types.js" class="hljs-number">types.js</a></code>
        file.
      </p>
      <p>
        <strong>Note:</strong> The classic formatter is only intended to be used as migration tool from <code>jest-serializer-vue-tjw</code>.
        Once migrated, it is recommended to switch the the "diffable" formatter, which is more customizable.
      </p>
    </div>

    <p id="default-settings">
      The below settings are all the defaults,
      so if you like them, you don't need to pass them in.
    </p>

    <DoxenCodeBox
      :code="ALL_SETTINGS_OBJECT"
      :copy="false"
    />

    <p>
      <strong>Note:</strong>
      In your global
      <code class="hljs hljs-variable">beforeEach</code>,
      you can add any settings you want to apply across your entire project.
      So before each test it will reset the snapshot settings.
      Then in specific tests you can override those settings as needed if the test works better with a setting changed.
      There is an example of this <a href="#settings">below</a>.
    </p>
  </section>
</template>

<script>
import { DoxenCodeBox } from 'vue-doxen';

import ApiTable from '@/components/ApiTable.vue';

import {
  ALL_SETTINGS_OBJECT,
  CLASSIC_FORMATTING_DEFAULTS,
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
    CLASSIC_FORMATTING_DEFAULTS,
    FORMATTING_API_DETAILS,
    TOP_LEVEL_API_DETAILS
  }
};
</script>
