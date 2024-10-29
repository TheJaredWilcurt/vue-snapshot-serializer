<template>
  <GitHubCorner />

  <section class="wrapper">
    <h1>Vue 3 Snapshot Serializer</h1>

    <h2>...for Vitest and Jest.</h2>

    <p>This is the successor to <a href="https://github.com/tjw-lint/jest-serializer-vue-tjw">Jest-Serializer-Vue-TJW</a> (Vue 2, Jest, CJS).</p>

    <p>
      Provides the best snapshots possible for Vue components, with a simple API of powerful features and nuanced formatting control. <strong>Try the playground below</strong>.
    </p>
  </section>

  <hr>

  <LibraryUsage />

  <hr>

  <ApiFeatures />

  <hr>

  <PlayGround />

  <footer>
    <GitHubCircle />
    <div style="font-size: 125%">
      Made by <strong style="font-weight: 900;">The Jared Wilcurt</strong>
    </div>
    <em>
      in sunny Indianapolis, Indiana.
    </em>

    <div style="margin-top: 14px; font-size: 80%; line-height: 1.6;">
      MIT Licensed<br>
      &copy;2024
    </div>
  </footer>
</template>

<script>
import ApiFeatures from '@/ApiFeatures.vue';
import GitHubCircle from '@/GitHubCircle.vue';
import GitHubCorner from '@/GitHubCorner.vue';
import LibraryUsage from '@/LibraryUsage.vue';
import PlayGround from '@/PlayGround.vue';

export default {
  name: 'App',
  components: {
    ApiFeatures,
    GitHubCircle,
    GitHubCorner,
    LibraryUsage,
    PlayGround
  }
};
</script>
