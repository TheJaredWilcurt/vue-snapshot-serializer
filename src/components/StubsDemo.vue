<template>
  <div class="stubs-demo">
    <hr id="stubs" />

    <div class="wrapper">
      <h3>
        Stubs Demo
        <a href="#stubs">#</a>
      </h3>

      <p>
        Stubbing out child components can be useful if they have life-cycle hooks, mutate global state, or emits that you don't want to occur during your test.
      </p>
      <p>
        But stubs can also be a pain to deal with. So if all you care about is removing child nodes from a snapshot to reduce noise, then we offer a simpler approach.
      </p>
      <p>
        Vue-Snapshot-Serializer lets you target any DOM nodes in your snapshot with CSS selectors and clean them up.
        Below is a live example you can play with to see the different APIs available for this feature:
      </p>

      <DoxenDropdown
        v-model="syntax"
        label="Syntax"
        :options="syntaxOptions"
        @input="generateSnapshot"
      />

      <div class="boxes">
        <div
          v-for="selector in selectors"
          class="box"
        >
          <DoxenTextField
            v-model="selector.selector"
            label="CSS Selector"
            :errorMessage="selector.selectorValid ? undefined : 'Must be a valid CSS Selector'"
          />

          <template v-if="syntax !== 'array'">
            <DoxenTextField
              v-model="selector.tagName"
              label="Tag"
            />

            <DoxenDropdown
              v-model="selector.removeAttributes"
              label="Attributes"
              :options="attributeOptions"
              @input="generateSnapshot"
            />

            <DoxenTextField
              v-if="selector.removeAttributes === 'specific'"
              v-model="selector.attributesToRemoveString"
              label="Specific attributes to remove"
            />

            <DoxenCheckbox
              v-model="selector.removeInnerHtml"
              name="Remove innerHTML"
            />
          </template>
        </div>
      </div>
    </div>

    <div class="code-wrapper">
      <div class="code-boxes">
        <strong>Settings:</strong>
        <DoxenCodeBox
          :code="settingsString"
          :copy="false"
          class="code-box"
        />
      </div>

      <div class="code-boxes">
        <strong>Original Template:</strong>
        <DoxenCodeBox
          :code="ORIGINAL_MARKUP"
          :copy="false"
          class="code-box"
        />
      </div>

      <div class="code-boxes">
        <strong>Snapshot preview:</strong>
        <DoxenCodeBox
          :code="generatedSnapshot"
          :copy="false"
          class="code-box"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  DoxenCheckbox,
  DoxenCodeBox,
  DoxenDropdown,
  DoxenTextField
} from 'vue-doxen';
import { print } from 'vue3-snapshot-serializer';

const ORIGINAL_MARKUP = `
<div>
  <a
    class="artichoke"
    href="#"
    title="parent"
  >
    <span class="child">
      Vegatable
    </span>
  </a>
  <ul>
    <li class="a">A</li>
    <li class="b">B</li>
    <li class="c">C</li>
    <li class="d">D</li>
  </ul>
</div>
`.trim();

export default {
  name: 'StubsDemo',
  components: {
    DoxenCheckbox,
    DoxenCodeBox,
    DoxenDropdown,
    DoxenTextField
  },
  data: function () {
    return {
      generatedSnapshot: '',
      syntax: 'object',
      selectors: [
        {
          selector: '.artichoke',
          selectorValid: false,
          format: 'long',
          removeInnerHtml: true,
          removeAttributes: 'remove',
          tagName: 'artichoke-stub',
          attributesToRemoveString: 'class, title'
        },
        {
          selector: 'li:nth-of-type(even)',
          selectorValid: false,
          format: 'short',
          removeInnerHtml: true,
          removeAttributes: 'remove',
          tagName: 'li-even-stub',
          attributesToRemoveString: ''
        }
      ]
    };
  },
  constants: {
    ORIGINAL_MARKUP,
    attributeOptions: [
      {
        name: 'Retain all attributes',
        value: 'retain'
      },
      {
        name: 'Remove all attributes',
        value: 'remove'
      },
      {
        name: 'Remove specific attributes',
        value: 'specific'
      }
    ],
    syntaxOptions: [
      {
        name: 'Array',
        value: 'array'
      },
      {
        name: 'Object',
        value: 'object'
      }
    ]
  },
  methods: {
    generateSnapshot: function () {
      window.vueSnapshots = {
        stubs: this.stubSettings,
        formatting: {
          tagsWithWhitespacePreserved: [],
          selfClosingTag: true
        }
      };
      const markup = ORIGINAL_MARKUP.trim();
      this.generatedSnapshot = print(markup);
    },
    isSelectorValid: function (selector, index) {
      try {
        document.createDocumentFragment().querySelector(selector);
      } catch {
        this.selectors[index].selectorValid = false;
        return;
      }

      let parenthesis = 0;
      selector
        .split('')
        .forEach((character) => {
          if (character === '(') {
            parenthesis++;
          }
          if (character === ')') {
            parenthesis--;
          }
        });
      if (parenthesis) {
        this.selectors[index].selectorValid = false;
        return
      }

      this.selectors[index].selectorValid = true;
    },
    validateSelector: function (index) {
      const selectorGroup = this.selectors[index];
      const SELECTOR = selectorGroup.selector.trim();
      this.isSelectorValid(SELECTOR, index);
    },
    createStub: function (index) {
      const selectorGroup = this.selectors[index];
      const SELECTOR = selectorGroup.selector.trim();
      const tagName = selectorGroup.tagName.trim();
      let stub = {};

      stub[SELECTOR] = {};
      if (selectorGroup.removeInnerHtml) {
        stub[SELECTOR].removeInnerHtml = true;
      }
      if (selectorGroup.removeAttributes === 'specific') {
        stub[SELECTOR].removeAttributes = selectorGroup
          .attributesToRemoveString
          .split(',')
          .map((attribute) => {
            return attribute.trim();
          })
          .filter(Boolean);
      }
      if (selectorGroup.removeAttributes === 'remove') {
        stub[SELECTOR].removeAttributes = true;
      }
      if (tagName) {
        stub[SELECTOR].tagName = tagName;
      }
      if (!Object.keys(stub[SELECTOR]).length) {
        delete stub[SELECTOR];
      }
      if (
        selectorGroup.removeAttributes === 'remove' &&
        selectorGroup.removeInnerHtml &&
        tagName
      ) {
        stub[SELECTOR] = selectorGroup.tagName.trim();
      }
      return stub;
    }
  },
  computed: {
    stubSettings: function () {
      this.validateSelector(0);
      this.validateSelector(1);
      let stubs = {};
      if (this.syntax === 'object') {
        if (this.selectors[0].selectorValid) {
          stubs = this.createStub(0);
        }
        if (this.selectors[1].selectorValid) {
          stubs = {
            ...stubs,
            ...this.createStub(1)
          }
        }
      }
      if (this.syntax === 'array') {
        stubs = [];
        if (this.selectors[0].selectorValid) {
          stubs.push(this.selectors[0].selector);
        }
        if (this.selectors[1].selectorValid) {
          stubs.push(this.selectors[1].selector);
        }
      }
      return stubs;
    },
    settingsString: function () {
      const settings = [];
      if (this.syntax === 'array') {
        settings.push('// An array of CSS Selectors.\n');
        settings.push('// The selector string is used to\n');
        settings.push('// make a tagName ending in "-stub"\n');
      }
      if (
        this.syntax === 'object' &&
        this.selectors[0].removeAttributes == 'remove' &&
        this.selectors[0].removeInnerHtml &&
        this.selectors[1].removeAttributes !== 'remove' &&
        this.selectors[1].removeInnerHtml
      ) {
        settings.push('// Shorthand syntax allows targeting a\n');
        settings.push('// DOM node, and just supplying a\n');
        settings.push('// replacement tagName. It is assumed\n');
        settings.push('// you want to remove all attributes\n');
        settings.push('// and innerHTML.\n');
      }
      settings.push('globalThis.vueSnapshots.stubs = ');
      settings.push(JSON.stringify(this.stubSettings, null, 2));
      settings.push(';');
      return settings.join('');
    }
  },
  watch: {
    attributesToRemoveString: function () {
      this.generateSnapshot();
    },
    removeInnerHtml: function () {
      this.generateSnapshot();
    },
    removeAttributes: function () {
      this.generateSnapshot();
    },
    selector: function () {
      this.generateSnapshot();
    },
    tagName: function () {
      this.generateSnapshot();
    },
    stubSettings: function () {
      this.generateSnapshot();
    }
  },
  created: function () {
    this.generateSnapshot();
  }
};
</script>
