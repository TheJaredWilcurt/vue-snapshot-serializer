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
            href="https://www.youtube.com/watch?v=BCo6xL79RP8&t=420s"
          ></a>
        </p>
      </blockquote>

    
      <blockquote>
        <q><em>You can instantly see exactly what changed, and it's so much nicer. I don't think I would use snapshots without this serializer.</em></q>
        <p style="text-align: right;">
          &nbsp;&nbsp;&ndash;
          <a
            v-text="'Michael Thiessen, DejaVue Podcast (#56)'"
            href="https://www.youtube.com/watch?v=wb_K0s0YO7Y&t=59m59s"
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
