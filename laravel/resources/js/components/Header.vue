<template>
    <router-link :to="{ name: 'home' }">
        <div>ヘッダー</div>
    </router-link>
    <div v-if="auth.isAuthenticated && auth.user">ログイン中のユーザー: {{ auth.user.email }}</div>
</template>

<script>
import { authStore } from '@/store/auth';

export default {
    setup(props, context) {
        const auth = authStore();

        return {
            auth,
        }
    },
}
</script>
