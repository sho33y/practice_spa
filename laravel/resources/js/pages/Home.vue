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
            <template v-if="ms.isAuthenticated">
                <li>
                    <div class="cursor-pointer" @click.prevent="memberLogout">会員ログアウト</div>
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
            <template v-if="as.isAuthenticated">
                <li>
                    <div class="cursor-pointer" @click.prevent="adminLogout">システム管理者ログアウト</div>
                </li>
            </template>
            <template v-else>
                <li>
                    <router-link :to="{ name: 'admin.login' }">
                        <button class="btn btn-success">システム管理者ログイン</button>
                    </router-link>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { adminStore } from '@/stores/admin';
import { memberStore } from '@/stores/member';
import { pbStore } from '@/stores/progress-bar';

export default {
    setup(props, context) {
        const as = adminStore();
        const ms = memberStore();
        const pb = pbStore();

        const adminLogout = async () => {
            try {
                await pb.start();
                await as.logout();
            } catch (error) {
                await pb.finish();
            }
        }

        const memberLogout = async () => {
            try {
                await pb.start();
                await ms.logout();
            } catch (error) {
                await pb.finish();
            }
        }

        return {
            as,
            ms,
            adminLogout,
            memberLogout,
        }
    },
}
</script>
