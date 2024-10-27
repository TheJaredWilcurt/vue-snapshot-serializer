<template>
  <div class="playground">
    <aside class="playground-controls">
      <label>
        Font size ({{ fontSize }}%)
        <input v-model.number="fontSize" type="range" min="50" max="200">
      </label>
      <label>
        <input v-model="stacked" type="checkbox">
        Stacked
      </label>
      <label>
        Formatter:
        <select v-model="vueSnapshots.formatter">
          <option value="none">None</option>
          <option value="diffable">Diffable</option>
          <option value="custom">Custom Function</option>
        </select>
      </label>
      <template v-if="vueSnapshots.formatter === 'diffable'">
        <label>
          Void Elements:
          <select v-model="vueSnapshots.formatting.voidElements">
            <option value="html">&lt;input&gt;</option>
            <option value="xhtml">&lt;input /&gt;</option>
            <option value="closingTag">&lt;input&gt;&lt;/input&gt;</option>
          </select>
        </label>
        <label>
          <input v-model="vueSnapshots.formatting.emptyAttributes" type="checkbox">
          Show Empty Attributes
        </label>
        <label>
          <input v-model="vueSnapshots.formatting.selfClosingTag" type="checkbox">
          Non-Void Self Closing Tags
        </label>
        <label>
          Attributes Per Line:
          <input v-model.number="vueSnapshots.formatting.attributesPerLine" type="number" min="0">
        </label>
        <label>
          Preserve Whitespace in Tags:
          <select v-model="vueSnapshots.formatting.tagsWithWhitespacePreserved">
            <option :value="true">All tags</option>
            <option value="custom">Specific tags</option>
            <option :value="false">No tags</option>
          </select>
        </label>
        <label v-if="vueSnapshots.formatting.tagsWithWhitespacePreserved === 'custom'">
          Tags to preserve whitespace in:
          <input v-model="whitespaceTagsList" placeholder="Comma separate list">
        </label>
      </template>
    </aside>
    <main class="playground-content">
      <div
        class="playground-container"
        :class="{ 'playground-stacked': stacked }"
      >
        <textarea
          v-model="input"
          class="playground-box playground-box-input"
          :style="size"
          :rows="input.split('\n').length"
        ></textarea>
        <DoxenCodeBox
          class="playground-box playground-box-output"
          :code="output"
          :style="size"
          :styleTokens="{ codeBox: 'playground-output' }"
        />
      </div>
      <DoxenCodeBox
        :code="printableSettings"
        :style="size"
      />
    </main>
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
  tagsWithWhitespacePreserved: ['a', 'pre'],
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
      fontSize: 100,
      input: exampleCode,
      stacked: false,
      whitespaceTagsList: 'a, pre',
      vueSnapshots: {
        formatter: 'diffable',
        formatting: {
          attributesPerLine: 1,
          emptyAttributes: true,
          selfClosingTag: false,
          tagsWithWhitespacePreserved: 'custom',
          voidElements: 'xhtml'
        }
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
      const settings = { ...this.vueSnapshots.formatting };
      if (this.vueSnapshots.formatting.tagsWithWhitespacePreserved === 'custom') {
        settings.tagsWithWhitespacePreserved = this.whitespaceTags;
      }
      return settings;
    },
    printableSettings: function () {
      let snapshotSettings = {};
      if (this.vueSnapshots.formatter !== defaults.formatter) {
        snapshotSettings.formatter = this.vueSnapshots.formatter;
      }
      if (this.vueSnapshots.formatter === 'diffable') {
        function setFormattingObject () {
          snapshotSettings.formatting = snapshotSettings.formatting || {};
        }
        if (this.vueSnapshots.formatting.attributesPerLine !== defaults.attributesPerLine) {
          setFormattingObject();
          snapshotSettings.formatting.attributesPerLine = this.vueSnapshots.formatting.attributesPerLine || 0;
        }
        if (this.vueSnapshots.formatting.emptyAttributes !== defaults.emptyAttributes) {
          setFormattingObject();
          snapshotSettings.formatting.emptyAttributes = this.vueSnapshots.formatting.emptyAttributes;
        }
        if (this.vueSnapshots.formatting.selfClosingTag !== defaults.selfClosingTag) {
          setFormattingObject();
          snapshotSettings.formatting.selfClosingTag = this.vueSnapshots.formatting.selfClosingTag;
        }
        if (this.vueSnapshots.formatting.voidElements !== defaults.voidElements) {
          setFormattingObject();
          snapshotSettings.formatting.voidElements = this.vueSnapshots.formatting.voidElements;
        }
        if (typeof(this.vueSnapshots.formatting.tagsWithWhitespacePreserved) === 'boolean') {
          setFormattingObject();
          snapshotSettings.formatting.tagsWithWhitespacePreserved = this.vueSnapshots.formatting.tagsWithWhitespacePreserved;
        } else if (!this.whitespaceTags.length) {
          setFormattingObject();
          snapshotSettings.formatting.tagsWithWhitespacePreserved = false;
        } else if (
          this.whitespaceTags.length === 2 &&
          defaults.tagsWithWhitespacePreserved.includes(this.whitespaceTags[0]) &&
          defaults.tagsWithWhitespacePreserved.includes(this.whitespaceTags[1])
        ) {
          setFormattingObject();
          snapshotSettings.formatting.tagsWithWhitespacePreserved = this.whitespaceTags;
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
      snapshotSettings = '// Based on your settings (excluding those that match the defaults)\n' + snapshotSettings;
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
      if (this.vueSnapshots.formatter === 'diffable') {
        window.vueSnapshots = {
          formatter: 'diffable',
          formatting: {
            ...this.diffableOptions
          }
        };
        markup = vueMarkupFormatter(markup);
      }
      if (this.vueSnapshots.formatter === 'custom') {
        markup = markup.toUpperCase();
      }
      const language = 'html';
      return markup;
    }
  }
};
</script>

<style>
.playground {
  display: flex;
}
.playground-controls {
  display: flex;
  align-content: start;
  align-items: start;
  justify-content: start;
  flex-wrap: wrap;
  width: 300px;
}
.playground-controls label {
  margin: 10px 10px 0px 10px;
}
.playground-content {
  width: 100%;
}
.playground-content,
.playground-box {
  line-height: 1.38;
}
.playground-container {
  display: flex;
  flex-direction: row;
}
.playground-box {
  width: 50%;
}
.playground-box-input {
  padding: 0.5em;
}
.playground-stacked {
  flex-direction: column;
}
.playground-stacked .playground-box {
  width: 100%;
}
.playground-stacked textarea {
  min-height: 10em;
}
.playground-output {
  margin: 0px;
}
</style>
