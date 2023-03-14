<template>
    <progress-bar></progress-bar>
    <v-header></v-header>
    <div>会員ページ</div>
    <not-found v-if="nf.isNotFound"></not-found>
    <router-view v-else></router-view>
</template>

<script>
import NotFound from '@/pages/NotFound.vue'
import { notFoundStore } from '@/stores/notfound';

export default {
    components: { NotFound },
    setup(props, context) {
        const nf = notFoundStore();

        return {
            nf,
        }
    },
}
</script>
