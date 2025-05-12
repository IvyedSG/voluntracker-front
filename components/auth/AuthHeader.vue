<template>
  <div class="text-center mb-8">
    <img :src="logoSrc" :alt="logoAlt" class="h-16 mx-auto mb-4">
    <h1 class="text-2xl font-bold text-white">{{ title }}</h1>
    <p class="text-gray-300 mt-2">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  logoSrc: {
    type: String,
    default: '/logo192.png'
  },
  logoAlt: {
    type: String,
    default: 'VolunTracker Logo'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>