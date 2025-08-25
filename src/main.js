import { createApp } from 'vue';
import constantsPlugin from 'vue-options-api-constants-plugin';

import App from '@/App.vue';

import 'normalize.css/normalize.css';
import '@highlightjs/cdn-assets/styles/vs2015.css';
import '@/styles/fonts.js';
import '@/styles/fonts.css';
import '@/styles/main.css';
import '@/styles/table.css';

let app = createApp(App);
app.use(constantsPlugin);
app.mount('#app');
