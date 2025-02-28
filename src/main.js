import {
  createApp,
  Fragment,
  h as hyperscript
} from 'vue';
import VueAxe, { VueAxePopup } from 'vue-axe';
import constantsPlugin from 'vue-options-api-constants-plugin';

import App from '@/App.vue';

import 'normalize.css/normalize.css';
import '@highlightjs/cdn-assets/styles/vs2015.css';
import '@/styles/fonts.js';
import '@/styles/fonts.css';
import '@/styles/main.css';
import '@/styles/table.css';

let app;

if (process.env.NODE_ENV === 'development') {
  app = createApp({
    render: function () {
      return hyperscript(
        Fragment,
        [
          hyperscript(App),
          hyperscript(VueAxePopup)
        ]
      );
    }
  });
  app.use(VueAxe);
} else {
  app = createApp(App);
}

app.use(constantsPlugin);
app.mount('#app');
