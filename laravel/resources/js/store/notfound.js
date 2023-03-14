import { defineStore } from 'pinia';

export const notFoundStore = defineStore('notfound', {
    state: () => {
        return {
            isNotFound: false,
        }
    },
    actions: {
        SET_STATUS(status) {
            this.isNotFound = status;
        },
        enable() {
            this.SET_STATUS(true);
        },
        disable() {
            this.SET_STATUS(false);
        }
    },
})
