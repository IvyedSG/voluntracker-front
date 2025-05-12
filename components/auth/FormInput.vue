<template>
  <div class="mb-5">
    <label :for="id" class="block text-sm font-medium text-gray-200 mb-2">
      {{ label }}
    </label>
    <div class="relative">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-gray-400">
          <slot name="icon"></slot>
        </span>
      </div>
      
      <input
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="inputType"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :required="required"
        class="block w-full rounded-lg py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        :class="[
          icon ? 'pl-10' : 'pl-4',
          hasRightIcon ? 'pr-12' : 'pr-4'
        ]"
      />
      
      <div v-if="$slots.rightIcon" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <slot name="rightIcon"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Boolean,
    default: false
  },
  hasRightIcon: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>