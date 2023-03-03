import './bootstrap';

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from '@/router';
import Header from '@/components/Header.vue';
import ProgressBar from '@/components/ProgressBar.vue';

const app = createApp({});
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component('v-header', Header);
app.component('progress-bar', ProgressBar);

app.mount('#app');
