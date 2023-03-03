import { defineStore } from 'pinia'

export const pbStore = defineStore('progress-bar', {
    state: () => {
        return {
            isLoading: false,
            progress: 0,
            interval: undefined,
        }
    },
    actions: {
        start(intervalTime = 10) {
            this.progress = 0;
            this.isLoading = true;
            this.interval = setInterval(() => {
                if (this.progress <= 100) {
                    this.progress++;
                    // const random = Math.floor(Math.random() * 10) + 1;
                    // if (random % 3 === 0) {
                    //     this.progress += random;
                    // }
                }
            }, intervalTime)
        },
        async finish() {
            this.progress = 100;

            await new Promise(resolve => setTimeout(resolve, 400));

            this.isLoading = false;
            clearInterval(this.interval);
            this.progress = 0
        },
    }
})
