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

  <hr id="quotes">
  <BlockQuotes />

  <hr id="wait-what">
  <WhatIsThis />

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

  <hr id="more-vue-projects" />

  <VueProjects :includeId="false" />

  <FooterSection />
</template>

<script>
import VueProjects from 'vue-projects/VpCards.vue';
import zenscroll from 'zenscroll';

import GitHubCorner from '@/components/GitHubCorner.vue';
import StubsDemo from '@/components/StubsDemo.vue';
import AdvancedUsage from '@/sections/AdvancedUsage.vue';
import ApiFeatures from '@/sections/ApiFeatures.vue';
import BlockQuotes from '@/sections/BlockQuotes.vue';
import FooterSection from '@/sections/FooterSection.vue';
import GettingStarted from '@/sections/GettingStarted.vue';
import GitHubContributors from '@/sections/GitHubContributors.vue';
import IntroSection from '@/sections/IntroSection.vue';
import PlayGround from '@/sections/PlayGround.vue';
import WhatIsThis from '@/sections/WhatIsThis.vue';

export default {
  name: 'App',
  components: {
    AdvancedUsage,
    ApiFeatures,
    BlockQuotes,
    FooterSection,
    GettingStarted,
    GitHubContributors,
    GitHubCorner,
    IntroSection,
    PlayGround,
    StubsDemo,
    VueProjects,
    WhatIsThis
  },
  created: function () {
    setTimeout(() => {
      zenscroll.setup();
    }, 0);
  }
};
</script>
