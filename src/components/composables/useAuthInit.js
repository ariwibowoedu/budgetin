import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '@/components/includes/firebase'
import { useAuthStore } from "@/stores/useAuthStore";

export function useAuthInit() {
    const authStore = useAuthStore()

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                authStore.setUser(docSnap.data())
            }
        } else {
            authStore.logout()
        }
    })
}