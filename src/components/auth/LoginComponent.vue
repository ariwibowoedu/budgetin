<template>
  <div class="max-w-sm mx-auto mt-10 p-6 bg-white rounded-shadow">
    <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
    <form @submit.prevent="login">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        class="w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="w-full p-2 border rounded mb-4"
        required
      />
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Login
      </button>
      <p class="text-red-500 text-sm">
        {{ errorMessage }}
      </p>
    </form>

    <p class="mt-24 text-xs italic">Note: Call ari to get access email and password</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  errorMessage.value = ''
  const logging = await authStore.login(email.value, password.value)
  if (!logging) {
    errorMessage.value = 'Anda salah memasukan email atau password!'
  }
}
</script>

<style>
</style>