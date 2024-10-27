<template>
  <div>
    <div class="controls" :style="size">
      <label>
        Font size ({{ fontSize }}%)
        <input v-model="fontSize" type="range" min="68" max="200">
      </label>
      <label>
        <input v-model="stacked" type="checkbox">
        Stacked
      </label>
      <label>
        Formatter:
        <select v-model="formatter">
          <option value="none">None</option>
          <option value="diffable">Diffable</option>
          <option value="custom">Custom Function</option>
        </select>
      </label>
      <template v-if="formatter === 'diffable'">
        <label>
          Void Elements:
          <select v-model="voidElements">
            <option value="html">&lt;input&gt;</option>
            <option value="xhtml">&lt;input /&gt;</option>
            <option value="closingTag">&lt;input&gt;&lt;/input&gt;</option>
          </select>
        </label>
        <label>
          <input v-model="emptyAttributes" type="checkbox">
          Show Empty Attributes
        </label>
        <label>
          <input v-model="selfClosingTag" type="checkbox">
          Non-Void Self Closing Tags
        </label>
        <label>
          Attributes Per Line:
          <input v-model.number="attributesPerLine" type="number" min="0">
        </label>
        <label>
          Preserve Whitespace in Tags:
          <select v-model="tagsWithWhitespacePreserved">
            <option :value="true">All tags</option>
            <option value="custom">Specific tags</option>
            <option :value="false">No tags</option>
          </select>
        </label>
        <label v-if="tagsWithWhitespacePreserved === 'custom'">
          Tags to preserve whitespace in:
          <input v-model="whitespaceTagsList" placeholder="Comma separate list">
        </label>
      </template>
    </div>
    <div class="container" :class="{ stacked }">
      <textarea
        v-model="input"
        :rows="input.split('\n').length"
        :style="size"
      ></textarea>
      <DoxenCodeBox
        :code="output"
        :style="size"
        :styleTokens="styleTokens"
      />
    </div>
    <DoxenCodeBox
      :code="printableSettings"
      :styleTokens="styleTokens"
    />
  </div>
</template>

<script>
import { DoxenCodeBox } from 'vue-doxen';
import { vueMarkupFormatter } from 'vue3-snapshot-serializer';

const defaults = {
  attributesPerLine: 1,
  emptyAttributes: true,
  formatter: 'diffable',
  selfClosingTag: false,
  voidElements: 'xhtml'
};

const exampleCode = `
<div id="header">
  <label>
    Void and Attributes per line Example:
    <input>
    <input type="range">
    <input type="range" max="50">
    <input type="range" max="50" id="slider">
  </label>
  <p class="">Empty attribute example</p>
  <div></div>
  <ul><li><a href="#">Link text on same line</a></li></ul>
</div>
`.trim();

export default {
  name: 'PlayGround',
  components: {
    DoxenCodeBox
  },
  data: function () {
    return {
      attributesPerLine: 1,
      emptyAttributes: true,
      formatter: 'diffable',
      fontSize: 100,
      input: exampleCode,
      selfClosingTag: false,
      stacked: false,
      tagsWithWhitespacePreserved: 'custom',
      whitespaceTagsList: 'a, pre',
      voidElements: 'xhtml',
      vueSnapshots: {
        // move settings into here
      }
    };
  },
  computed: {
    whitespaceTags: function () {
      return Array.from(new Set(this.whitespaceTagsList
        .split(',')
        .map((tag) => {
          return tag.trim();
        })
        .filter(Boolean)));
    },
    diffableOptions: function () {
      const settings = {
        attributesPerLine: this.attributesPerLine,
        emptyAttributes: this.emptyAttributes,
        selfClosingTag: this.selfClosingTag,
        tagsWithWhitespacePreserved: this.tagsWithWhitespacePreserved,
        voidElements: this.voidElements
      };
      if (this.tagsWithWhitespacePreserved === 'custom') {
        settings.tagsWithWhitespacePreserved = this.whitespaceTags;
      }
      return settings;
    },
    printableSettings: function () {
      let snapshotSettings = {};
      if (this.formatter !== defaults.formatter) {
        snapshotSettings.formatter = this.formatter;
      }
      if (this.formatter === 'diffable') {
        if (this.attributesPerLine !== defaults.attributesPerLine) {
          snapshotSettings.formatting = snapshotSettings.formatting || {};
          snapshotSettings.formatting.attributesPerLine = this.attributesPerLine || 0;
        }
        if (this.emptyAttributes !== defaults.emptyAttributes) {
          snapshotSettings.formatting = snapshotSettings.formatting || {};
          snapshotSettings.formatting.emptyAttributes = this.emptyAttributes;
        }
        if (this.selfClosingTag !== defaults.selfClosingTag) {
          snapshotSettings.formatting = snapshotSettings.formatting || {};
          snapshotSettings.formatting.selfClosingTag = this.selfClosingTag;
        }
        if (this.voidElements !== defaults.voidElements) {
          snapshotSettings.formatting = snapshotSettings.formatting || {};
          snapshotSettings.formatting.voidElements = this.voidElements;
        }
        if (typeof(this.tagsWithWhitespacePreserved) === 'boolean') {
          snapshotSettings.tagsWithWhitespacePreserved = this.tagsWithWhitespacePreserved;
        } else if (!this.whitespaceTags.length) {
          snapshotSettings.tagsWithWhitespacePreserved = false;
        } else if (
          !['["a","pre"]','["pre","a"]'].includes(JSON.stringify(this.whitespaceTags))
        ) {
          snapshotSettings.tagsWithWhitespacePreserved = this.whitespaceTags;
        }
      }
      snapshotSettings = JSON
        .stringify(snapshotSettings, null, 2)
        .split('\n')
        .map((line) => {
          if (line.includes(':')) {
            const [key, value] = line.split(':');
            return key.replaceAll('"', '') + ':' + value;
          }
          return line;
        })
        .join('\n')
        .replace(
          '"custom"',
          'function (markup) {\n    return markup.toUpperCase();\n  }'
        )
        .replaceAll('"', '\'');
      snapshotSettings = 'global.vueSnapshots = ' + snapshotSettings;
      snapshotSettings = '// Based on your above settings, excluding those that match the defaults\n' + snapshotSettings;
      return snapshotSettings;
    },
    size: function () {
      return 'font-size: ' + this.fontSize + '%';
    },
    styleTokens: function () {
      return {
        codeBoxContainer: '',
        codeBox: ''
      };
    },
    output: function () {
      let markup = this.input;
      if (this.formatter === 'diffable') {
        window.vueSnapshots = {
          formatter: 'diffable',
          formatting: {
            ...this.diffableOptions
          }
        };
        markup = vueMarkupFormatter(markup);
      }
      if (this.formatter === 'custom') {
        markup = markup.toUpperCase();
      }
      const language = 'html';
      return markup;
    }
  }
};
</script>

<style scoped>
label {
  margin: 0px 10px;
}

.controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.container {
  display: flex;
  flex-direction: row;
}
.container > * {
  width: 50%;
}
.stacked {
  flex-direction: column;
}
.stacked > * {
  width: 100%;
}
.stacked textarea {
  min-height: 10em;
}

.hljs {
  border-radius: 6px;
}
</style>
