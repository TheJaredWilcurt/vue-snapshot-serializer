<template>
  <section>
    <div class="wrapper">
      <h2>Try it out</h2>
    </div>
    <div class="playground">
      <aside class="playground-controls">
        <fieldset>
          <label>
            Font size ({{ fontSize }}%)
            <input v-model.number="fontSize" type="range" min="50" max="200">
          </label>
        </fieldset>
        <DoxenCheckbox
          v-model="stacked"
          name="Stacked"
        />
        <DoxenCheckbox
          v-for="(value, key) in TOP_LEVEL_BOOLEANS"
          v-model="vueSnapshots[key]"
          :name="value"
        />
        <p><strong>*</strong> Requires a Vue-Test-Utils wrapper, not HTML string.</p>
        <fieldset>
          <label>
            Attributes to clear:
            <input v-model="vueSnapshots.attributesToClear" placeholder="Comma separated list of attributes">
          </label>
        </fieldset>
        <fieldset>
          <label>
            Formatter:
            <select v-model="vueSnapshots.formatter">
              <option value="none">None</option>
              <option value="diffable">Diffable</option>
              <option value="custom">Custom Function</option>
            </select>
          </label>
        </fieldset>
        <template v-if="vueSnapshots.formatter === 'diffable'">
          <fieldset>
            <label>
              Void Elements:
              <select v-model="vueSnapshots.formatting.voidElements">
                <option value="html">&lt;input&gt;</option>
                <option value="xhtml">&lt;input /&gt;</option>
                <option value="closingTag">&lt;input&gt;&lt;/input&gt;</option>
              </select>
            </label>
          </fieldset>
          <DoxenCheckbox
            v-model="vueSnapshots.formatting.emptyAttributes"
            name="Show Empty Attributes"
          />
          <DoxenCheckbox
            v-model="vueSnapshots.formatting.selfClosingTag"
            name="Non-Void Self Closing Tags"
          />
          <fieldset>
            <label>
              Attributes Per Line:
              <input v-model.number="vueSnapshots.formatting.attributesPerLine" type="number" min="0">
            </label>
          </fieldset>
          <fieldset>
            <label>
              Preserve Whitespace in Tags:
              <select v-model="vueSnapshots.formatting.tagsWithWhitespacePreserved">
                <option :value="true">All tags</option>
                <option value="custom">Specific tags</option>
                <option :value="false">No tags</option>
              </select>
            </label>
          </fieldset>
          <fieldset>
            <label v-if="vueSnapshots.formatting.tagsWithWhitespacePreserved === 'custom'">
              Tags to preserve whitespace in:
              <input v-model="whitespaceTagsList" placeholder="Comma separated list of tags">
            </label>
          </fieldset>
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
  </section>
</template>

<script>
import _xor from 'lodash.xor';
import {
  DoxenCheckbox,
  DoxenCodeBox
} from 'vue-doxen';
import { vueMarkupFormatter } from 'vue3-snapshot-serializer';

const exampleCode = `
<div id="header" data-server-rendered>
  <!--v-if-->
  <label data-test="input" data-v-1ae75a9f="">
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

const defaults = Object.freeze({
  addInputValues: true,
  attributesPerLine: 1,
  attributesToClear: [],
  clearInlineFunctions: false,
  emptyAttributes: true,
  formatter: 'diffable',
  removeComments: false,
  removeServerRendered: true,
  removeDataVId: true,
  removeDataTest: true,
  removeDataTestid: true,
  removeDataTestId: true,
  removeDataQa: false,
  removeDataCy: false,
  removeDataPw: false,
  removeIdTest: false,
  removeClassTest: false,
  selfClosingTag: false,
  sortAttributes: true,
  stringifyAttributes: true,
  tagsWithWhitespacePreserved: ['a', 'pre'],
  verbose: true,
  voidElements: 'xhtml'
});

export default {
  name: 'PlayGround',
  components: {
    DoxenCheckbox,
    DoxenCodeBox
  },
  constants: {
    TOP_LEVEL_BOOLEANS: {
      verbose: 'Verbose',
      removeServerRendered: 'Remove data-server-rendered',
      removeComments: 'Remove Comments',
      removeDataVId: 'Remove data-v-...',
      removeDataTest: 'Remove data-test',
      removeDataTestid: 'Remove data-testid',
      removeDataTestId: 'Remove data-test-id',
      removeDataQa: 'Remove data-qa',
      removeDataCy: 'Remove data-cy',
      removeDataPw: 'Remove data-pw',
      removeIdTest: 'Remove id="test..."',
      removeClassTest: 'Remove class="test..."',
      clearInlineFunctions: 'Clear inline functions',
      sortAttributes: 'Sort Attributes',
      addInputValues: 'Add Input Values*',
      stringifyAttributes: 'Stringify Attributes*'
    }
  },
  data: function () {
    return {
      fontSize: 100,
      input: exampleCode,
      stacked: false,
      whitespaceTagsList: 'a, pre',
      vueSnapshots: {
        addInputValues: defaults.addInputValues,
        attributesToClear: '',
        stringifyAttributes: defaults.stringifyAttributes,
        clearInlineFunctions: defaults.clearInlineFunctions,
        formatter: defaults.formatter,
        removeClassTest: defaults.removeClassTest,
        removeComments: defaults.removeComments,
        removeDataCy: defaults.removeDataCy,
        removeDataPw: defaults.removeDataPw,
        removeDataQa: defaults.removeDataQa,
        removeDataTest: defaults.removeDataTest,
        removeDataTestid: defaults.removeDataTestid,
        removeDataTestId: defaults.removeDataTestId,
        removeDataVId: defaults.removeDataVId,
        removeIdTest: defaults.removeIdTest,
        removeServerRendered: defaults.removeServerRendered,
        sortAttributes: defaults.sortAttributes,
        verbose: defaults.verbose,
        formatting: {
          attributesPerLine: defaults.attributesPerLine,
          emptyAttributes: defaults.emptyAttributes,
          selfClosingTag: defaults.selfClosingTag,
          tagsWithWhitespacePreserved: 'custom',
          voidElements: defaults.voidElements
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
    clearableAttributes: function () {
      return Array.from(new Set(this.vueSnapshots.attributesToClear
        .split(',')
        .map((attribute) => {
          return attribute.trim();
        })
        .filter(Boolean)));
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
        } else if (_xor(this.whitespaceTags, defaults.tagsWithWhitespacePreserved).length) {
          setFormattingObject();
          snapshotSettings.formatting.tagsWithWhitespacePreserved = this.whitespaceTags;
        }
      }

      Object.keys(this.TOP_LEVEL_BOOLEANS).forEach((bool) => {
        if (this.vueSnapshots[bool] !== defaults[bool]) {
          snapshotSettings[bool] = this.vueSnapshots[bool];
        }
      });

      if (this.clearableAttributes.length) {
        snapshotSettings.attributesToClear = this.clearableAttributes;
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
          [
            'function (markup) {',
            '    // Your custom logic to format the markup',
            '    return markup.toUpperCase();',
            '  }'
          ].join('\n')
        )
        .replaceAll('"', '\'');
      snapshotSettings = 'globalThis.vueSnapshots = ' + snapshotSettings + ';';
      snapshotSettings = '// Based on your settings (excluding those that match the defaults)\n' + snapshotSettings;
      return snapshotSettings;
    },
    size: function () {
      return 'font-size: ' + this.fontSize + '%';
    },
    output: function () {
      window.vueSnapshots = {
        ...this.vueSnapshots,
        attributesToClear: this.clearableAttributes,
        formatting: undefined
      };
      if (this.vueSnapshots.formatter === 'diffable') {
        window.vueSnapshots.formatting = {
          ...this.vueSnapshots.formatting
        }
        if (this.vueSnapshots.formatting.tagsWithWhitespacePreserved === 'custom') {
          window.vueSnapshots.formatting.tagsWithWhitespacePreserved = this.whitespaceTags;
        }
      } else if (this.vueSnapshots.formatter === 'custom') {
        window.vueSnapshots.formatter = function (markup) {
          return markup.toUpperCase();
        };
      }
      return vueMarkupFormatter(this.input);
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
.playground-controls fieldset {
  border: 0px;
  margin: 3px 10px 0px 10px;
  padding: 0px;
}
.playground-controls label {
  margin: 10px 10px 0px 4px;
}
.playground-controls p {
  margin: 3px 10px 0px 20px;
  font-size: 90%;
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
