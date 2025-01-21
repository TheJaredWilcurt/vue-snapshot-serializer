<template>
  <section>
    <div class="wrapper wrapper-flex">
      <h2>
        Try it out
        <a href="#playground">#</a>
      </h2>
      <div>
        <button
          class="tab-button"
          :class="{ active: !showComponent }"
          @click="showComponent = false"
        >
          Playground
        </button>
        <button
          class="tab-button"
          :class="{ active: showComponent }"
          @click="showComponent = true"
        >
          Live component demo
        </button>
      </div>
    </div>
    <div class="playground">
      <aside class="playground-controls">
        <fieldset
          class="playground-font-size"
          :title="descriptions.fontSize"
        >
          <label>
            Font size ({{ fontSize }}%)
            <input v-model.number="fontSize" type="range" min="50" max="200">
          </label>
        </fieldset>
        <fieldset
          class="playground-font-size"
          :title="descriptions.heightSize"
        >
          <label>
            <code class="playground-height-offset-label">height: calc(100vh - {{ heightSize }}px)</code>
            <input v-model.number="heightSize" type="range" min="50" max="600">
          </label>
        </fieldset>
        <DoxenCheckbox
          v-model="stacked"
          name="Stacked"
          :title="descriptions.stacked"
        />
        <DoxenCheckbox
          v-for="(value, key) in TOP_LEVEL_BOOLEANS"
          v-model="vueSnapshots[key]"
          :name="value"
          :title="descriptions[key]"
        />
        <p><strong>*</strong> Requires a Vue-Test-Utils wrapper, not HTML string.</p>
        <fieldset :title="descriptions.attributesToClear">
          <label>
            Attributes to clear:
            <input v-model="vueSnapshots.attributesToClear" placeholder="Comma separated list of attributes">
          </label>
        </fieldset>
        <DoxenCheckbox
          v-model="vueSnapshots.postProcessor"
          name="Post Processor"
          :title="descriptions.postProcessor"
        />
        <fieldset :title="descriptions.formatter">
          <label>
            Formatter:
            <select v-model="vueSnapshots.formatter">
              <option value="none">None</option>
              <option value="diffable">Diffable</option>
              <option value="classic">Classic</option>
            </select>
          </label>
        </fieldset>
        <template v-if="vueSnapshots.formatter === 'diffable'">
          <fieldset :title="descriptions.voidElements">
            <label>
              Void Elements:
              <select v-model="vueSnapshots.formatting.voidElements">
                <option value="html">&lt;input&gt;</option>
                <option value="xhtml">&lt;input /&gt;</option>
                <option value="xml">&lt;input&gt;&lt;/input&gt;</option>
              </select>
            </label>
          </fieldset>
          <DoxenCheckbox
            v-model="vueSnapshots.formatting.emptyAttributes"
            name="Show Empty Attributes"
            :title="descriptions.emptyAttributes"
          />
          <DoxenCheckbox
            v-model="vueSnapshots.formatting.escapeAttributes"
            name="Escape Attributes"
            :title="descriptions.escapeAttributes"
          />
          <DoxenCheckbox
            v-model="vueSnapshots.formatting.escapeInnerText"
            name="Escape Inner Text"
            :title="descriptions.escapeInnerText"
          />
          <DoxenCheckbox
            v-model="vueSnapshots.formatting.selfClosingTag"
            name="Non-Void Self Closing Tags"
            :title="descriptions.selfClosingTag"
          />
          <fieldset :title="descriptions.attributesPerLine">
            <label>
              Attributes Per Line:
              <input v-model.number="vueSnapshots.formatting.attributesPerLine" type="number" min="0">
            </label>
          </fieldset>
          <fieldset :title="descriptions.classesPerLine">
            <label>
              Classes Per Line:
              <input v-model.number="vueSnapshots.formatting.classesPerLine" type="number" min="0">
            </label>
          </fieldset>
          <fieldset :title="descriptions.tagsWithWhitespacePreserved">
            <label>
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
          <div
            v-if="showComponent"
            class="playground-box playground-box-input"
            :style="size"
          >
            <p>Example component template:</p>
            <DoxenCodeBox
              class="playground-box-example-code"
              :code="EXAMPLE_COMPONENT_TEMPLATE"
              :copy="false"
              :styleTokens="{ codeBox: 'playground-output' }"
              :key="outputKey"
            />
            <p>Live component demo</p>
            <ExampleComponent
              name="Component Example"
              @content="exampleContentChanged"
              @toggle="exampleToggled"
            />
          </div>
          <textarea
            v-else
            v-model="input"
            class="playground-box playground-box-input"
            :style="size"
            :rows="input.split('\n').length"
          ></textarea>
          <DoxenCodeBox
            class="playground-box playground-box-output"
            :code="output"
            :copy="false"
            :style="size"
            :styleTokens="{ codeBox: 'playground-output' }"
            :key="outputKey"
          />
        </div>
        <DoxenCodeBox
          :code="printableSettings"
          :copy="false"
          :style="size"
        />
      </main>
    </div>
  </section>
</template>

<script>
import { flushPromises, mount } from '@vue/test-utils';
import _xor from 'lodash.xor';
import {
  DoxenCheckbox,
  DoxenCodeBox
} from 'vue-doxen';
import { vueMarkupFormatter, print } from 'vue3-snapshot-serializer';

import ExampleComponent from '@/components/ExampleComponent.vue';
import {
  API_DESCRIPTIONS,
  EXAMPLE_COMPONENT_TEMPLATE,
  PLAYGROUND_EXAMPLE_CODE
} from '@/helpers/codeSnippets.js';

const defaults = Object.freeze({
  addInputValues: true,
  attributesPerLine: 1,
  attributesToClear: [],
  classesPerLine: 1,
  clearInlineFunctions: false,
  emptyAttributes: true,
  escapeAttributes: false,
  escapeInnerText: true,
  formatter: 'diffable',
  postProcessor: false,
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
  sortClasses: true,
  stringifyAttributes: true,
  tagsWithWhitespacePreserved: ['a', 'pre'],
  verbose: true,
  voidElements: 'xhtml'
});

export default {
  name: 'PlayGround',
  components: {
    DoxenCheckbox,
    DoxenCodeBox,
    ExampleComponent
  },
  constants: {
    descriptions: API_DESCRIPTIONS,
    EXAMPLE_COMPONENT_TEMPLATE,
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
      sortClasses: 'Sort Classes',
      addInputValues: 'Add Input Values*',
      stringifyAttributes: 'Stringify Attributes*'
    }
  },
  data: function () {
    return {
      showComponent: true,
      wrapper: mount(ExampleComponent),
      outputKey: 0,
      fontSize: 100,
      heightSize: 200,
      input: PLAYGROUND_EXAMPLE_CODE,
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
        sortClasses: defaults.sortClasses,
        verbose: defaults.verbose,
        postProcessor: defaults.postProcessor,
        formatting: {
          attributesPerLine: defaults.attributesPerLine,
          classesPerLine: defaults.classesPerLine,
          emptyAttributes: defaults.emptyAttributes,
          escapeAttributes: defaults.escapeAttributes,
          escapeInnerText: defaults.escapeInnerText,
          selfClosingTag: defaults.selfClosingTag,
          voidElements: defaults.voidElements
        }
      }
    };
  },
  methods: {
    exampleToggled: async function () {
      await this.wrapper.find('[data-test="toggle"]').trigger('click');
      await flushPromises();
      this.updateOutput();
    },
    exampleContentChanged: async function (value) {
      const textarea = await this.wrapper.find('[data-test="content"]');
      textarea.element.value = value;
      await textarea.trigger('input');
      await flushPromises();
      this.updateOutput();
    },
    updateOutput: function () {
      window.vueSnapshots = {
        ...this.vueSnapshots,
        attributesToClear: this.clearableAttributes,
        formatting: undefined
      };
      if (this.vueSnapshots.formatter === 'diffable') {
        window.vueSnapshots.formatting = {
          ...this.vueSnapshots.formatting,
          tagsWithWhitespacePreserved: this.whitespaceTags
        }
      }
      if (this.vueSnapshots.postProcessor) {
        window.vueSnapshots.postProcessor = function (markup) {
          return markup.toUpperCase();
        };
      }

      if (this.showComponent) {
        this.output = print(this.wrapper);
      } else {
        this.output = print(this.input.trim());
      }
      this.outputKey++;
    }
  },
  computed: {
    whitespaceTags: function () {
      return Array.from(new Set(this.whitespaceTagsList
        .split(',')
        .map((tag) => {
          return tag
            .replaceAll('[', '')
            .replaceAll(']', '')
            .replaceAll('"', '')
            .replaceAll('\'', '')
            .replaceAll('`', '')
            .trim();
        })
        .filter(Boolean)
      ));
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
      if (this.vueSnapshots.formatter === 'classic') {
        snapshotSettings.classicFormatting = {};
      }
      if (this.vueSnapshots.formatter === 'diffable') {
        function setFormattingObject () {
          snapshotSettings.formatting = snapshotSettings.formatting || {};
        }
        if (this.vueSnapshots.formatting.attributesPerLine !== defaults.attributesPerLine) {
          setFormattingObject();
          snapshotSettings.formatting.attributesPerLine = this.vueSnapshots.formatting.attributesPerLine || 0;
        }
        if (this.vueSnapshots.formatting.classesPerLine !== defaults.classesPerLine) {
          setFormattingObject();
          snapshotSettings.formatting.classesPerLine = this.vueSnapshots.formatting.classesPerLine || 0;
        }
        if (this.vueSnapshots.formatting.escapeAttributes !== defaults.escapeAttributes) {
          setFormattingObject();
          snapshotSettings.formatting.escapeAttributes = this.vueSnapshots.formatting.escapeAttributes;
        }
        if (this.vueSnapshots.formatting.escapeInnerText !== defaults.escapeInnerText) {
          setFormattingObject();
          snapshotSettings.formatting.escapeInnerText = this.vueSnapshots.formatting.escapeInnerText;
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
        if (_xor(this.whitespaceTags, defaults.tagsWithWhitespacePreserved).length) {
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
      if (this.vueSnapshots.postProcessor) {
        snapshotSettings.postProcessor = true;
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
          'postProcessor: true',
          [
            'postProcessor: function (markup) {',
            '    // Your custom logic goes here',
            '    return markup.toUpperCase();',
            '  }'
          ].join('\n')
        )
        .replace(
          'formatter: "classic"',
          '// This is the formatter used by jest-serializer-vue-tjw,\n  // to help with migrating to vue3-snapshot-serializer\n  formatter: "classic"'
        )
        .replace(
          'classicFormatting: {}',
          'classicFormatting: {\n    // Pass in js-beautify.html settings here\n  }'
        )
        .replaceAll('"', '\'');
      snapshotSettings = 'globalThis.vueSnapshots = ' + snapshotSettings + ';';
      snapshotSettings = '// Based on your settings (excluding those that match the defaults)\n' + snapshotSettings;
      return snapshotSettings;
    },
    size: function () {
      return [
        'font-size: ' + this.fontSize + '%',
        'height: calc(100vh - ' + this.heightSize + 'px)'
      ].join(';');
    }
  },
  watch: {
    vueSnapshots: {
      deep: true,
      handler: function () {
        this.updateOutput();
      }
    },
    clearableAttributes: function () {
      this.updateOutput();
    },
    whitespaceTagsList: function () {
      this.updateOutput();
    },
    showComponent: function () {
      this.updateOutput();
    }
  },
  created: function () {
    this.updateOutput();
  }
};
</script>

<style>
.wrapper-flex {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.wrapper-flex button {
  margin-bottom: 6px;
}
.tab-button {
  background: #15152A;
}
.tab-button.active {
  background: #383871;
}
.playground {
  display: flex;
}
.playground-controls {
  display: flex;
  align-content: start;
  align-items: start;
  justify-content: start;
  flex-wrap: wrap;
  min-width: 300px;
  max-width: 300px;
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
  min-width: calc(50% - 150px);
  max-width: calc(50% - 150px);
  overflow: auto;
}
.playground-box-input {
  padding: 0.5em;
  resize: none;
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
.playground-height-offset-label {
  margin-left: -5px;
  font-size: 13px;
}

.playground-box [class^="hljs"],
.playground-box code,
.playground-box pre {
  font-size: 1em;
}

.playground-box-output {
  position: relative;
}
.playground-box-output:before {
  content: 'Snapshot Preview';
  position: absolute;
  top: 4px;
  right: 4px;
  background: #2C2C3D;
  border: 1px solid #121238;
  border-radius: 4px;
  padding: 3px 7px;
  color: #FFF;
  opacity: 0.8;
}

@media (width < 900px) {
  .playground {
    flex-direction: column;
    align-items: center;
  }
  .playground-controls {
    width: 100%;
    font-size: 85%;
  }
  .playground-font-size {
    margin: 0px;
  }
  .playground-font-size label {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
  }
  .playground-font-size input {
    margin: 0px 0px 0px 0.5rem;
  }
}
</style>
