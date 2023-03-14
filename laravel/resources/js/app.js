import './bootstrap';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import router from '@/routes';
import Header from '@/components/Header.vue';
import ProgressBar from '@/components/ProgressBar.vue';

const app = createApp({});

const pinia = createPinia();
pinia.use(createPersistedState());

pinia.use(({ store }) => {
    store.router = markRaw(router);
});

app.use(router);
app.use(pinia);
app.component('v-header', Header);
app.component('progress-bar', ProgressBar);

app.mount('#app');
