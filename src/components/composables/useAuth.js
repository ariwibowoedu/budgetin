import { auth, db } from '@/components/includes/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'


export function useAuth() {
    const router = useRouter()
    const authStore = useAuthStore()
    const loading = ref(false)
    const error = ref(null)

    const register = async (name, email, password) => {
        try {
            loading.value = true
            error.value = null
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const uid = res.user.uid
            const createdAt = new Date().toISOString()

            const userData = { name, email, password, uid, createdAt }
            await setDoc(doc(db, 'users', uid), userData)

            authStore.setUser(userData)
            router.push('/dashboard')
        } catch (err) {
            console.error('Register Error', err)
            error.value = err.message
        } finally {
            loading.value = false
        }

    }

    const login = async (email, password) => {
        try {
            loading.value = true
            const res = await signInWithEmailAndPassword(auth, email, password)
            const uid = res.user.uid
            const docSnap = await getDoc(doc(db, 'users', uid))

            if (docSnap.exists()) {
                authStore.setUser(docSnap.data())
                router.push('/dashboard')
            } else {
                throw new Error('User data not found')
            }
        } catch (err) {
            console.error("Login error", err)
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            authStore.logout()
            router.push('/')
        } catch (err) {
            console.error("Logout error", err)
        }
    }

    return { loading, error, register, login, logout }
}