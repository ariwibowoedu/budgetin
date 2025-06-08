<template>
  <div class="mt-4">
    <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
    <form @submit.prevent="handleLogin">
      <input
        type="email"
        v-model="form.email"
        placeholder="Email"
        class="w-full p-2 border rounded mb-4"
        autocomplete="email"
        required
      />
      <input
        type="password"
        v-model="form.password"
        placeholder="Password"
        class="w-full p-2 border rounded mb-4"
        autocomplete="current-password"
        required
      />
      <button
        :disabled="loading"
        type="submit"
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {{ loading ? 'Logging in' : 'Login' }}
      </button>
      <p v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuth } from '@/components/composables/useAuth'

const { login, loading, error } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  await login(form.email, form.password)
}
</script>