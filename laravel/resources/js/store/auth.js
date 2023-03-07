import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
    state: () => {
        return {
            userId: null,
            user: null
        }
    },
    getters: {
        isAuthenticated: (state) => state.userId !== null,
    },
    actions: {
        SET_USER_ID(id) {
            this.userId = id;
        },
        SET_USER(user) {
            this.user = user;
        },
        async checkAuthenticated() {
            if (!this.userId) {
                return;
            }

            const response = await axios.get('/api/member/' + this.userId);
            await this.SET_USER(response.data.user);
        },
        async login(data) {
            try {
                await axios.get('/sanctum/csrf-cookie');
                const response = await axios.post('/api/member/login', data);

                await this.SET_USER_ID(response.data.encrypted_user_id);
                await this.SET_USER(response.data.user);
            } catch (error) {
                throw error;
            }
        },
        async logout() {
            try {
                await axios.post('/api/member/logout');

                await this.SET_USER_ID(null);
                await this.SET_USER(null);
            } catch (error) {
                console.log(error);
            }

            await this.router.push({name: 'home'});
        },
    },
    persist: {
        paths: ['userId'],
    },
})
