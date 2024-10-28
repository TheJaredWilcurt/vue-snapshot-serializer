export const GLOBAL_BEFORE_EACH_EXAMPLE = `
// /tests/unit/setup.js
global.beforeEach(() => {
  global.vueSnapshots = {
    // Your settings
  };
});
`.trim();

export const JEST_CONFIG_EXAMPLE = `
{
  "jest": {
    "snapshotSerializers": [
      "./node_modules/vue3-snapshot-serializer/index.js"
    ]
  }
}
`.trim();

export const VITEST_CONFIG_EXAMPLE = `
import { defineConfig } from 'vite'; // or 'vitest'

export default defineConfig({
  test: {
    snapshotSerializers: [
      './node_modules/vue3-snapshot-serializer/index.js'
    ]
  }
});
`.trim();

export const WRAPPER_TEST_EXAMPLE = `
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
`.trim();
