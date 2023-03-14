<template>
    <progress-bar></progress-bar>
    <v-header></v-header>
    <not-found></not-found>
</template>

<script>
import NotFound from '@/pages/NotFound.vue'
import { notFoundStore } from '@/store/notfound';

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
