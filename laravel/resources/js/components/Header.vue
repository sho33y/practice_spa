<template>
    <router-link :to="{ name: 'home' }">
        <div>ヘッダー</div>
    </router-link>
    <div v-if="as.isAuthenticated && as.admin">ログイン中のシステム管理者: {{ as.admin.email }}</div>
    <div v-if="ms.isAuthenticated && ms.member">ログイン中のユーザー: {{ ms.member.email }}</div>
</template>

<script>
import { adminStore } from '@/store/admin';
import { memberStore } from '@/store/member';

export default {
    setup(props, context) {
        const as = adminStore();
        const ms = memberStore();

        return {
            as,
            ms,
        }
    },
}
</script>
