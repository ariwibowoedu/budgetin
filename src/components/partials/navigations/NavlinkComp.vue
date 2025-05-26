<template>
  <li v-for="route in routes" :key="route.path" class="list-none">
    <router-link
      :to="route.path"
      @click="closeMenu"
      class="-mx-3 flex gap-2 rounded-lg px-3 py-2 text-xl font-medium font-sans leading-7 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      :class="{
        'bg-blueberry text-white': $route.path === route.path,
      }"
    >
      <span class="block lg:hidden">
        <component :is="route.icon" class="w-6 h-6" />
      </span>
      <span>{{ route.name }}</span>
    </router-link>
  </li>
</template>
    
    <script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['close'])

const router = useRouter()
const routes = computed(() => router.options.routes.filter((route) => route.name))

const closeMenu = () => {
  emit('close')
}
</script>