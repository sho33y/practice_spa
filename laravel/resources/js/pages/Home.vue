<template>
    <div>
        <h1>トップページ</h1>
        <ul>
            <li>
                <router-link :to="{ name: 'tasks.index' }">
                    <button class="btn btn-success">タスク一覧</button>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'tasks.create' }">
                    <button class="btn btn-success">タスク登録</button>
                </router-link>
            </li>


            <template v-if="auth.isAuthenticated">
                <li>
                    <div class="cursor-pointer" @click.prevent="logout">会員ログアウト</div>
                </li>
            </template>
            <template v-else>
                <li>
                    <router-link :to="{ name: 'member.register' }">
                        <button class="btn btn-success">会員登録</button>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'member.login' }">
                        <button class="btn btn-success">会員ログイン</button>
                    </router-link>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { authStore } from '@/store/auth';
import { pbStore } from '@/store/pb';

export default {
    setup(props, context) {
        const auth = authStore();
        const pb = pbStore();

        const logout = async () => {
            try {
                await pb.start(40);
                await auth.logout();
            } catch (error) {
                await pb.finish();
            }
        }

        return {
            auth,
            logout,
        }
    },
}
</script>
