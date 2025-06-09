<template>
  <header class="backdrop-blur-lg bg-white bg-opacity-50 sticky-top z-10 mb-4">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="global"
    >
      <!-- logo -->
      <LogoBrand />
      <div class="flex lg:hidden space components: { LogoBrand },-x-2">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="isMobileMenu = !isMobileMenu"
        >
          <feather-icon classes="w-6 h-6" icon="menu" />
        </button>
      </div>
      <!-- link -->
      <div class="hidden lg:flex lg:gap-x-12">
        <navlink-comp />
        <!-- tombol logout -->
        <button
          v-if="authStore.isLoggedIn"
          class="block w-full text-left text-lg px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 transition duration-300"
          @click="toggleLogout"
        >
          <div class="flex items-center gap-2">
            <p class="text-xl text-gray-500">Logout</p>
            <FeatherIcon classes="w-4 h-4" icon="log-out" />
          </div>
        </button>
      </div>
    </nav>
  </header>
  <!-- menu panel -->

  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transtition ease-in duration-300"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-lg"
      v-if="isMobileMenu"
    >
      <div class="flex items-center justify-between">
        <LogoBrand />
        <button type="button" class="text-gray-700" @click="isMobileMenu = !isMobileMenu">
          <feather-icon classes="h-6 w-6" icon="x" />
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-5000/10">
          <div class="space-y-2 py-6 px-2">
            <navlink-comp @close="isMobileMenu = false" />
            <!-- tombol logout -->
            <button
              v-if="authStore.isLoggedIn"
              class="block w-full text-left text-lg px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 transition duration-300"
              @click="toggleLogout"
            >
              <div class="flex items-center gap-2">
                <p class="text-xl text-gray-500">Logout</p>
                <FeatherIcon classes="w-4 h-4" icon="log-out" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <AuthLogout v-if="showModalLogout" @close="showModalLogout = false" />
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import LogoBrand from '@/components/partials/LogoBrand.vue'
import NavlinkComp from '@/components/partials/navigations/NavlinkComp.vue'
import FeatherIcon from '@/components/feather/FeatherIcon.vue'
import AuthLogout from '@/components/auth/AuthLogout.vue'

const authStore = useAuthStore()
const isMobileMenu = ref(false)

const showModalLogout = ref(false)
const toggleLogout = () => {
  showModalLogout.value = !showModalLogout.value
}
</script>

<style>
</style>