<template>
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
import GitHubCircle from '@/components/GitHubCircle.vue';

export default {
  name: 'FooterSection',
  components: {
    GitHubCircle
  }
};
</script>
