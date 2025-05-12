<template>
  <UModal v-model:open="isOpen" :dismissible="false">
    <template #header>
      <div class="flex items-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="mr-2 text-red-500" />
        <h3 class="text-lg font-medium">Confirmar eliminación</h3>
      </div>
    </template>
    
    <template #body>
      <div class="space-y-4">
        <p>¿Estás seguro de que deseas eliminar la organización <span class="font-semibold text-white">{{ tenant.nombre }}</span>?</p>
        <div class="bg-red-950/30 border border-red-900/50 rounded-lg p-3 text-sm">
          <p class="text-red-300">
            <UIcon name="i-heroicons-exclamation-circle" class="inline mr-1 -mt-0.5" />
            Esta acción eliminará permanentemente todos los datos asociados, incluyendo:
          </p>
          <ul class="list-disc ml-8 mt-2 text-red-200/90 space-y-1">
            <li>Todos los voluntarios registrados</li>
            <li>Historial de eventos y actividades</li>
            <li>Configuraciones y personalización</li>
            <li>El schema en la base de datos</li>
          </ul>
        </div>
      </div>
    </template>
    
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton 
          color="neutral" 
          variant="ghost" 
          @click="cancel"
        >
          Cancelar
        </UButton>
        <UButton 
          color="error" 
          :loading="deleting" 
          @click="confirm"
        >
          Eliminar permanentemente
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Tipo para el tenant
interface Tenant {
  id: string;
  nombre: string;
  logo: string;
  subdominio: string;
  correo: string;
  fechaCreacion: string;
  plan: string;
  numVoluntarios: number;
  activo: boolean;
  colorPrimario: string;
}

// Props
const props = defineProps<{
  tenant: Tenant;
  open: boolean;
  deleting?: boolean;
}>();

// Emits
const emit = defineEmits<{
  (e: 'update:open', open: boolean): void;
  (e: 'confirm' | 'cancel'): void;
}>();

// Estado del modal
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});

// Confirmar eliminación
function confirm() {
  emit('confirm');
}

// Cancelar eliminación
function cancel() {
  emit('cancel');
  isOpen.value = false;
}
</script>