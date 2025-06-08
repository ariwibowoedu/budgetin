<template>
  <div class="max-w-sm mx-auto mt-10 p-6 bg-white rounded-shadow">
    <component :is="authComponent" />
    <p class="text-sm text-center mt-4">
      <span v-if="authMode === 'login'">
        Don't have account?
        <button @click="authMode = 'register'" class="text-blue-500 underline">Register</button>
      </span>
      <span v-else>
        Already have account?
        <button @click="authMode = 'login'" class="text-blue-500 underline">Login</button>
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AuthLogin from '@/components/auth/AuthLogin.vue'
import AuthRegister from '@/components/auth/AuthRegister.vue'

const authMode = ref('login')

const authComponent = computed(() => {
  return authMode.value === 'login' ? AuthLogin : AuthRegister
})
</script>

<style>
</style>