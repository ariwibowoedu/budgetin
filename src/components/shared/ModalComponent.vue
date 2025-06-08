<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
    role="dialog"
    aria-label="true"
  >
    <div class="bg-white p-6 mx-4 rounded-xl shadow-lg w-full max-w-2xl relative">
      <div class="flex flex-row justify-between items-center border-b-2 border-gray-600 pb-2 mb-4">
        <h2 v-if="title" class="text-xl font-semibold">
          {{ title }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 text-2xl" aria-label="close modal">
          <feather-icon clasess="w-4 h-4" icon="x" />
        </button>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup>
import FeatherIcon from '@/components/feather/FeatherIcon.vue'
defineProps({
  show: {
    type: Boolean,
  },
  title: {
    type: String,
    default: '',
  },
})

defineEmits(['close'])
</script>

<style>
</style>