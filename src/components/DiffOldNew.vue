<template>
  <div
    aria-label="Code example"
    data-applied-style-tokens="codeBoxContainer"
    data-style-tokens="codeBoxContainer"
    role="textbox"
    tabindex="0"
  >
    <pre
      data-applied-style-tokens="codeBox"
      data-style-tokens="codeBox"
    ><code class="hljs javascript" tabindex="0"><span class="hljs-string">● BaseTitle.vue &gt; Renders spinner while loading</span>

  expect(<span class="hljs-keyword">value</span>).toMatchSnapshot()

<span class="hljs-string">Received value</span> does not match <span class="hljs-comment">stored snapshot "BaseTitle.vue &gt; Renders spinner
while loading"</span>

<span class="hljs-comment">- Snapshot</span>
<span class="hljs-string">+ Received</span>
<span v-if="!showNew">
  &lt;div data-test="base-title"&gt;
<span class="hljs-comment">-   &lt;h3 class="inline-block"&gt;Create New and Spinner&lt;/h3&gt; &lt;span&gt;&lt;i class="fa
fa-spinner fa-pulse fa-lg fa-fw"&gt;&lt;/i&gt; &lt;span class="sr-only"&gt;Page is
loading...&lt;/span&gt;&lt;/span&gt;&lt;a&gt;&lt;button type="button" class="pmr-btn ml-md primary"&gt;&lt;i
class="fa fa-plus mr-sm"&gt;&lt;/i&gt;</span>
<span class="hljs-string">+   &lt;h3 class="inline-block"&gt;Create New and Spinner&lt;/h3&gt; &lt;span&gt;&lt;i class="fa
fa-spinner fa-pulse fa-lg fa-fw"&gt;&lt;/i&gt; &lt;span
class="sr-only"&gt;Loading...&lt;/span&gt;&lt;/span&gt;&lt;a&gt;&lt;button type="button" class="pmr-btn
ml-md primary"&gt;&lt;i class="fa fa-plus mr-sm"&gt;&lt;/i&gt;</span>
      Create New
     &lt;/button&gt;&lt;/a&gt;
    &lt;!--v-if--&gt;
                          &lt;/div&gt;
</span>
<span v-else>
  &lt;span&gt;
    &lt;i class="
      fa
      fa-fw
      fa-lg
      fa-pulse
      fa-spinner
    "&gt;&lt;/i&gt;
    &lt;span class="sr-only"&gt;
<span class="hljs-comment">-     Page is loading...</span>
<span class="hljs-string">+     Loading...</span>
    &lt;/span&gt;
  &lt;/span&gt;
</span>
<span class="hljs-number">64</span> |     expect(wrapper.find(<span class="hljs-keyword">'[data-test="base-title"]'</span>))
<span class="hljs-number">65</span> |       .toMatchSnapshot();
   |        <span class="hljs-string">^</span>
<span class="hljs-number">66</span> |   });
<span class="hljs-number">67</span> | });
<span class="hljs-number">68</span> |
</code></pre>
  </div>
</template>

<script>
export default {
  name: 'DiffOldNew',
  props: {
    showNew: {
      type: Boolean,
      default: false
    }
  }
};
</script>
