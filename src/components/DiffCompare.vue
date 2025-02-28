<template>
  <div class="diff-compare">
    <div class="controls">
      <div>
        <button
          :data-applied-style-tokens="'tabButton ' + (!showNew ? 'tabButtonSelected' : '')"
          @click="autoPlay = false; showNew = false"
        >
          Default Snapshots
        </button>
        <button
          :data-applied-style-tokens="'tabButton ' + (showNew ? 'tabButtonSelected' : '')"
          @click="autoPlay = false; showNew = true"
        >
          Vue3-Snapshot-Serializer
        </button>
      </div>
      <DoxenCheckbox
        v-model="autoPlay"
        name="Auto-Play"
      />
    </div>
    <DiffOldNew :showNew="showNew" />
  </div>
</template>

<script>
import { DoxenCheckbox } from 'vue-doxen';

import DiffOldNew from '@/components/DiffOldNew.vue';

/*
const OLD_DIFF = `
* BaseTitle.vue > Renders Create New and Spinner

expect(value).toMatchSnapshot()

Received value does not match stored snapshot "BaseTitle.vue > Renders Create New and
Spinner"

- Snapshot
+ Received

 <div data-test="base-title">
-  <h3 class="inline-block">Create New and Spinner</h3> <span><i class="fa
fa-spinner fa-pulse fa-lg fa-fw"></i> <span class="sr-only">Page is
loading...</span></span><a><button type="button" class="pmr-btn ml-md primary"><i
class="fa fa-plus mr-sm"></i>
+  <h3 class="inline-block">Create New and Spinner</h3> <span><i class="fa
fa-spinner fa-pulse fa-lg fa-fw"></i> <span
class="sr-only">Loading...</span></span><a><button type="button" class="pmr-btn
ml-md primary"><i class="fa fa-plus mr-sm"></i>
     Create New
   </button></a>
   <!--v-if-->
                         </div>

64 |     expect(wrapper.find('[data-test="base-title"]'))
65 |       .toMatchSnapshot();
   |        ^
66 |   });
67 | });
68 |
`;
const NEW_DIFF = `
* BaseTitle.vue > Renders Create New and Spinner

expect(value).toMatchSnapshot()

Received value does not match stored snapshot "BaseTitle.vue > Renders Create New and
Spinner"

- Snapshot
+ Received

 <span>
   <i class="
     fa
     fa-fw
     fa-lg
     fa-pulse
     fa-spinner
   "></i>
   <span class="sr-only">
-    Page is loading...
+    Loading...
   </span>
 </span>

64 |     expect(wrapper.find('[data-test="base-title"]'))
65 |       .toMatchSnapshot();
   |        ^
66 |   });
67 | });
68 |
`;
*/

export default {
  name: 'DiffCompare',
  components: {
    DiffOldNew,
    DoxenCheckbox
  },
  data: function () {
    return {
      autoPlay: true,
      showNew: false
    };
  },
  methods: {
    initializeAutoPlay: function () {
      setInterval(() => {
        if (this.autoPlay) {
          this.showNew = !this.showNew;
        }
      }, 2000);
    }
  },
  created: function () {
    this.initializeAutoPlay();
  }
};
</script>

<style>
.diff-compare  {
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  [data-applied-style-tokens="tabButton "],
  [data-applied-style-tokens="tabButton tabButtonSelected"] {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
  }
  [data-applied-style-tokens="formFieldFieldset"] {
    display: flex;
    justify-content: end;
    border: 0px;
    margin: 0px;
    padding: 0px;
    text-align: right;
  }
  [data-applied-style-tokens="formFieldCheckboxNameLabel"] {
    margin-left: 0.5rem;
  }
  .hljs-comment {
    font-style: normal;
  }
}

@media (width < 505px) {
  [data-applied-style-tokens="formFieldFieldset"] {
    width: 100%;
  }
}
</style>
