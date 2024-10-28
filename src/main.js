import { createApp } from 'vue';
import constantsPlugin from 'vue-options-api-constants-plugin';

import App from '@/App.vue';

import 'normalize.css/normalize.css';
import 'highlightjs/styles/vs2015.css';
import '@/styles/fonts.js';
import '@/styles/main.css';
import '@/styles/table.css';

const app = createApp(App);
app.use(constantsPlugin);
app.mount('#app');
