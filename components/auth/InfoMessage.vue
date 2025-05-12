<template>
  <div class="text-center text-sm text-gray-400 mt-6">
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>