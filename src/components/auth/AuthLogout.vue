<template>
  <ModalComponent :show="true" title="Confirm Logout" @close="$emit('close')">
    <div class="mt-4">
      <p class="text-gray-500 text-xl">Are you sure want to logout?</p>
      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded border border-gray-300 text-gray-700"
        >
          Cancel
        </button>
        <button @click="handleLogout" class="px-4 py-2 rounded bg-red-600 text-white">
          Logout
        </button>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup>
import ModalComponent from '@/components/shared/ModalComponent.vue'
import { useAuth } from '@/components/composables/useAuth'

const { logout } = useAuth()

const emit = defineEmits(['close'])

const handleLogout = async () => {
  await logout()
  emit('close')
}
</script>

<style>
</style>