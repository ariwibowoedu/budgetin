<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
defineProps({
  message: String,
  show: Boolean,
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>