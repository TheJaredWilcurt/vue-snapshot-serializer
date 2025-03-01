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

export const WRAPPER_TEST_VTU_EXAMPLE = unindent(`
  import { mount } from '@vue/test-utils';

  import MyComponent from '@/components/MyComponent.vue';

  test('My test', async () => {
    const wrapper = await mount(MyComponent);
    const button = wrapper.find('[data-test="myButton"]');

    // GOOD
    expect(wrapper)
      .toMatchSnapshot();

    // GOOD
    expect(button)
      .toMatchSnapshot();

    // BAD
    expect(wrapper.html())
      .toMatchSnapshot();

    // BAD
    expect(button.html())
      .toMatchSnapshot();
  });
`);

export const WRAPPER_TEST_TLV_EXAMPLE = unindent(`
  import { render } from '@testing-library/vue';

  import MyComponent from '@/components/MyComponent.vue';

  test('My test', async () => {
    const wrapper = await render(MyComponent);
    const button = wrapper.container.querySelector('[data-test="myButton"]');

    // GOOD
    expect(wrapper)
      .toMatchSnapshot();

    // GOOD
    expect(button)
      .toMatchSnapshot();

    // BAD
    expect(wrapper.html())
      .toMatchSnapshot();

    // BAD
    expect(button.html())
      .toMatchSnapshot();
  });
`);

export const TOP_LEVEL_API_DETAILS = Object.freeze([
  {
    setting: '<code>verbose</code>',
    default: '<code class="hljs-literal">true</code>',
    description: 'Logs to the console errors or other messages if true.'
  },
  {
    setting: '<code>debug</code>',
    default: '<code class="hljs-literal">false</code>',
    description: 'Logs to the console as internal functions are called, including relevant data to help in troubleshooting.'
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
      '<strong>Requires passing in a component <code class="hljs hljs-attr">wrapper</code></strong>,',
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
    setting: '<code>sortClasses</code>',
    default: '<code class="hljs-literal">true</code>',
    description: 'Sorts the classes inside the <span class="hljs-attr">class</span> attribute on all HTML elements in the snapshot. This reduces snapshot noise, making diffs easier to read.'
  },
  {
    setting: '<code>stringifyAttributes</code>',
    default: '<code class="hljs-literal">true</code>',
    description: [
      'Injects the real values of dynamic attributes/props into the snapshot.',
      '<code class="hljs"><span class="hljs-tag"><span class="hljs-attr">to</span>=<span class="hljs-string">"[object Object]"</span></span></code>',
      'becomes',
      '<code class="hljs"><span class="hljs-tag"><span class="hljs-attr">to</span>=<span class="hljs-string">"{ name: \'home\' }"</span></span></code>.',
      '<strong>Requires passing in a component <code class="hljs hljs-attr">wrapper</code></strong>, not',
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
    setting: '<code>stubs</code>',
    default: '<code class="hljs-literal">{}</code>',
    description: [
      'Allows targeting specific DOM nodes in the snapshot to optionally replace their tag name and/or remove attributes and/or innerHTML.',
      'See the <a href="#stubs">Stubs section</a> below for more information and a live demo.'
    ].join(' ')
  },
  {
    setting: '<code>postProcessor</code>',
    default: '<code>undefined</code>',
    description: 'This is a custom function you can pass in. It will be handed a string of markup and must return a string (not a promise). It runs right after the formatter.'
  },
  {
    setting: '<code>formatter</code>',
    default: '<code class="hljs-string">\'diffable\'</code>',
    description: [
      'Function to use for formatting the markup output.',
      'See examples below. Accepts',
      '<code class="hljs hljs-string">\'none\'</code>,',
      '<code class="hljs hljs-string">\'diffable\'</code>,',
      'and',
      '<code class="hljs hljs-string">\'classic\'</code>.'
    ].join(' ')
  },
  {
    setting: '<code>formatting</code>',
    default: 'See table below',
    description: 'An object containing settings specific to the "diffable" formatter.'
  },
  {
    setting: '<code>classicFormatting</code>',
    default: 'See table below',
    description: 'An object containing settings specific to the "classic" formatter. Exists to help migrate from <code>jest-serializer-vue-tjw</code>.'
  }
]);

export const FORMATTING_API_DETAILS = Object.freeze([
  {
    setting: '<code>attributesPerLine</code>',
    default: '<code class="hljs-number">1</code>',
    description: 'How many attributes are allowed on the same line as the starting tag.'
  },
  {
    setting: '<code>classesPerLine</code>',
    default: '<code class="hljs-number">1</code>',
    description: 'How many classes are allowed on the same line as the <span class="hljs-attr">class</span> attribute.'
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
    setting: '<code>escapeAttributes</code>',
    default: '<code class="hljs-literal">false</code>',
    description: [
      'Retains (if',
      '<code class="hljs hljs-literal">true</code>)',
      'or discards (if',
      '<code class="hljs hljs-literal">false</code>)',
      'named HTML entity encodings, like',
      '<code class="hljs hljs-string">&amp;lt;</code>',
      'instead of',
      '<code class="hljs hljs-string"><</code>',
      'in HTML attributes.'
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
      '<code class="hljs hljs-string"><</code>',
      'in HTML text nodes.'
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

export const CLASSIC_FORMATTING_DEFAULTS = unindent(`
  globalThis.vueSnapshots.classicFormatting = {
    indent_char: ' ',
    indent_inner_html: true,
    indent_size: 2,
    inline: [],
    sep: '\\n',
    unformatted: ['code', 'pre']
  };
`);

export const ALL_SETTINGS_OBJECT = unindent(`
  global.vueSnapshots = {
    verbose: true,
    debug: false,
    attributesToClear: [],
    addInputValues: true,
    sortAttributes: true,
    sortClasses: true,
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
    stubs: {},
    postProcessor: function (markup) {
      // Your custom code goes here
      return markup;
    },
    formatter: 'diffable',
    formatting: {
      attributesPerLine: 1,
      classesPerLine: 1,
      emptyAttributes: true,
      escapeAttributes: false,
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

export const DEBUG_EXAMPLE = unindent(`
  global.beforeEach(() => {
    global.vueSnapshots = {
      debug: true
    };
  });
`);

export const SPECIFIC_TEST_VTU_EXAMPLE = unindent(`
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

export const SPECIFIC_TEST_TLV_EXAMPLE = unindent(`
  // /tests/components/MyComponent.test.js
  import { render } from '@testing-library/vue';

  import MyComponent from '@/components/MyComponent.vue';

  describe('MyComponent', () => {
    test('My test', async () => {
      const wrapper = await render(MyComponent);

      // Test-specific settings that override the defaults in setup.js
      global.vueSnapshots.attributesToClear = ['data-uuid'];

      expect(wrapper)
        .toMatchSnapshot();
    });
  });
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

export const TYPES_IMPORT_EXAMPLE = unindent(`
  /** @typedef {import('vue3-snapshot-serializer/types').SETTINGS} SETTINGS */

  global.beforeEach(() => {
    /** @type {SETTINGS} */
    const settings = {
      // Your settings
    };
    globalThis.vueSnapshots = settings;
  });
`);

export const API_DESCRIPTIONS = Object.freeze({
  fontSize: 'Adjusts the font size of the playground input/output boxes.',
  heightSize: 'Adjusts the height offset of the playground input/output boxes.',
  stacked: 'Changes the layout of the input/output boxes.',
  verbose: 'Logs to the console errors or other messages if true.',
  debug: 'Logs to the console as internal functions are called, including relevant data to help in troubleshooting.',
  attributesToClear: 'Takes an array of attribute strings, like `[\'title\', \'id\']`, to remove the values from these attributes. `<i title="9:04:55 AM" id="uuid_48a50d28cb453f94" class="current-time"></i>` becomes `<i title id class="current-time"></i>`.',
  addInputValues: 'Display current internal element value on `input`, `textarea`, and `select` fields. `<input>` becomes `<input value="\'whatever\'">`. **Requires passing in a component `wrapper`**, not `wrapper.html()`.',
  sortAttributes: 'Sorts the attributes inside HTML elements in the snapshot. This greatly reduces snapshot noise, making diffs easier to read.',
  sortClasses: 'Sorts the classes inside the `class` attribute on all HTML elements in the snapshot. This greatly reduces snapshot noise, making diffs easier to read.',
  stringifyAttributes: 'Injects the real values of dynamic attributes/props into the snapshot. `to="[object Object]"` becomes `to="{ name: \'home\' }"`. **Requires passing in a component `wrapper`**, not `wrapper.html()`.',
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
  stubs: 'Allows targeting specific DOM nodes in the snapshot to optionally replace their tag name and/or remove attributes and/or innerHTML.',
  postProcessor: 'This is a custom function you can pass in. It will be handed a string of markup and must return a string (not a promise). It runs right after the formatter.',
  formatter: 'Function to use for formatting the markup output. See examples below. Accepts `\'none\'`, `\'diffable\'`, or \'classic\'.',
  formatting: 'An object containing settings specific to the "diffable" formatter.',
  classicFormatting: 'An object containing settings specific to the "classic" formatter.',
  attributesPerLine: 'How many attributes are allowed on the same line as the starting tag.',
  classesPerLine: 'How many classes are allowed on the same line as the `class` attribute.',
  emptyAttributes: 'Determines whether empty attributes will include `=""`. If `false` then `<span class="" id=""></span>` becomes `<span class id></span>`.',
  escapeAttributes: 'Retains or discards named HTML entity encodings, like `&lt;` instead of `<` in HTML attributes.',
  escapeInnerText: 'Retains or discards named HTML entity encodings, like `&lt;` instead of `<` in HTML text nodes.',
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
    <div></div>
    <ul><li><a href="#?a=1&amp;b=2">Link text on same line</a></li></ul>
    <pre><code>
      &lt;div class=&quot;active&quot;&gt;
        Escaped Text
      &lt;/div&gt;
    </code></pre>
    <p class="">Empty attribute example</p>
    <button class="bg-blue-500" disabled>
      1 class
    </button>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled>
      9 classes
    </button>
  </div>
`);

export const EXAMPLE_COMPONENT_TEMPLATE = unindent(`
  <template>
    <div>
      <label>
        <input
          v-model="toggle"
          data-test="toggle"
          type="checkbox"
        />
        Example Component
      </label>
      <p>
        <label for="example-component-textarea">Textarea example:</label>
        <br>
        <textarea
          v-model="content"
          id="example-component-textarea"
          data-test="content"
          :title="{ stringifyAttributes: 'example' }"
        ></textarea>
      </p>
    </div>
  </template>
`);
