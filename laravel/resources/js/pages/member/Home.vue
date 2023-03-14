<template>
    <div>
        <ul>
            <li>
                <div class="cursor-pointer" @click.prevent="memberLogout">ログアウト</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { memberStore } from '@/stores/member';
import { pbStore } from '@/stores/progress-bar';

export default {
    setup(props, context) {
        const ms = memberStore();
        const pb = pbStore();

        const memberLogout = async () => {
            try {
                await pb.start();
                await ms.logout();
            } catch (error) {
                await pb.finish();
            }
        }

        return {
            ms,
            memberLogout,
        }
    },
}
</script>
