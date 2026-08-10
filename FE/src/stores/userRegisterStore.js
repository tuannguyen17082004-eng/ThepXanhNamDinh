import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        email: null,
        name: null,
        gender: null,
        phone: null,
    }),
    actions: {
        setUser(email, name, gender, phone) {
            this.email = email;
            this.name = name;
            this.gender = gender;
            this.phone = phone;
        },
        clearUser() {
            this.email = null;
            this.name = null;
            this.gender = null;
            this.phone = null;
        }
    }
})