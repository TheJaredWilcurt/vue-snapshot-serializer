<template>
  <p style="text-align: center;">
    <img
      alt="Difference between the snapshot settings, my version makes the formatting cleaner and easier to see what actually changed in a failing snapshot"
      src="https://user-images.githubusercontent.com/4629794/96301398-22b20c80-0fc5-11eb-8d71-195f56b556e0.gif"
    />
  </p>

  <div>
    Diff comparison
    <DoxenCodeBox
      :code="OLD_DIFF"
      :copy="false"
    />
    <DoxenCodeBox
      :code="NEW_DIFF"
      :copy="false"
    />
  </div>
</template>

<script>
import { DoxenCodeBox } from 'vue-doxen';

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

export default {
  name: 'DiffCompare',
  components: {
    DoxenCodeBox
  },
  constants: {
    OLD_DIFF,
    NEW_DIFF
  }
};
</script>
