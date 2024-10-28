<template>
  <section class="wrapper">
    <h2>API/Features</h2>

    <p>
      <code>global.vueSnapshots</code> options:
    </p>

    <table>
      <thead>
        <tr>
          <th>Setting</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(feature, featureIndex) in TOP_LEVEL_API_DETAILS"
          :key="'feature' + featureIndex"
        >
          <td
            v-html="feature.setting"
            data-title="Setting:"
          ></td>
          <td
            v-html="feature.default"
            data-title="Default:"
          ></td>
          <td
            v-html="feature.description"
            data-title="Description:"
          ></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
const TOP_LEVEL_API_DETAILS = [
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
    description: 'Display current internal element value on <code>input</code>, <code>textarea</code>, and <code>select</code> fields. <code>&lt;input&gt;</code> becomes <code>&lt;input value="\'whatever\'"&gt;</code>. <strong>Requires passing in the VTU wrapper</strong>, not <code>wrapper.html()</code>.'
  },
  {
    setting: '<code>sortAttributes</code>',
    default: '<code>true</code>',
    description: 'Sorts the attributes inside HTML elements in the snapshot. This greatly reduces snapshot noise, making diffs easier to read.'
  },
  {
    setting: '<code>stringifyAttributes</code>',
    default: '<code>true</code>',
    description: 'Injects the real values of dynamic attributes/props into the snapshot. <code>to="[object Object]"</code> becomes <code>to="{ name: \'home\' }"</code>. <strong>Requires passing in the VTU wrapper</strong>, not <code>wrapper.html()</code>.'
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
    description: 'Replaces <code>&lt;div title="function () { return true; }">&lt;/div></code> or this <code>&lt;div title="(x) => !x">&lt;/div></code> with this placeholder <code>&ltdiv title="[function]">&lt/div></code>.'
  },
  {
    setting: '<code>formatter</code>',
    default: '<code>\'diffable\'</code>',
    description: 'Function to use for formatting the markup output. See examples below. Accepts <code>\'none\'</code>, <code>\'diffable\'</code>, or a function.'
  },
  {
    setting: '<code>formatting</code>',
    default: 'See below',
    description: 'An object containing settings specific to the diffable formatter.'
  }
];

export default {
  name: 'ApiFeatures',
  constants: {
    TOP_LEVEL_API_DETAILS
  }
};
</script>
