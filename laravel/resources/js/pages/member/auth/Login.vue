<template>
    <div>
        <h1>ログイン</h1>
        <div>
            <form @submit.prevent="login">
                <div>
                    <label for="email" class="">メールアドレス</label>
                    <input
                        type="email"
                        class=""
                        id="email"
                        required
                        v-model="form.email"
                    >
                </div>
                <div>
                    <label for="password" class="">パスワード</label>
                    <input
                        type="password"
                        class=""
                        id="password"
                        required
                        v-model="form.password"
                    >
                </div>
                <div>
                    <button>ログイン</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '@/store/auth';
import { pbStore } from '@/store/pb';

export default {
    setup(props, context) {
        const form = ref({});
        const errors = ref({});
        const router = useRouter();
        const auth = authStore();
        const pb = pbStore();

        const login = async () => {
            try {
                await pb.start(40);
                await auth.login(form.value);
                await router.push({name: 'member.home'});
            } catch (error) {
                errors.value = error.response?.data?.errors;
                await pb.finish();
            }
        }

        return {
            form,
            login,
        }
    },
}
</script>
