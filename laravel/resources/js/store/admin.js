import { defineStore } from 'pinia';

export const adminStore = defineStore('admin', {
    state: () => {
        return {
            adminId: null,
            admin: null
        }
    },
    getters: {
        isAuthenticated: (state) => state.adminId !== null,
    },
    actions: {
        SET_ADMIN_ID(id) {
            this.adminId = id;
        },
        SET_ADMIN(admin) {
            this.admin = admin;
        },
        LOGOUT() {
            this.SET_ADMIN_ID(null);
            this.SET_ADMIN(null);
        },
        async checkAuthenticated() {
            if (!this.adminId) {
                return;
            }

            try {
                const response = await axios.get('/api/admin/' + this.adminId);
                await this.SET_ADMIN(response.data.admin);
            } catch (error) {
                if (error.response.status === 401) {
                    this.LOGOUT();
                }
            }
        },
        async login(data) {
            try {
                await axios.get('/sanctum/csrf-cookie');
                const response = await axios.post('/api/login/admin', data);

                await this.SET_ADMIN_ID(response.data.encrypted_id);
                await this.SET_ADMIN(response.data.admin);
            } catch (error) {
                throw error;
            }
        },
        async logout() {
            try {
                await axios.post('/api/logout/admin');
                await this.LOGOUT();
            } catch (error) {
                console.log(error);
            }

            await this.router.push({name: 'home'});
        },
    },
    persist: {
        paths: ['adminId'],
    },
})
