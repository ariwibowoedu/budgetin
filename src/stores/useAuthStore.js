import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)

    const setUser = (data) => {
        user.value = data
    }

    const logout = () => {
        user.value = null
    }

    const isLoggedIn = computed(() => !!user.value)

    return { setUser, user, logout, isLoggedIn }
})