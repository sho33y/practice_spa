<template>
    <div>
        <h1>会員登録</h1>
        <div>
            <form @submit.prevent="register">
                <div>
                    <label for="name" class="">名前</label>
                    <input
                        type="text"
                        class=""
                        id="name"
                        required
                        v-model="user.name"
                    >
                    <!-- Validation Errors -->
<!--                    <div class="text-red-600 mt-1">-->
<!--                        <div v-for="message in store.validUserErrors?.name">-->
<!--                            {{ message }}-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                <div>
                    <label for="email" class="">メールアドレス</label>
                    <input
                        type="email"
                        class=""
                        id="email"
                        required
                        v-model="user.email"
                    >
                </div>
                <div>
                    <label for="password" class="">パスワード</label>
                    <input
                        type="password"
                        class=""
                        id="password"
                        required
                        v-model="user.password"
                    >
                </div>
                <div>
                    <button>登録</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { pbStore } from "@/store/progress-bar";

export default {
    setup(props, context) {
        const user = ref({});
        const errors = ref({});
        const router = useRouter();
        const pb = pbStore();
        const register = async () => {
            try {
                await pb.start();
                await axios.post('/api/member/register', user.value);
                await router.push({name: 'member.login'});
            } catch (error) {
                errors.value = error.response?.data?.errors;
                await pb.finish();
            }
        }

        return {
            user,
            register,
        }
    },
}
</script>
