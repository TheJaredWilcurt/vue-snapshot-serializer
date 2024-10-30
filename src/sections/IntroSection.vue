<template>
  <section class="wrapper">
    <h1 class="title">Vue 3 Snapshot Serializer</h1>

    <h2 class="subtitle">for <strong>Vitest</strong> &amp; <strong>Jest</strong></h2>

    <p class="explainer">
      This library provides the <strong>best snapshots possible</strong> for Vue components.<br>
      It is the official successor to <a href="https://github.com/tjw-lint/jest-serializer-vue-tjw">Jest-Serializer-Vue-TJW</a> (Vue 2, Jest, CJS).
    </p>

    <h3 class="punches">Simple API.</h3>
    <h3 class="punches">Powerful features.</h3>
    <h3 class="punches">Nuanced formatting control.</h3>
  </section>
</template>

<script>
export default {
  name: 'IntroSection'
};
</script>

<style>
.title {
  margin-top: 6rem;
  margin-bottom: 2rem;
  font-family: Lora, Superclarendon, 'Bookman Old Style', 'Georgia Pro', Georgia, serif;
  font-size: 4.76rem;
  font-style: italic;
  font-weight: 625;
  text-align: center;
}
.subtitle,
.punches {
  margin-top: 0rem;
  font-family: Superclarendon, 'Bookman Old Style', 'Georgia Pro', Georgia, serif;
  font-size: 2rem;
  font-style: italic;
  font-weight: normal;
  text-align: center;
}
.punches {
  font-size: 1.75rem;
}
.explainer {
  margin: 7rem 0rem;
  font-size: 1.5rem;
  line-height: 1.5;
  text-align: center;
}
.explainer strong {
  font-weight: 900;
}
</style>
