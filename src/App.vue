<template>
  <section class="wrapper">
    <h1>Vue 3 Snapshot Serializer</h1>

    <h2>Vue 3 Snapshot Serialization for Vitest and Jest.</h2>

    <p>This is the successor to <a href="https://github.com/tjw-lint/jest-serializer-vue-tjw">jest-serializer-vue-tjw</a> (Vue 2, Jest, CJS).</p>

    <p>
      Provides far better snapshots for Vue components, with a simple API to have nuanced control of the formatting, and many convient features. Try the playground below.
    </p>
  </section>

  <LibraryUsage />
  <PlayGround />
</template>

<script>
import LibraryUsage from '@/LibraryUsage.vue';
import PlayGround from '@/PlayGround.vue';

export default {
  name: 'App',
  components: {
    LibraryUsage,
    PlayGround
  }
};
</script>
