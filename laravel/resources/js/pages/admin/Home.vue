<template>
    <div>
        <ul>
            <li>
                <div class="cursor-pointer" @click.prevent="adminLogout">システム管理者ログアウト</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { adminStore } from '@/stores/admin';
import { pbStore } from '@/stores/progress-bar';

export default {
    setup(props, context) {
        const as = adminStore();
        const pb = pbStore();

        const adminLogout = async () => {
            try {
                await pb.start();
                await as.logout();
            } catch (error) {
                await pb.finish();
            }
        }

        return {
            as,
            adminLogout,
        }
    },
}
</script>
