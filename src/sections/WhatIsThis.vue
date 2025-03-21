<template>
  <section>
    <div class="wrapper">
      <h1>
        Wait wait wait... what's a "Snapshot"?
        <a href="#wait-what">#</a>
      </h1>

      <p>
        Oh yeah, we should start here. First off, do not confuse <strong>"snapshot
        testing"</strong> with <strong>"screenshot testing"</strong>.
      </p>

      <strong>TLDR:</strong>

      <ul>
        <li>
          <strong>Snapshot testing</strong> is when you store a chunk of the DOM as text
          in a formatted way to validate that all the HTML tags, attributes, and innerText
          match expectations. This is possible in Jest and Vitest via
          <code>expect(wrapper).toMatchSnapshot();</code> or
          <code>expect(wrapper).toMatchInlineSnapshot();</code>. Running your tests again
          will compare the test results to the stored snapshots with a per-character text diff.
        </li>
        <li>
          <strong>Screenshot testing</strong> (sometimes called "Visual Regression Testing")
          is where you run the code in an actual browser, then take a screenshot and save it in
          a lossless format like PNG. Future runs of the test will do a pixel-for-pixel
          comparison to the "known good" PNG.
          <ul>
            <li>
              <small>This sounds great in theory but unfortunately every computer is slightly
              different (browser, OS, font legibility settings, screen resolutions, HDPI, UI
              scaling, default fonts, anti-aliasing, etc.) so a screenshot taken on one machine
              will almost never match up pixel-for-pixel with one on another machine. The only
              way to get this approach to work is to have it handled entirely by your CI tool,
              which is dramatically more complex to set up than usual testing tooling. Or to
              pay a company like Chromatic to handle it for you, which works, but can get
              expensive and you will become vendor locked. Not great for something as
              tedious as testing.</small>
            </li>
          </ul>
        </li>
      </ul>

      <p>Here's an example of an inline snapshot:</p>

      <DoxenCodeBox
        :code="INLINE_SNAPSHOT_EXAMPLE"
        :copy="false"
      />

      <strong>Why?</strong>

      <p>
        When writing components, sometimes our logic lives in the <code>&lt;template&gt;</code>.
      </p>
      <ul>
        <li>Conditional rendering (<code>v-if</code>, <code>v-show</code>)</li>
        <li>Looped markup (<code>v-for</code>)</li>
        <li>Dynamic attributes/classes (<code>:class</code>)</li>
        <li>Dynamic text/markup (<code>v-html</code>, <code>v-text</code>, <code v-pre>{{ value }}</code>)</li>
        <li>Data-binding (<code>v-model</code>)</li>
        <li>Slots</li>
        <li>Child and third-party components</li>
        <li>etc.</li>
      </ul>

      <p>
        All of this dynamic stuff in the template means the DOM will look different
        based on the component's inputs and state. In many ways, the rendered DOM
        is the outcome of these inputs.
      </p>

      <p>
        Though you could write a bunch of tests validating every attribute on every DOM element,
        this is tedious, error-prone, and a pain to maintain. Fortunately, our tools (Jest/Vitest) provide
        us with a better alternative, <em>snapshots</em>.
      </p>

      <hr id="whats-a-serializer" />

      <h2>
        So what's a serializer for?
        <a href="#whats-a-serializer">#</a>
      </h2>

      <p>
        If a snapshot's goal is to capture the DOM to make sure nothing unintentionally changes,
        then a serializer's goal is to make that DOM snapshot easier to read and see the changes.
      </p>

      <p>
        A large chunk of DOM markup is proned to having a "signal-to-noise" problem. The serializer's
        job is to remove the noise, increasing the value a snapshot gives. We achieve this, by
        formatting the markup in a manner that works better with the testing tool's built in diffs.
        Here is an example of what snapshots look like by default, versus when using this library.
      </p>

      <DiffCompare />

      <p>
        In the above example, it looks like we changed some text. If this was unintended, we can
        go to the component and fix the bug. If that change was intentional then we can update
        the snapshot to match our new code. You can do this by hand, but Jest
        and Vitest both have a command you can use to do it automatically. Just run
        <code>vitest -u</code> or <code>jest -u</code>. The <code>-u</code> is short for
        <code>--update-snapshots</code>.
      </p>

      <p>
        There are tons of other features offered by <strong>Vue3-Snapshot-Serializer</strong>, like being able to stub out DOM nodes,
        removing testing tokens, adding in input values into snapshots, and more.
      </p>

      <p>
        I could spend a whole hour talking about all this stuff, and in fact, I did, on a podcast,
        <a
          v-text="'check it out'"
          href="https://topenddevs.com/podcasts/views-on-vue/episodes/vov-099-testing-in-vue-with-the-jared-wilcurt"
        ></a>.
      </p>
    </div>
  </section>
</template>

<script>
import { DoxenCodeBox } from 'vue-doxen';

import DiffCompare from '@/components/DiffCompare.vue';

const INLINE_SNAPSHOT_EXAMPLE = `
test('Home link is active', async () => {
  const wrapper = await mount(MyNavigation);
  const homeLink = wrapper.find('[data-test="home-link"]');

  expect(homeLink)
    .toMatchInlineSnapshot(\`
      <a
        aria-current
        class="active"
        href="/"
        title="Home"
      >
        Home
      </a>
    \`);
});
`.trim();

export default {
  name: 'WhatIsThis',
  components: {
    DiffCompare,
    DoxenCodeBox
  },
  constants: {
    INLINE_SNAPSHOT_EXAMPLE
  }
};
</script>
