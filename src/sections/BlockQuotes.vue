<template>
  <section>
    <div class="wrapper">
      <h2>
        Quotes
        <a href="#quotes">#</a>
      </h2>

      <blockquote>
        <q><em>This looks fantastic! This might sell me on testing.</em></q>
        <p style="text-align: right;">
          &nbsp;&nbsp;&ndash;
          <a
            v-text="'Views on Vue podcast (#99)'"
            href="https://topenddevs.com/podcasts/views-on-vue/episodes/vov-099-testing-in-vue-with-the-jared-wilcurt"
          ></a>
        </p>
      </blockquote>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BlockQuotes'
};
</script>
