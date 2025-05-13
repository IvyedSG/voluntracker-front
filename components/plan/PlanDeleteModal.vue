<template>
  <UModal 
    v-model:open="isOpen"
    :ui="{ wrapper: 'max-w-md' }"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-heroicons-exclamation-triangle" class="text-amber-500 text-xl" />
        <h3 class="text-lg font-semibold">Confirmar eliminación</h3>
      </div>
    </template>
    
    <template #body>
      <p class="text-gray-300 mb-4">
        ¿Estás seguro de que deseas eliminar el plan <span class="font-semibold text-white">{{ plan.nombre }}</span>?
      </p>
      
      <div v-if="plan.numOrganizaciones > 0" class="bg-red-950/30 border border-red-800/50 rounded-lg p-4 mb-4">
        <div class="flex items-start">
          <UIcon name="i-heroicons-exclamation-circle" class="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p class="text-red-300 font-medium">
              No es posible eliminar este plan
            </p>
            <p class="text-red-400 text-sm mt-1">
              Este plan tiene {{ plan.numOrganizaciones }} {{ plan.numOrganizaciones === 1 ? 'organización asociada' : 'organizaciones asociadas' }}. Debes transferir estas organizaciones a otro plan antes de eliminarlo.
            </p>
          </div>
        </div>
      </div>
      
      <p v-else class="text-yellow-300 text-sm bg-yellow-950/30 border border-yellow-800/50 rounded-lg p-3">
        Esta acción es permanente y no se puede deshacer.
      </p>
    </template>
    
    <template #footer>
      <div class="flex justify-between w-full">
        <UButton
          color="neutral"
          variant="ghost"
          @click="$emit('cancel')"
        >
          Cancelar
        </UButton>
        
        <UButton
          color="error"
          :loading="deleting"
          :disabled="plan.numOrganizaciones > 0"
          @click="$emit('confirm')"
        >
          Eliminar plan
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Plan } from '~/types/plan';

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  plan: {
    type: Object as PropType<Plan>,
    required: true
  },
  deleting: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:open', 'confirm', 'cancel']);

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});
</script>