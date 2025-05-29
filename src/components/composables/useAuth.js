import { useAuthStore } from "@/stores/useAuthStore";
import { computed } from "vue";

export function useAuth() {
    const authStore = useAuthStore()
    return {
        user: computed(() => authStore.user)
    }
}