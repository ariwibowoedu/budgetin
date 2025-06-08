<template>
  <div>
    <!-- if user mot logged in show auth page -->
    <auth-page v-if="!isLoggedIn" />
    <!-- user already logged in -->
    <dashboard-page v-else />
  </div>
</template>

<script setup>
import AuthPage from '@/components/auth/AuthPage.vue'
import DashboardPage from '@/components/dashboard/DashboardPage.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
</script>
