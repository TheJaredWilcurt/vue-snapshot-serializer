<template>
  <section
    v-if="!error"
    class="wrapper"
  >
    <h2>
      Code Contributors
      <a href="#contributors">#</a>
    </h2>
    <div
      v-if="contributors.length"
      class="contributors"
    >
      <span
        v-for="contributor in contributors"
        class="contributor"
        :title="totalContributions(contributor)"
        :key="contributor.id"
      >
        <a
          class="contributor-link"
          :href="contributor.href"
        >
          <img
            :alt="contributor.username"
            class="contributor-avatar"
            :src="contributor.avatar"
          />
        </a>
        <a
          class="contributor-name"
          :href="contributor.href"
        >
          {{ contributor.username }}
        </a>
        <span
          class="contributions-badge"
        >
          {{ contributor.contributions }}
        </span>
      </span>
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
    getData: async function (repo) {
      try {
        let data =  await fetch('https://api.github.com/repos/' + repo + '/contributors');
        data = await data.json();
        data = data
          .filter((contributor) => {
            return !contributor.login.startsWith('dependabot');
          });
        return data;
      } catch {
        this.error = true;
      }
    },
    getContributors: async function () {
      const newRepo = await this.getData('tjw-lint/vue3-snapshot-serializer');
      const website = await this.getData('TheJaredWilcurt/vue-snapshot-serializer');
      const oldRepo = await this.getData('tjw-lint/jest-serializer-vue-tjw');

      let contributors = [
        ...newRepo,
        ...website,
        ...oldRepo
      ];

      // Rename data from GitHub's API to something sane
      contributors = contributors.map((contributor) => {
        return {
          id: contributor.id,
          username: contributor.login,
          href: contributor.html_url,
          avatar: contributor.avatar_url,
          contributions: contributor.contributions
        };
      });

      // Consolidate data from all 3 network calls:
      const contributorMap = {};
      contributors.forEach((contributor) => {
        const name = contributor.username;
        if (!contributorMap[name]) {
          contributorMap[name] = contributor;
        } else {
          contributorMap[name].contributions = contributorMap[name].contributions + contributor.contributions;
        }
      });

      this.contributors = Object
        .values(contributorMap)
        .toSorted((a, b) => {
          a = a.contributions;
          b = b.contributions;
          return (a < b) ? 1 : (a > b) ? -1 : 0;
        });
    },
    totalContributions: function (contributor) {
      const contributions = contributor.contributions;
      if (contributions === 1) {
        return contributions + ' contribution';
      }
      return contributions + ' total contributions';
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
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 1.5rem;
}
.contributor-link {
  display: inline-block;
  border: 4px solid #11112F;
  border-radius: 50%;
  font-size: 0px;
}
.contributor-avatar {
  max-height: 72px;
  border-radius: 50%;
  transition: 0.5s ease transform;
}
.contributor-name {
  position: relative;
  top: -10px;
  left: calc(50% - 55px);
  display: block;
  width: 110px;
  background: #162C60;
  border-radius: 50px;
  padding: 3px 0px;
  text-align: center;
}

.contributor-name,
.contributor-name:active,
.contributor-name:hover,
.contributor-name:link,
.contributor-name:visited {
  color: #BEBCCA;
  text-decoration: none;
}

.contributions-badge,
.contributor-name {
  border: 3px solid #11112F;
  font-size: 0.77rem;
  text-rendering: optimizelegibility;
  cursor: default;
}

.contributions-badge {
  position: absolute;
  top: -8px;
  right: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: #9F9FDD;
  border-radius: 50%;
  color: #11112F;
  font-weight: 600;
}

@keyframes contributor-hover {
  0%,
  100% { transform: rotate(0deg); }
  33%  { transform: rotate(30deg); }
  66%  { transform: rotate(-30deg); }
}
.contributor-link:hover {
  animation: contributor-hover ease 1s;
  transition: 0.5s ease transform;
}
</style>
