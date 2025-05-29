<template>
  <div v-if="auth.loading">
    <p class="text-center mt-10">Memuat...</p>
  </div>
  <div v-else>
    <LoginComponent v-if="!auth.user" />
    <DashboardComponent v-else />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import DashboardComponent from '@/components/dashboard/DashboardComponent.vue'

const auth = useAuthStore()
onMounted(() => {
  auth.init()
})
</script>
