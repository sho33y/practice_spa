import './bootstrap';

import { createApp } from 'vue';
import router from '@/router';
import Header from '@/components/Header.vue';

const app = createApp({});

app.use(router);
app.component('v-header', Header);

app.mount('#app');
