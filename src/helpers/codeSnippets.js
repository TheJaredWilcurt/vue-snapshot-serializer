function unindent (value) {
  if (
    !value.startsWith('  ') &&
    !value.startsWith('\n  ')
  ) {
    return value;
  }
  return value
    .split('\n')
    .map((line) => {
      if (line.startsWith('  ')) {
        return line.replace('  ', '');
      }
      return line;
    })
    .join('\n')
    .trim();
}

export const JEST_CONFIG_EXAMPLE = unindent(`
  // package.json or Jest config file
  {
    "jest": {
      "snapshotSerializers": [
        "./node_modules/vue3-snapshot-serializer/index.js"
      ]
    }
  }
`);

export const VITEST_CONFIG_EXAMPLE = unindent(`
  // vite.config.js or vitest.config.js
  import { defineConfig } from 'vite'; // or 'vitest'

  export default defineConfig({
    test: {
      snapshotSerializers: [
        './node_modules/vue3-snapshot-serializer/index.js'
      ]
    }
  });
`);

export const WRAPPER_TEST_EXAMPLE = unindent(`
  test('My test', async () => {
    const wrapper = await mount(MyComponent);
    const button = wrapper.find('[data-test="myButton"]');

    // GOOD
    expect(wrapper)
      .toMatchSanpshot();

    // GOOD
    expect(button)
      .toMatchSanpshot();

    // BAD
    expect(wrapper.html())
      .toMatchSanpshot();

    // BAD
    expect(button.html())
      .toMatchSanpshot();
  });
`);

export const TOP_LEVEL_API_DETAILS = Object.freeze([
  {
    setting: '<code>verbose</code>',
    default: '<code class="hljs-literal">true</code>',
    description: 'Logs to the console errors or other messages if true.'
  },
  {
    setting: '<code>attributesToClear</code>',
    default: '<code>[]</code>',
    description: [
      'Takes an array of attribute strings,',
      'like',
      '<code class="hljs">[<span class="hljs-string">\'title\'</span>, <span class="hljs-string">\'id\'</span>]</code>,',
      'to remove the values from these attributes.',
      '<code class="hljs"><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"9:04:55 AM"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"uuid_48a50d28cb453f94"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"current-time"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></code>',
      'becomes',
      '<code class="hljs"><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">title</span> <span class="hljs-attr">id</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"current-time"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></code>.'
    ].join(' ')
  },
  {
    setting: '<code>addInputValues</code>',
    default: '<code class="hljs-literal">true</code>',
    description: [
      'Display current internal element value on',
      '<code class="hljs hljs-attr">input</code>,',
      '<code class="hljs hljs-attr">textarea</code>,',
      'and',
      '<code class="hljs hljs-attr">select</code>',
      'fields.',
      '<code class="hljs"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>&gt;</span></code>',
      'becomes',
      '<code class="hljs"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"\'whatever\'"</span>&gt;</span></code>.',
      '<strong>Requires passing in the VTU <code class="hljs hljs-attr">wrapper</code></strong>,',
      'not',
      '<code class="hljs hljs-attr">wrapper.html()</code>.'
    ].join(' ')
  },
  {
    setting: '<code>sortAttributes</code>',
    default: '<code class="hljs-literal">true</code>',
    description: 'Sorts the attributes inside HTML elements in the snapshot. This greatly reduces snapshot noise, making diffs easier to read and more meaningful.'
  },
  {
    setting: '<code>stringifyAttributes</code>',
    default: '<code class="hljs-literal">true</code>',
    description: [
      'Injects the real values of dynamic attributes/props into the snapshot.',
      '<code class="hljs"><span class="hljs-tag"><span class="hljs-attr">to</span>=<span class="hljs-string">"[object Object]"</span></span></code>',
      'becomes',
      '<code class="hljs"><span class="hljs-tag"><span class="hljs-attr">to</span>=<span class="hljs-string">"{ name: \'home\' }"</span></span></code>.',
      '<strong>Requires passing in the VTU <code class="hljs hljs-attr">wrapper</code></strong>, not',
      '<code class="hljs hljs-attr">wrapper.html()</code>.'
    ].join(' ')
  },
  {
    setting: '<code>removeServerRendered</code>',
    default: '<code class="hljs-literal">true</code>',
    description: [
      'Removes',
      '<code class="hljs"><span class="hljs-attr">data-server-rendered</span>=<span class="hljs-string">"true"</span></code>',
      'from your snapshots if true.'
    ].join(' ')
  },
  {
    setting: '<code>removeDataVId</code>',
    default: '<code class="hljs-literal">true</code>',
    description: [
      'Removes',
      '<code class="hljs"><span class="hljs-attr">data-v-1234abcd</span>=<span class="hljs-string">""</span></code>',
      'from your snapshots if true. Useful if 3rd-party components use scoped styles to reduce snapshot noise when updating dependencies.'
    ].join(' ')
  },
  {
    setting: '<code>removeDataTest</code>',
    default: '<code class="hljs-literal">true</code>',
    description: [
      'Removes',
      '<code class="hljs"><span class="hljs-attr">data-test</span>=<span class="hljs-string">"whatever"</span></code>',
      'from your snapshots if true. To also remove these from your production builds,',
      '<a href="https://github.com/cogor/vite-plugin-vue-remove-attributes">see here</a>.'
    ].join(' ')
  },
  {
    setting: '<code>removeDataTestid</code>',
    default: '<code class="hljs-literal">true</code>',
    description: [
      'Removes',
      '<code class="hljs"><span class="hljs-attr">data-testid</span>=<span class="hljs-string">"whatever"</span></code>',
      'from your snapshots if true.'
    ].join(' ')
  },
  {
    setting: '<code>removeDataTestId</code>',
    default: '<code class="hljs-literal">true</code>',
    description: [
      'Removes',
      '<code class="hljs"><span class="hljs-attr">data-test-id</span>=<span class="hljs-string">"whatever"</span></code>',
      'from your snapshots if true.'
    ].join(' ')
  },
  {
    setting: '<code>removeDataQa</code>',
    default: '<code class="hljs-literal">false</code>',
    description: [
      'Removes',
      '<code class="hljs"><span class="hljs-attr">data-qa</span>=<span class="hljs-string">"whatever"</span></code>',
      'from your snapshots if true.',
      '<code class="hljs hljs-attr">data-qa</code>',
      'is usually used by non-dev QA members.',
      'If they change in your snapshot, that indicates it may break someone else\'s E2E tests.',
      'So most using',
      '<code class="hljs hljs-attr">data-qa</code>',
      'prefer they be left in by default.'
    ].join(' ')
  },
  {
    setting: '<code>removeDataCy</code>',
    default: '<code class="hljs-literal">false</code>',
    description: [
      'Removes',
      '<code class="hljs"><span class="hljs-attr">data-cy</span>=<span class="hljs-string">"whatever"</span></code>',
      'from your snapshots if true.',
      '<code class="hljs hljs-attr">data-cy</code>',
      'is used by Cypress end-to-end tests.',
      'If they change in your snapshot, that indicates it may break an E2E test.',
      'So most using',
      '<code class="hljs hljs-attr">data-cy</code>',
      'prefer they be left in by default.'
    ].join(' ')
  },
  {
    setting: '<code>removeDataPw</code>',
    default: '<code class="hljs-literal">false</code>',
    description: [
      'Removes',
      '<code class="hljs"><span class="hljs-attr">data-pw</span>=<span class="hljs-string">"whatever"</span></code>',
      'from your snapshots if true.',
      '<code class="hljs hljs-attr">data-pw</code>',
      'is used by Playwright end-to-end tests.',
      'If they change in your snapshot, that indicates it may break an E2E test.',
      'So most using',
      '<code class="hljs hljs-attr">data-pw</code>',
      'prefer they be left in by default.'
    ].join(' ')
  },
  {
    setting: '<code>removeIdTest</code>',
    default: '<code class="hljs-literal">false</code>',
    description: [
      'Removes',
      '<code class="hljs"><span class="hljs-attr">id</span>=<span class="hljs-string">"test-whatever"</span></code>',
      'or',
      '<code class="hljs"><span class="hljs-attr">id</span>=<span class="hljs-string">"testWhatever"</span></code>',
      'from snapshots.',
      '<strong>Warning:</strong> You should never use ID\'s for test tokens,',
      'as they can also be used by JS and CSS,',
      'making them more brittle and their intent less clear.',
      'Use',
      '<code class="hljs hljs-attr">data-test-id</code>',
      'instead.'
    ].join(' ')
  },
  {
    setting: '<code>removeClassTest</code>',
    default: '<code class="hljs-literal">false</code>',
    description: [
      'Removes all CSS classes that start with "test", like',
      '<code class="hljs"><span class="hljs-attr">class</span>=<span class="hljs-string">"test-whatever"</span></code>.',
      '<strong>Warning:</strong> Don\'t use this approach.',
      'Use <code class="hljs hljs-attr">data-test</code> instead.',
      'It is better suited for this because it doesn\'t conflate CSS and test tokens.'
    ].join(' ')
  },
  {
    setting: '<code>removeComments</code>',
    default: '<code class="hljs-literal">false</code>',
    description: 'Removes all HTML comments from your snapshots. This is false by default, as sometimes these comments can infer important information about how your DOM was rendered. However, this is mostly just personal preference.'
  },
  {
    setting: '<code>clearInlineFunctions</code>',
    default: '<code class="hljs-literal">false</code>',
    description: [
      'Replaces',
      '<code class="hljs"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"function () { return true; }"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code>',
      'or',
      '<code class="hljs"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"(x) =&gt; !x"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code>',
      'with this placeholder',
      '<code class="hljs"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"[function]"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code>.'
    ].join(' ')
  },
  {
    setting: '<code>formatter</code>',
    default: '<code class="hljs-string">\'diffable\'</code>',
    description: [
      'Function to use for formatting the markup output.',
      'See examples below. Accepts',
      '<code class="hljs hljs-string">\'none\'</code>,',
      '<code class="hljs hljs-string">\'diffable\'</code>,',
      'or a function.',
      'If using a custom function it will be handed a string of markup and must return a string (not a promise).'
    ].join(' ')
  },
  {
    setting: '<code>formatting</code>',
    default: 'See table below',
    description: 'An object containing settings specific to the "diffable" formatter.'
  }
]);

export const FORMATTING_API_DETAILS = Object.freeze([
  {
    setting: '<code>attributesPerLine</code>',
    default: '<code class="hljs-number">1</code>',
    description: 'How many attributes are allowed on the same line as the starting tag.'
  },
  {
    setting: '<code>emptyAttributes</code>',
    default: '<code class="hljs-literal">true</code>',
    description: [
      'Determines whether empty attributes will include',
      '<code class="hljs">=<span class="hljs-string">""</span></code>.',
      'If',
      '<code class="hljs hljs-literal">false</code>',
      'then',
      '<code class="hljs"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&nbsp;<span class="hljs-attr">class</span>=<span class="hljs-string">""</span>&nbsp;<span class="hljs-attr">id</span>=<span class="hljs-string">""</span>&gt;&lt;/<span class="hljs-name">span</span>&gt;</span></code>',
      'becomes',
      '<code class="hljs"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&nbsp;<span class="hljs-attr">class</span>&nbsp;<span class="hljs-attr">id</span>&gt;&lt;/<span class="hljs-name">span</span>&gt;</span></code>.'
    ].join(' ')
  },
  {
    setting: '<code>escapeInnerText</code>',
    default: '<code class="hljs-literal">true</code>',
    description: [
      'Retains (if',
      '<code class="hljs hljs-literal">true</code>)',
      'or discards (if',
      '<code class="hljs hljs-literal">false</code>)',
      'named HTML entity encodings, like',
      '<code class="hljs hljs-string">&amp;lt;</code>',
      'instead of',
      '<code class="hljs hljs-string"><</code>.'
    ].join(' ')
  },
  {
    setting: '<code>selfClosingTag</code>',
    default: '<code class="hljs-literal">false</code>',
    description: [
      'Converts',
      '<code class="hljs hljs-tag">&lt;<span class="hljs-name">div</span>&gt;&lt;/<span class="hljs-name">div</span>&gt;</code>',
      'to',
      '<code class="hljs hljs-tag">&lt;<span class="hljs-name">div</span>&nbsp;/&gt;</code>',
      'or',
      '<code class="hljs hljs-tag">&lt;<span class="hljs-name">p</span>&nbsp;<span class="hljs-attr">class</span>=<span class="hljs-string">"x"</span>&gt;&lt;/<span class="hljs-name">p</span>&gt;</code>',
      'to',
      '<code class="hljs hljs-tag">&lt;<span class="hljs-name">p</span>&nbsp;<span class="hljs-attr">class</span>=<span class="hljs-string">"x"</span>&nbsp;/&gt;</code>.',
      'Does not affect void elements (like',
      '<code class="hljs hljs-tag">&lt;<span class="hljs-name">input</span>&gt;</code>),',
      'use the',
      '<code class="hljs hljs-variable">voidElements</code>',
      'setting for them.'
    ].join(' ')
  },
  {
    setting: '<code>tagsWithWhitespacePreserved</code>',
    default: '<code style="white-space: pre;">[<span class="hljs-string">\'a\'</span>, <span class="hljs-string">\'pre\'</span>]</code>',
    description: [
      'Does not add returns and indentation to the inner content of these tags when formatting.',
      'Accepts an array of tags.'
    ].join(' ')
  },
  {
    setting: '<code>voidElements</code>',
    default: '<code class="hljs-string">\'xhtml\'</code>',
    description: [
      'Determines how <a href="https://developer.mozilla.org/en-US/docs/Glossary/Void_element" target="_blank">void elements</a> are closed.',
      '<br><br><strong>Accepts:</strong>',
      '<ul>',
      '  <li>',
      '    <code class="hljs hljs-string">\'html\'</code>',
      '    for',
      '    <code class="hljs hljs-tag">&lt;<span class="hljs-name">input</span>&gt;</code>',
      '  </li>',
      '  <li>',
      '    <code class="hljs hljs-string">\'xhtml\'</code>',
      '    for',
      '    <code class="hljs hljs-tag">&lt;<span class="hljs hljs-name">input</span>&nbsp;/&gt;</code>',
      '  </li>',
      '  <li>',
      '    <code class="hljs hljs-string">\'xml\'</code>',
      '    for',
      '    <code class="hljs hljs-tag" style="white-space: pre;">&lt;<span class="hljs-name">input</span>&gt;&lt;/<span class="hljs-name">input</span>&gt;</code>',
      '  </li>',
      '</ul>'
    ].join(' ')
  }
]);

export const ALL_SETTINGS_OBJECT = unindent(`
  global.vueSnapshots = {
    verbose: true,
    attributesToClear: [],
    addInputValues: true,
    sortAttributes: true,
    stringifyAttributes: true,
    removeServerRendered: true,
    removeDataVId: true,
    removeDataTest: true,
    removeDataTestid: true,
    removeDataTestId: true,
    removeDataQa: false,
    removeDataCy: false,
    removeDataPw: false,
    removeIdTest: false,
    removeClassTest: false,
    removeComments: false,
    clearInlineFunctions: false,
    formatter: 'diffable',
    formatting: {
      attributesPerLine: 1,
      emptyAttributes: true,
      escapeInnerText: true,
      selfClosingTag: false,
      tagsWithWhitespacePreserved: ['a', 'pre'],
      voidElements: 'xhtml'
    }
  };
`);

export const GLOBAL_SETUP_EXAMPLE = unindent(`
  // /tests/setup.js
  global.beforeEach(() => {
    // Your default settings for all snapshots
    global.vueSnapshots = {
      formatting: {}
    };
  });
`);

/*
export const SPECIFIC_TEST_EXAMPLE = unindent(`
  // /tests/components/MyComponent.test.js
  import { mount } from '@vue/test-utils';

  import MyComponent from '@/components/MyComponent.vue';

  describe('MyComponent', () => {
    test('My test', async () => {
      const wrapper = await mount(MyComponent);

      // Test-specific settings that override the defaults in setup.js
      global.vueSnapshots.attributesToClear = ['data-uuid'];

      expect(wrapper)
        .toMatchSnapshot();
    });
  });
`);
*/
export const SPECIFIC_TEST_EXAMPLE = unindent(`
  <pre
    data-applied-style-tokens="codeBox"
    data-style-tokens="codeBox"
  ><code class="hljs javascript"><span class="hljs-comment">// /tests/components/MyComponent.test.js</span>
  <span class="hljs-keyword">import</span> { mount } <span class="hljs-keyword">from</span> <span class="hljs-string">'<span class="at">@</span>vue/test-utils'</span>;

  <span class="hljs-keyword">import</span> <span class="hljs-title class_">MyComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'<span class="at">@</span>/components/MyComponent.vue'</span>;

  <span class="hljs-title function_">describe</span>(<span class="hljs-string">'MyComponent'</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">test</span>(<span class="hljs-string">'My test'</span>, <span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> wrapper = <span class="hljs-keyword">await</span> <span class="hljs-title function_">mount</span>(<span class="hljs-title class_">MyComponent</span>);

      <span class="hljs-comment">// Test-specific settings that override the defaults in setup.js</span>
      <span class="hljs-variable language_">global</span>.<span class="hljs-property">vueSnapshots</span>.<span class="hljs-property">attributesToClear</span> = [<span class="hljs-string">'data-uuid'</span>];

      <span class="hljs-title function_">expect</span>(wrapper)
        .<span class="hljs-title function_">toMatchSnapshot</span>();
    });
  });</code></pre>
`);

export const VUE_MARKUP_FORMATTER_EXAMPLE = unindent(`
  import { vueMarkupFormatter } from 'vue3-snapshot-serializer';

  // Your settings
  globalThis.vueSnapshots = {
    formatting: {}
  };

  const formatted = vueMarkupFormatter('<div data-test="example">Text</div>');
  console.log(formatted);
  //\`<div>
  //  Text
  //</div>\`
`);

// export const TYPES_IMPORT_EXAMPLE = unindent(`
//   /** @typedef {import('vue3-snapshot-serializer/types').SETTINGS} SETTINGS */
//
//   global.beforeEach(() => {
//     /** @type {SETTINGS} */
//     const settings = {
//       // Your settings
//     };
//     globalThis.vueSnapshots = settings;
//   });
// `);
export const TYPES_IMPORT_EXAMPLE = unindent(`
  <pre data-applied-style-tokens="codeBox"><code class="hljs javascript"><span class="hljs-comment">/** <span class="hljs-doctag"><span class="at">@</span>typedef</span> {<span class="hljs-type">import('vue3-snapshot-serializer/types').SETTINGS</span>} SETTINGS */</span>

  <span class="hljs-variable language_">global</span>.<span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">/** <span class="hljs-doctag"><span class="at">@</span>type</span> {<span class="hljs-type">SETTINGS</span>} */</span>
    <span class="hljs-keyword">const</span> settings = {
      <span class="hljs-comment">// Your settings</span>
    };
    globalThis.<span class="hljs-property">vueSnapshots</span> = settings;
  });</code></pre>
`);

export const API_DESCRIPTIONS = Object.freeze({
  fontSize: 'Adjusts the font size of the playground input/output boxes.',
  stacked: 'Changes the layout of the input/output boxes.',
  verbose: 'Logs to the console errors or other messages if true.',
  attributesToClear: 'Takes an array of attribute strings, like `[\'title\', \'id\']`, to remove the values from these attributes. `<i title="9:04:55 AM" id="uuid_48a50d28cb453f94" class="current-time"></i>` becomes `<i title id class="current-time"></i>`.',
  addInputValues: 'Display current internal element value on `input`, `textarea`, and `select` fields. `<input>` becomes `<input value="\'whatever\'">`. **Requires passing in the VTU `wrapper`**, not `wrapper.html()`.',
  sortAttributes: 'Sorts the attributes inside HTML elements in the snapshot. This greatly reduces snapshot noise, making diffs easier to read.',
  stringifyAttributes: 'Injects the real values of dynamic attributes/props into the snapshot. `to="[object Object]"` becomes `to="{ name: \'home\' }"`. **Requires passing in the VTU `wrapper`**, not `wrapper.html()`.',
  removeServerRendered: 'Removes `data-server-rendered="true"` from your snapshots if true.',
  removeDataVId: 'Removes `data-v-1234abcd=""` from your snapshots if true. Useful if 3rd-party components use scoped styles to reduce snapshot noise when updating dependencies.',
  removeDataTest: 'Removes `data-test="whatever"` from your snapshots if true. To also remove these from your production builds, <a href="https://github.com/cogor/vite-plugin-vue-remove-attributes">see here</a>.',
  removeDataTestid: 'Removes `data-testid="whatever"` from your snapshots if true.',
  removeDataTestId: 'Removes `data-test-id="whatever"` from your snapshots if true.',
  removeDataQa: 'Removes `data-qa="whatever"` from your snapshots if true. `data-qa` is usually used by non-dev QA members. If they change in your snapshot, that indicates it may break someone else\'s E2E tests. So most using `data-qa` prefer they be left in by default.',
  removeDataCy: 'Removes `data-cy="whatever"` from your snapshots if true. `data-cy` is used by Cypress end-to-end tests. If they change in your snapshot, that indicates it may break an E2E test. So most using `data-cy` prefer they be left in by default.',
  removeDataPw: 'Removes `data-pw="whatever"` from your snapshots if true. `data-pw` is used by Playwright end-to-end tests. If they change in your snapshot, that indicates it may break an E2E test. So most using `data-pw` prefer they be left in by default.',
  removeIdTest: 'Removes `id="test-whatever"` or `id="testWhatever"` from snapshots. **Warning:** You should never use ID\'s for test tokens, as they can also be used by JS and CSS, making them more brittle and their intent less clear. Use `data-test-id` instead.',
  removeClassTest: 'Removes all CSS classes that start with "test", like `class="test-whatever"`. **Warning:** Don\'t use this approach. Use `data-test` instead. It is better suited for this because it doesn\'t conflate CSS and test tokens.',
  removeComments: 'Removes all HTML comments from your snapshots. This is false by default, as sometimes these comments can infer important information about how your DOM was rendered. However, this is mostly just personal preference.',
  clearInlineFunctions: 'Replaces `<div title="function () { return true; }"></div>` or `<div title="(x) => !x"></div>` with this placeholder `<div title="[function]"></div>`.',
  formatter: 'Function to use for formatting the markup output. See examples below. Accepts `\'none\'`, `\'diffable\'`, or a function. If using a custom function it will be handed a string of markup and must return a string (not a promise).',
  formatting: 'An object containing settings specific to the "diffable" formatter.',
  attributesPerLine: 'How many attributes are allowed on the same line as the starting tag.',
  emptyAttributes: 'Determines whether empty attributes will include `=""`. If `false` then `<span class="" id=""></span>` becomes `<span class id></span>`.',
  escapeInnerText: 'Retains or discards named HTML entity encodings, like `&lt;` instead of `<`.',
  selfClosingTag: 'Converts `<div></div>` to `<div />` or `<p class="x"></p>` to `<p class="x" />`. Does not affect void elements (like `<input>`), use the `voidElements` setting for them.',
  tagsWithWhitespacePreserved: 'Does not add returns and indentation to the inner content of these tags. Accepts an array of tags, like `[\'a\', \'pre\']`',
  voidElements: 'Determines how void elements are closed. Accepts `\'html\'` for `<input>`, `\'xhtml\'` for `<input />`, and `\'xml\'` for `<input></input>`.'
});

export const PLAYGROUND_EXAMPLE_CODE = unindent(`
  <div id="header" data-server-rendered>
    <!--v-if-->
    <label data-test="input" data-v-1ae75a9f="">
      Void and Attributes per line Example:
      <input>
      <input type="range">
      <input type="range" max="50">
      <input type="range" max="50" id="slider">
    </label>
    <p class="">Empty attribute example</p>
    <div></div>
    <ul><li><a href="#">Link text on same line</a></li></ul>
    <pre>
      <code>
        &lt;div class=&quot;active&quot;&gt;
          Escaped Text
        &lt;/div&gt;
      </code>
    </pre>
  </div>
`);
