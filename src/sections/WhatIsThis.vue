<template>
  <section>
    <div class="wrapper">
      <h1>
        Wait wait wait... what's a "Snapshot"?
        <a href="#wait-what">#</a>
      </h1>

      <p>
        Oh yeah, we should start here. First off, do not confuse "snapshot" testing with
        "screenshot" testing.
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
          <strong>Screenshot testing</strong> is where you run the code in an actual browser,
          then take a screenshot and save it in a lossless format like PNG. Future runs of
          the test will do a pixel-for-pixel comparison to the "known good" PNG.
          <ul>
            <li>
              <small>This sounds great in theory but unfortunately every computer is slightly
              different (browser, OS, font legibility settings, screen resolutions, HDPI, UI
              scaling, default fonts, anti-aliasing, etc) so a screenshot taken on one machine
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

      <strong>Why?</strong>

      <p>
        When writing components, sometimes our logic lives in the <code>&lt;template&gt;</code>.
      </p>
      <ul>
        <li>Conditional rendering (<code>v-if</code>/<code>v-show</code>)</li>
        <li>Looped markup (<code>v-for</code>)</li>
        <li>Dynamic attributes/classes (<code>:class</code>)</li>
        <li>Dynamic text/markup (<code v-pre>{{ value }}</code>)</li>
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
        this is tedious, error-prone, and a pain to maintain. So our tools (Jest/Vitest) provide
        us with a better alternative, <em>snapshots</em>.
      </p>

      <p>
        By default, a DOM snapshot will just be a raw output of the virtual DOM converted to a
        string of HTML. This isn't super useful or fun to read. So we pass it through a
        "serializer" to help clean it up. I could spend a whole hour talking about
        all this stuff, and infact, I did, on a podcast, check it out:
      </p>

      <blockquote>
        <big><big><big><q><em>This looks fantastic! This might sell me on testing.</em></q></big></big></big>
        <p>
          &nbsp;&nbsp;&mdash;
          <a
            v-text="'Views on Vue podcast (#99)'"
            href="https://topenddevs.com/podcasts/views-on-vue/episodes/vov-099-testing-in-vue-with-the-jared-wilcurt"
          ></a>
        </p>
      </blockquote>

      <img
        alt="Difference between the snapshot settings, my version makes the formatting cleaner and easier to see what actually changed in a failing snapshot"
        src="https://user-images.githubusercontent.com/4629794/96301398-22b20c80-0fc5-11eb-8d71-195f56b556e0.gif"
      >

    </div>
  </section>
</template>
<script>
export default {
  name: 'WhatIsThis'
};
</script>
