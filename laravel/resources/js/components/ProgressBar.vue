<template>
    <div v-if="pb.isLoading" class="w-full h-1.5 bg-gray-200 fixed top-0 left-0">
        <div class="w-0 h-1.5 bg-teal-600 fixed top-0 left-0 transition-all" :style="{ width: pb.progress + '%' }"></div>
    </div>
</template>

<script>
import { pbStore } from '@/stores/progress-bar';

export default {
    setup(props, context) {
        const pb = pbStore();

        return {
            pb,
        }
    },
}
</script>
