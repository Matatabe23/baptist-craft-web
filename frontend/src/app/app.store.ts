import { defineStore } from 'pinia';


export const useAppStore = defineStore('app', {
    state: () => ({
        userData: null,
        auth: false,
    }),


    actions: {

    },
});
