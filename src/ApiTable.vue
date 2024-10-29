<template>
  <table>
    <thead>
      <tr>
        <th>Setting</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(feature, featureIndex) in features"
        :key="'feature' + featureIndex"
      >
        <td
          v-html="feature.setting"
          data-title="Setting:"
        ></td>
        <td
          v-html="feature.default"
          data-title="Default:"
        ></td>
        <td
          v-html="feature.description"
          data-title="Description:"
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ApiTable',
  props: {
    features: {
      type: Array,
      required: true
    }
  }
};
</script>
