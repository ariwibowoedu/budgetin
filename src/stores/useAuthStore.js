import { defineStore } from "pinia";
import { ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const loading = ref(true)
    const error = ref(null)

    const auth = getAuth()

    const init = () => {
        onAuthStateChanged(auth, (u) => {
            user.value = u
            loading.value = false
        })
    }

    const login = async (email, password) => {
        loading.value = true
        error.value = null
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true
        } catch (err) {
            error.value = err.message
            return false
        } finally {
            loading.value = false
        }
    }

    const logout = async () => {
        await signOut(auth)
        user.value = null
    }

    return {
        user, loading, init, login, logout
    }
})