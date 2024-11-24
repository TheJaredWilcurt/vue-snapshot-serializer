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

    <div
      v-html="SPECIFIC_TEST_EXAMPLE"
      data-applied-style-tokens="codeBoxContainer"
      aria-label="Code example"
    ></div>

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
      At this point you can get hover text, auto-complete and if you add <code class="hljs hljs-comment">//&nbsp;<span class="at">@</span>ts&#8209;check</code> to the top of the file
      you'll get type checking (if your editor has the TS Engine built in). All this with <strong>normal</strong> JavaScript.
    </p>

    <div
      v-html="TYPES_IMPORT_EXAMPLE"
      data-applied-style-tokens="codeBoxContainer"
      aria-label="Code example"
    ></div>

    <p>
      Other available type definitions are
      <code class="hljs hljs-variable">SETTINGS</code>,
      <code class="hljs hljs-variable">FORMATTER</code>,
      <code class="hljs hljs-variable">FORMATTING</code>,
      <code class="hljs hljs-variable">FORMATTERCB</code>,
      and
      <code class="hljs hljs-variable">VOIDELEMENTS</code>.
      To learn more about them, read the
      <code class="hljs"><a href="https://github.com/tjw-lint/vue3-snapshot-serializer/blob/main/types.js" class="hljs-number">types.js</a></code>
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
