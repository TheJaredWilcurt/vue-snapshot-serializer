<template>
  <section class="wrapper">
    <h2>
      Advanced Usage
      <a href="#advanced">#</a>
    </h2>

    <hr id="settings" />

    <h3>
      Adjusting Settings
      <a href="#settings">#</a>
    </h3>

    <p>In your <code class="hljs hljs-number">setup.js</code> file, I would recommend globally applying settings before every test run.</p>

    <DoxenCodeBox
      :code="GLOBAL_SETUP_EXAMPLE"
      :copy="false"
    />

    <p>
      With this in place, your snapshot settings will be reset before each test runs.
      This means you can freely override these settings in specific tests, like so:
    </p>

    <DoxenCodeSwapper
      :codeTypes="{
        'Vue-Test-Utils': SPECIFIC_TEST_VTU_EXAMPLE,
        '@Testing-Library/Vue': SPECIFIC_TEST_TLV_EXAMPLE,
        '@Testing-Library/Vue (container)': SPECIFIC_TEST_TLV_CONTAINER_EXAMPLE
      }"
    />

    <hr id="external-use" />

    <h3>
      Using this library outside of Vitest/Jest
      <a href="#external-use">#</a>
    </h3>

    <p>
      This library has many great features for formatting and cleaning up markup. For example, you may want to create your own function to validate expected markup in an End-to-End (E2E) testing tool, like Playwright or Cypress.
    </p>

    <DoxenCodeBox
      :code="VUE_MARKUP_FORMATTER_EXAMPLE"
      :copy="false"
    />

    <p>
      The <code class="hljs hljs-name">vueMarkupFormatter</code> function expects a string starting with <code class="hljs hljs-string">&lt;</code>,
      and will return a formatted string based on your <code class="hljs"><span class="hljs-variable">globalThis</span>.vueSnapshots</code> settings.
      You can use <code class="hljs hljs-variable">global</code>, <code class="hljs hljs-variable">globalThis</code>, or <code class="hljs hljs-variable">window</code> to set the
      <code class="hljs hljs-name">vueSnapshots</code> settings object depending on your JavaScript environment.
    </p>

    <hr id="scoped-v-bind">

    <h3>
      Scoped V-Bind styles in snapshots
      <a href="#scoped-v-bind">#</a>
    </h3>

    <p>
      For convience, you can bind CSS properties to reactive values in Vue. It looks like this:
    </p>

    <DoxenCodeSwapper
      :codeTypes="{
        'Options API': VUE_VBIND_CSS_OPTIONS_API_EXAMPLE,
        'Composition API': VUE_VBIND_CSS_COMPOSITION_API_EXAMPLE,
        'Script Setup': VUE_VBIND_CSS_SCRIPT_SETUP_EXAMPLE
      }"
      :copy="false"
      fileName="VBindExample.vue"
    />

    <p>
      This will produce a DOM that looks like:
    </p>

    <DoxenCodeBox
      :code="VUE_VBIND_CSS_DOM_EXAMPLE"
      :copy="false"
    />

    <p>
      However, by default, your snapshots will not include these inline styles.
      To enable them in your snapshots add this to your <code>vite.config.js</code>.
    </p>

    <DoxenCodeBox
      :code="VITE_CONFIG_ENABLE_INLINE_SCOPED_CSS"
    />

    <p>
      With that, the dynamic inline styles will start appearing in your snapshots.
      The custom property begins with an 8 character random ID. To clean this up
      you can enable this setting:
      <code>global.vueSnapshots.renameScopedVBindCSS = true;</code>.
    </p>
    <p>
      With that setting enabled, it will produce this snapshot:
    </p>

    <DoxenCodeBox
      :code="VUE_VBIND_CSS_DOM_CLEANED_EXAMPLE"
      :copy="false"
    />

    <p>
      Note that <code>279c5a3b</code> was replaced with <code>scoped</code>.
    </p>

    <hr id="types">

    <h3>
      Type inference
      <a href="#types">#</a>
    </h3>

    <blockquote>
      <strong>Public Service Announcment</strong>
      <p>
        This library (<em>like most made in 2024</em>), is moving away from the perils of TypeScript,
        in favor of the much <strong>simpler</strong>, and <strong>more powerful</strong>, JSDocs approach.
      </p>

      <details>
        <summary>
          Why not stick with TypeScript?
        </summary>
        <ul>
          <li>Debugging issues</li>
          <li>Browser and editor incompatibility</li>
          <li>Complex tooling</li>
          <li>Segmented ecosystem</li>
          <li>Slow recompilation</li>
          <li>Learning curve/barrier to entry</li>
          <li>
            The umbrage of experienced folks that TS brings
            <a
              href="https://dev.to/thejaredwilcurt/quotes-about-typescript-2ohf"
              target="_blank"
              title="Dev.to - Quotes About TypeScript"
            >
              as the world's most contentious web technology
            </a>
          </li>
          <li>
            Syntax forces you to break the most important rule of writing readable code:
            <ul>
              <li><strong>"One idea, per line"</strong></li>
            </ul>
          </li>
          <li>
            TypeScript just does types, and has no solution for documenting the intent or context of the code, which is actually much more valuable. (Technically their solution is to use JSDocs... which, hey, that's what we're doing!)
          </li>
        </ul>
        <p>
          JSDocs has none of these issues, can do everything TS can (and more), and is fully supported &amp; recommended by the TS maintainers.
        </p>
      </details>

      <p>
        We encourage others to follow suit.
        If you want to automate enforcing JSDocs, so your code and comments are always in sync, all you need is a simple linting plugin:
      </p>
      <ul>
        <li>
          <a href="https://github.com/gajus/eslint-plugin-jsdoc#readme">ESLint-Plugin-JSDoc</a>
          (<em>it's great!</em>)
        </li>
        <li><a href="https://github.com/tjw-lint/eslint-config-tjw-jsdoc/blob/main/index.js#L9">The rules I use with it</a>.</li>
      </ul>
    </blockquote>

    <p>
      Below we add a comment to import the type definition for the library's API, into the <code class="hljs hljs-number">setup.js</code> file,
      and store the type definition in the <code class="hljs hljs-variable">SETTINGS</code> name space.
      Then we create a variable for our desired settings, and assign the <code class="hljs hljs-variable">SETTINGS</code> type to it.
      At this point you can get hover text, auto-complete and if you add <code class="hljs hljs-comment">//&nbsp;@ts&#8209;check</code> to the top of the file
      you'll get type checking (if your editor has the TS Engine built in). All this with <strong>normal</strong> JavaScript.
    </p>

    <DoxenCodeBox
      :code="TYPES_IMPORT_EXAMPLE"
      :copy="false"
    />

    <p>
      Other available type definitions are
      <code class="hljs hljs-variable">SETTINGS</code>,
      <code class="hljs hljs-variable">STUBS</code>,
      <code class="hljs hljs-variable">FORMATTER</code>,
      <code class="hljs hljs-variable">FORMATTING</code>,
      <code class="hljs hljs-variable">CLASSICFORMATTING</code>,
      <code class="hljs hljs-variable">POSTPROCESSOR</code>,
      and
      <code class="hljs hljs-variable">VOIDELEMENTS</code>.
      To learn more about them, read the
      <code class="hljs"><a href="https://github.com/tjw-lint/vue3-snapshot-serializer/blob/main/types.js" class="hljs-number">types.js</a></code>
      file.
    </p>
  </section>
</template>

<script>
import {
  DoxenCodeBox,
  DoxenCodeSwapper
} from 'vue-doxen';

import {
  GLOBAL_SETUP_EXAMPLE,
  SPECIFIC_TEST_TLV_CONTAINER_EXAMPLE,
  SPECIFIC_TEST_TLV_EXAMPLE,
  SPECIFIC_TEST_VTU_EXAMPLE,
  TYPES_IMPORT_EXAMPLE,
  VITE_CONFIG_ENABLE_INLINE_SCOPED_CSS,
  VUE_MARKUP_FORMATTER_EXAMPLE,
  VUE_VBIND_CSS_COMPOSITION_API_EXAMPLE,
  VUE_VBIND_CSS_DOM_EXAMPLE,
  VUE_VBIND_CSS_DOM_CLEANED_EXAMPLE,
  VUE_VBIND_CSS_OPTIONS_API_EXAMPLE,
  VUE_VBIND_CSS_SCRIPT_SETUP_EXAMPLE
} from '@/helpers/codeSnippets.js';

export default {
  name: 'AdvancedUsage',
  components: {
    DoxenCodeBox,
    DoxenCodeSwapper
  },
  constants: {
    GLOBAL_SETUP_EXAMPLE,
    SPECIFIC_TEST_TLV_CONTAINER_EXAMPLE,
    SPECIFIC_TEST_TLV_EXAMPLE,
    SPECIFIC_TEST_VTU_EXAMPLE,
    TYPES_IMPORT_EXAMPLE,
    VITE_CONFIG_ENABLE_INLINE_SCOPED_CSS,
    VUE_MARKUP_FORMATTER_EXAMPLE,
    VUE_VBIND_CSS_COMPOSITION_API_EXAMPLE,
    VUE_VBIND_CSS_DOM_EXAMPLE,
    VUE_VBIND_CSS_DOM_CLEANED_EXAMPLE,
    VUE_VBIND_CSS_OPTIONS_API_EXAMPLE,
    VUE_VBIND_CSS_SCRIPT_SETUP_EXAMPLE
  }
};
</script>
