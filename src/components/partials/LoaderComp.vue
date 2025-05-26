<template>
  <div class="flex items-center justify-center h-36">
    <div class="flex space-x-2">
      <div class="dot bg-indigo-500 w-4 h-4 rounded-full animate-bounce"></div>
      <div class="dot bg-indigo-500 w-4 h-4 rounded-full animate-bounce animation-delay-200"></div>
      <div class="dot bg-indigo-500 w-4 h-4 rounded-full animate-bounce animation-delay-400"></div>
    </div>
  </div>
</template>
  
  <style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-100%);
  }
}

.dot {
  animation: bounce 1s infinite;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}
.animation-delay-400 {
  animation-delay: 0.4s;
}
</style>