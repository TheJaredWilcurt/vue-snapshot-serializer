<template>
  <div class="wrapper">
    <h1>Vue 3 Snapshot Serializer</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <PlayGround />
  </div>
</template>

<script>
import PlayGround from '@/PlayGround.vue';

export default {
  name: 'App',
  components: {
    PlayGround
  },
  computed: {
    code: function () {
      return vueMarkupFormatter('<div class="active" id title="Active">Text</div>');
    }
  }
};
</script>

<style>
.wrapper {
  width: 100%;
  max-width: 900px;
  margin: 0px auto;
}
</style>
