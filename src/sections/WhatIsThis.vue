<template>
  <section>
    <div class="wrapper">
      <h2>
        Wait wait wait... what's a "Snapshot"?
        <a href="#wait-what">#</a>
      </h2>

      <p>
        Oh yeah, we should start here.
      </p>

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
        based on the component's inputs and state.
      </p>
    </div>
  </section>
</template>
<script>
export default {
  name: 'WhatIsThis'
};
</script>
