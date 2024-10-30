<template>
  <GitHubCorner />

  <nav>
    <div class="wrapper">
      <a href="#">Intro</a>
      <a href="#playground">Playground</a>
      <a href="#getting-started">Getting Started</a>
      <a href="#api">API/Features</a>
    </div>
  </nav>

  <IntroSection />

  <hr id="playground">
  <PlayGround />

  <hr id="getting-started">
  <GettingStarted />

  <hr id="api">
  <ApiFeatures />

  <FooterSection />
</template>

<script>
import GitHubCorner from '@/components/GitHubCorner.vue';
import ApiFeatures from '@/sections/ApiFeatures.vue';
import FooterSection from '@/sections/FooterSection.vue';
import GettingStarted from '@/sections/GettingStarted.vue';
import IntroSection from '@/sections/IntroSection.vue';
import PlayGround from '@/sections/PlayGround.vue';

export default {
  name: 'App',
  components: {
    ApiFeatures,
    FooterSection,
    GitHubCorner,
    IntroSection,
    GettingStarted,
    PlayGround
  }
};
</script>
