import { defineStore } from 'pinia';

export const memberStore = defineStore('member', {
    state: () => {
        return {
            memberId: null,
            member: null
        }
    },
    getters: {
        isAuthenticated: (state) => state.memberId !== null,
    },
    actions: {
        SET_MEMBER_ID(id) {
            this.memberId = id;
        },
        SET_MEMBER(member) {
            this.member = member;
        },
        LOGOUT() {
            this.SET_MEMBER_ID(null);
            this.SET_MEMBER(null);
        },
        async checkAuthenticated() {
            if (!this.memberId) {
                return;
            }

            try {
                const response = await axios.get('/api/member/' + this.memberId);
                await this.SET_MEMBER(response.data.member);
            } catch (error) {
                if (error.response.status === 401) {
                    this.LOGOUT();
                }
            }
        },
        async login(data) {
            try {
                await axios.get('/sanctum/csrf-cookie');
                const response = await axios.post('/api/login/member', data);

                await this.SET_MEMBER_ID(response.data.encrypted_id);
                await this.SET_MEMBER(response.data.member);
            } catch (error) {
                throw error;
            }
        },
        async logout() {
            try {
                await axios.post('/api/logout/member');
                await this.LOGOUT();
            } catch (error) {
                console.log(error);
            }

            await this.router.push({name: 'home'});
        },
    },
    persist: {
        paths: ['memberId'],
    },
})
