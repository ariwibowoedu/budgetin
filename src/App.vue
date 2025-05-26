    
<script setup>
import NavbarComp from '@/components/partials/navigations/NavbarComp.vue'
import FooterComp from '@/components/partials/FooterComp.vue'
</script>


<template>
  <navbar-comp />
  <div class="mx-auto max-w-7xl items-center px-4 lg:px-4">
    <router-view />
  </div>
  <footer-comp />
</template>
