<template>
  <div class="mb-6 flex flex-col md:flex-row justify-between gap-5 items-start md:items-center">
    <!-- Búsqueda y visualización -->
    <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3">
      <UInput
        v-model="searchModel"
        icon="i-heroicons-magnifying-glass"
        placeholder="Buscar voluntario..."
        class="w-full md:w-80 shadow-md backdrop-blur-lg"
        size="lg"
        color="white"
      />
      <UButtonGroup class="hidden sm:flex bg-gray-800/40 backdrop-blur-md p-1 rounded-xl shadow-md">
        <UButton
          :color="viewModel === 'table' ? 'success' : 'neutral'"
          :variant="viewModel === 'table' ? 'solid' : 'ghost'"
          :icon="viewModel === 'table' ? 'i-heroicons-table-cells-solid' : 'i-heroicons-table-cells'"
          size="lg"
          class="px-4"
          @click="viewModel = 'table'"
        />
        <UButton
          :color="viewModel === 'grid' ? 'success' : 'neutral'"
          :variant="viewModel === 'grid' ? 'solid' : 'ghost'"
          :icon="viewModel === 'grid' ? 'i-heroicons-squares-2x2-solid' : 'i-heroicons-squares-2x2'"
          size="lg" 
          class="px-4"
          @click="viewModel = 'grid'"
        />
      </UButtonGroup>
    </div>

    <!-- Filtros y acciones -->
    <div class="flex flex-wrap gap-3 w-full sm:w-auto">
      <!-- Selector de estado -->
      <USelect
        v-model="estadoModel"
        :items="estadoItems"
        placeholder="Estado"
        icon="i-heroicons-flag"
        size="lg"
        class="w-full sm:w-40 shadow-md backdrop-blur-lg"
        color="white"
      >
        <template #item="{ item }">
          <div class="flex items-center gap-2">
            <UIcon 
              :name="item.icon || ''"
              :class="item.iconClass"  
            />
            <span>{{ item.label }}</span>
          </div>
        </template>
      </USelect>

      <!-- Selector de área -->
      <USelect
        v-model="areaModel"
        :items="areaItems"
        placeholder="Área"
        icon="i-heroicons-briefcase"
        size="lg"
        class="w-full sm:w-52 shadow-md backdrop-blur-lg"
        color="white"
      >
        <template #item="{ item }">
          <div class="flex items-center gap-2">
            <span>{{ item.label }}</span>
          </div>
        </template>
      </USelect>

      <UButton
        v-if="hasActiveFilters"
        color="neutral"
        variant="soft"
        icon="i-heroicons-funnel"
        size="lg"
        class="shadow-md backdrop-blur-lg"
        @click="resetAllFilters"
      >
        Limpiar
      </UButton>
      <UButton
        color="success"
        variant="solid"
        icon="i-heroicons-user-plus"
        size="lg"
        class="shadow-md backdrop-blur-lg"
        @click="emit('add')"
      >
        Añadir
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Props
const props = defineProps({
  // Props para v-model
  modelValue: {
    type: Object,
    default: () => ({
      search: '',
      estado: null,
      area: null,
      viewMode: 'table'
    })
  },
  // Opciones para selects
  estadoOptions: {
    type: Array,
    default: () => []
  },
  areaOptions: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue', 'add', 'reset']);

// Modelos computados bidireccionales
const searchModel = computed({
  get: () => props.modelValue.search || '',
  set: (value) => updateModelValue({ search: value })
});

const estadoModel = computed({
  get: () => props.modelValue.estado === null ? 'all' : props.modelValue.estado,
  set: (value) => {
    const estado = value === 'all' ? null : value;
    updateModelValue({ estado });
  }
});

const areaModel = computed({
  get: () => props.modelValue.area === null ? 'all' : props.modelValue.area,
  set: (value) => {
    const area = value === 'all' ? null : value;
    updateModelValue({ area });
  }
});

const viewModel = computed({
  get: () => props.modelValue.viewMode || 'table',
  set: (value) => updateModelValue({ viewMode: value })
});

// Función para actualizar el modelValue
function updateModelValue(newValues: any) {
  emit('update:modelValue', {
    ...props.modelValue,
    ...newValues
  });
}

// Verificar si hay filtros activos
const hasActiveFilters = computed(() => {
  return props.modelValue.search || 
         props.modelValue.estado !== null || 
         props.modelValue.area !== null;
});

// Items para el selector de estado
const estadoItems = computed(() => {
  const items = [
    {
      label: 'Todos los estados',
      value: 'all',
      icon: 'i-heroicons-adjustments-horizontal',
      iconClass: 'text-gray-400'
    }
  ];
  
  return items.concat((props.estadoOptions as Array<{ label: string; value: string }>).map((option) => {
    const isActivo = option.value === 'activo';
    return {
      label: option.label,
      value: option.value,
      icon: isActivo ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle',
      iconClass: isActivo ? 'text-green-500' : 'text-yellow-500'
    };
  }));
});

// Items para el selector de área
const areaItems = computed(() => {
  const items = [
    {
      label: 'Todas las áreas',
      value: 'all',
      iconClass: 'text-gray-400'
    }
  ];
  
  return items.concat(
    (props.areaOptions as Array<{ label: string; value: string }>).map(option => ({
      label: option.label,
      value: option.value,
      iconClass: ''
    }))
  );
});
// Resetear todos los filtros
function resetAllFilters() {
  updateModelValue({
    search: '',
    estado: null,
    area: null
  });
  emit('reset');
}

// Exponer métodos para control desde el componente padre
defineExpose({
  resetFilters: resetAllFilters
});
</script>