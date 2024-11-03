<template>
  <section
    v-if="!error"
    class="wrapper"
  >
    <h2>
      GitHub Contributors
      <a href="#contributors">#</a>
    </h2>
    <div
      v-if="contributors.length"
      class="contributors"
    >
      <a
        v-for="contributor in contributors"
        class="contributor"
        :href="contributor.html_url"
        :title="contributor.login"
        :key="contributor.id"
      >
        <img
          :alt="contributor.login"
          class="contributor-avatar"
          :src="contributor.avatar_url"
        />
      </a>
    </div>
  </section>
</template>
<script>
export default {
  name: 'GitHubContributors',
  data: function () {
    return {
      contributors: [],
      error: false
    };
  },
  methods: {
    getContributors: function () {
      const url = 'https://api.github.com/repos/tjw-lint/vue3-snapshot-serializer/contributors';
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.contributors = data;
        })
        .catch((error) => {
          if (error) {
            this.error = true;
          }
        });
    }
  },
  created: function () {
    this.getContributors();
  }
};
</script>

<style>
.contributors {
  text-align: center;
}
.contributor {
  display: inline-block;
  border: 4px solid #11112F;
  border-radius: 50%;
  margin: 1rem;
  font-size: 0px;
}
.contributor-avatar {
  max-height: 72px;
  border-radius: 50%;
  transition: 0.5s ease transform;
}
@keyframes contributor-hover {
  0%,
  100% { transform: rotate(0deg); }
  33%  { transform: rotate(30deg); }
  66%  { transform: rotate(-30deg); }
}
.contributor:hover {
  animation: contributor-hover ease 1s;
  transition: 0.5s ease transform;
}
</style>
