import { defineStore } from 'pinia'

export const useEmailStore = defineStore('email', {
    state: () => ({
        content: null
    }),
    actions: {
        setEmail(email) {
            this.content = email;
        }
    }
})