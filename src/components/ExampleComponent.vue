<template>
  <div>
    <label>
      <input
        v-model="on"
        data-test="toggle"
        type="checkbox"
        @input="$emit('toggle')"
      />
      Example Component
    </label>
    <p>
      <label for="example-component-textarea">Textarea example:</label>
      <br>
      <textarea
        v-model="content"
        id="example-component-textarea"
        data-test="content"
        :title="{ stringifyAttributes: 'example' }"
        @input="$emit('content', content)"
      ></textarea>
    </p>
  </div>
</template>
<script>
export default {
  name: 'ExampleComponent',
  data: function () {
    return {
      content: '',
      on: true
    };
  }
};
</script>
