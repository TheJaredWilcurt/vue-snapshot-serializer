<template>
  <GitHubCorner />

  <nav>
    <div class="wrapper">
      <a href="#">Intro</a>
      <a href="#playground">Playground</a>
      <a href="#getting-started">Getting Started</a>
      <a href="#api">API/Features</a>
      <a href="#advanced">Advanced Usage</a>
    </div>
  </nav>

  <IntroSection />

  <hr id="playground">
  <PlayGround />

  <hr id="getting-started">
  <GettingStarted />

  <hr id="api">
  <ApiFeatures />

  <StubsDemo />

  <hr id="advanced">
  <AdvancedUsage />

  <hr id="contributors" />

  <GitHubContributors />

  <FooterSection />
</template>

<script>
import zenscroll from 'zenscroll';

import GitHubCorner from '@/components/GitHubCorner.vue';
import StubsDemo from '@/components/StubsDemo.vue';
import AdvancedUsage from '@/sections/AdvancedUsage.vue';
import ApiFeatures from '@/sections/ApiFeatures.vue';
import FooterSection from '@/sections/FooterSection.vue';
import GettingStarted from '@/sections/GettingStarted.vue';
import GitHubContributors from '@/sections/GitHubContributors.vue';
import IntroSection from '@/sections/IntroSection.vue';
import PlayGround from '@/sections/PlayGround.vue';

export default {
  name: 'App',
  components: {
    AdvancedUsage,
    ApiFeatures,
    FooterSection,
    GettingStarted,
    GitHubContributors,
    GitHubCorner,
    IntroSection,
    PlayGround,
    StubsDemo
  },
  created: function () {
    setTimeout(() => {
      zenscroll.setup();
    }, 0);
  }
};
</script>
