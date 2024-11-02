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

export const TOP_LEVEL_API_DETAILS = [
  {
    setting: '<code>verbose</code>',
    default: '<code>true</code>',
    description: 'Logs to the console errors or other messages if true.'
  },
  {
    setting: '<code>attributesToClear</code>',
    default: '<code>[]</code>',
    description: 'Takes an array of attribute strings, like <code>[\'title\', \'id\']</code>, to remove the values from these attributes. <code>&lt;i title="9:04:55 AM" id="uuid_48a50d28cb453f94" class="current-time"&gt;&lt;/i&gt;</code> becomes <code>&lt;i title id class="current-time"&gt;&lt;/i&gt;</code>.'
  },
  {
    setting: '<code>addInputValues</code>',
    default: '<code>true</code>',
    description: 'Display current internal element value on <code>input</code>, <code>textarea</code>, and <code>select</code> fields. <code>&lt;input&gt;</code> becomes <code>&lt;input value="\'whatever\'"&gt;</code>. <strong>Requires passing in the VTU <code>wrapper</code></strong>, not <code>wrapper.html()</code>.'
  },
  {
    setting: '<code>sortAttributes</code>',
    default: '<code>true</code>',
    description: 'Sorts the attributes inside HTML elements in the snapshot. This greatly reduces snapshot noise, making diffs easier to read.'
  },
  {
    setting: '<code>stringifyAttributes</code>',
    default: '<code>true</code>',
    description: 'Injects the real values of dynamic attributes/props into the snapshot. <code>to="[object Object]"</code> becomes <code>to="{ name: \'home\' }"</code>. <strong>Requires passing in the VTU <code>wrapper</code></strong>, not <code>wrapper.html()</code>.'
  },
  {
    setting: '<code>removeServerRendered</code>',
    default: '<code>true</code>',
    description: 'Removes <code>data-server-rendered="true"</code> from your snapshots if true.'
  },
  {
    setting: '<code>removeDataVId</code>',
    default: '<code>true</code>',
    description: 'Removes <code>data-v-1234abcd=""</code> from your snapshots if true. Useful if 3rd-party components use scoped styles to reduce snapshot noise when updating dependencies.'
  },
  {
    setting: '<code>removeDataTest</code>',
    default: '<code>true</code>',
    description: 'Removes <code>data-test="whatever"</code> from your snapshots if true. To also remove these from your production builds, <a href="https://github.com/cogor/vite-plugin-vue-remove-attributes">see here</a>.'
  },
  {
    setting: '<code>removeDataTestid</code>',
    default: '<code>true</code>',
    description: 'Removes <code>data-testid="whatever"</code> from your snapshots if true.'
  },
  {
    setting: '<code>removeDataTestId</code>',
    default: '<code>true</code>',
    description: 'Removes <code>data-test-id="whatever"</code> from your snapshots if true.'
  },
  {
    setting: '<code>removeDataQa</code>',
    default: '<code>false</code>',
    description: 'Removes <code>data-qa="whatever"</code> from your snapshots if true. <code>data-qa</code> is usually used by non-dev QA members. If they change in your snapshot, that indicates it may break someone else\'s E2E tests. So most using <code>data-qa</code> prefer they be left in by default.'
  },
  {
    setting: '<code>removeDataCy</code>',
    default: '<code>false</code>',
    description: 'Removes <code>data-cy="whatever"</code> from your snapshots if true. <code>data-cy</code> is used by Cypress end-to-end tests. If they change in your snapshot, that indicates it may break an E2E test. So most using <code>data-cy</code> prefer they be left in by default.'
  },
  {
    setting: '<code>removeDataPw</code>',
    default: '<code>false</code>',
    description: 'Removes <code>data-pw="whatever"</code> from your snapshots if true. <code>data-pw</code> is used by Playwright end-to-end tests. If they change in your snapshot, that indicates it may break an E2E test. So most using <code>data-pw</code> prefer they be left in by default.'
  },
  {
    setting: '<code>removeIdTest</code>',
    default: '<code>false</code>',
    description: 'Removes <code>id="test-whatever"</code> or <code>id="testWhatever"</code> from snapshots. <strong>Warning:</strong> You should never use ID\'s for test tokens, as they can also be used by JS and CSS, making them more brittle and their intent less clear. Use <code>data-test-id</code> instead.'
  },
  {
    setting: '<code>removeClassTest</code>',
    default: '<code>false</code>',
    description: 'Removes all CSS classes that start with "test", like <code>class="test-whatever"</code>. <strong>Warning:</strong> Don\'t use this approach. Use <code>data-test</code> instead. It is better suited for this because it doesn\'t conflate CSS and test tokens.'
  },
  {
    setting: '<code>removeComments</code>',
    default: '<code>false</code>',
    description: 'Removes all HTML comments from your snapshots. This is false by default, as sometimes these comments can infer important information about how your DOM was rendered. However, this is mostly just personal preference.'
  },
  {
    setting: '<code>clearInlineFunctions</code>',
    default: '<code>false</code>',
    description: 'Replaces <code>&lt;div title="function () { return true; }">&lt;/div></code> or <code>&lt;div title="(x) => !x">&lt;/div></code> with this placeholder <code>&ltdiv title="[function]">&lt/div></code>.'
  },
  {
    setting: '<code>formatter</code>',
    default: '<code>\'diffable\'</code>',
    description: 'Function to use for formatting the markup output. See examples below. Accepts <code>\'none\'</code>, <code>\'diffable\'</code>, or a function. If using a custom function it will be handed a string of markup and must return a string (not a promise).'
  },
  {
    setting: '<code>formatting</code>',
    default: 'See table below',
    description: 'An object containing settings specific to the "diffable" formatter.'
  }
];

export const FORMATTING_API_DETAILS = [
  {
    setting: '<code>attributesPerLine</code>',
    default: '<code>1</code>',
    description: 'How many attributes are allowed on the same line as the starting tag.'
  },
  {
    setting: '<code>emptyAttributes</code>',
    default: '<code>true</code>',
    description: 'Determines whether empty attributes will include <code>=""</code>. If <code>false</code> then <code>&lt;span class="" id=""&gt;&lt;/span&gt;</code> becomes <code>&lt;span class id&gt;&lt;/span&gt;</code>.'
  },
  {
    setting: '<code>selfClosingTag</code>',
    default: '<code>false</code>',
    description: 'Converts <code>&lt;div&gt;&lt;/div&gt;</code> to <code>&lt;div /&gt;</code> or <code>&lt;p class="x"&gt;&lt;/p&gt;</code> to <code>&lt;p class="x" /&gt;</code>. Does not affect void elements (like <code>&lt;input&gt;</code>), use the <code>voidElements</code> setting for them.'
  },
  {
    setting: '<code>voidElements</code>',
    default: '<code>\'xhtml\'</code>',
    description: 'Determines how void elements are closed. Accepts <code>\'html\'</code> for <code>&lt;input&gt;</code>, <code>\'xhtml\'</code> for <code>&lt;input /&gt;</code>, and <code>\'closingTag\'</code> for <code>&lt;input&gt;&lt;/input&gt;</code>.'
  }
];

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
      selfClosingTag: false,
      voidElements: 'xhtml'
    }
  };
`);

export const GLOBAL_SETUP_EXAMPLE = unindent(`
  // /tests/setup.js
  global.beforeEach(() => {
    global.vueSnapshots = {
      // Your default settings for all snapshots
    };
  });
`);

export const SPECIFIC_TEST_EXAMPLE = unindent(`
  // /tests/components/MyComponent.test.js
  import { mount } from '@vue/test-utils';

  import MyComponent from '@/components/MyComponent.vue';

  describe('MyComponent', () => {
    test('My test', async () => {
      const wrapper = await mount(MyComponent);

      // Test-specific settings
      global.vueSnapshots.attributesToClear = ['data-uuid'];

      expect(wrapper)
        .toMatchSnapshot();
    });
  });
`);

export const VUE_MARKUP_FORMATTER_EXAMPLE = unindent(`
  import { vueMarkupFormatter } from 'vue3-snapshot-serializer';

  globalThis.vueSnapshots = {
    // Your settings
  };

  const formatted = vueMarkupFormatter('<div data-test="example">Text</div>');
  console.log(formatted);
  //\`<div>
  //  Text
  //</div>\`
`);
