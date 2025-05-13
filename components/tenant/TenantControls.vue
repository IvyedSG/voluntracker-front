<template>
  <div class="mb-6 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
    <!-- Búsqueda y visualización -->
    <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Buscar organización..."
        class="w-full md:w-80"
        @update:model-value="emitSearch"
      />
      <UButtonGroup class="hidden sm:flex">
        <UButton
          :color="viewMode === 'table' ? 'success' : 'neutral'"
          variant="ghost"
          :icon="viewMode === 'table' ? 'i-heroicons-table-cells-solid' : 'i-heroicons-table-cells'"
          @click="updateViewMode('table')"
        />
        <UButton
          :color="viewMode === 'grid' ? 'success' : 'neutral'"
          variant="ghost"
          :icon="viewMode === 'grid' ? 'i-heroicons-squares-2x2-solid' : 'i-heroicons-squares-2x2'"
          @click="updateViewMode('grid')"
        />
      </UButtonGroup>
    </div>

    <!-- Filtros y acciones -->
    <div class="flex flex-wrap gap-2">
      <!-- Selector de estado -->
      <USelect
        v-model="filters.status"
        :items="statusItems"
        placeholder="Estado"
        icon="i-heroicons-flag"
        size="md"
        class="w-28 sm:w-40"
        @update:model-value="emitFilters"
      >
        <template #item="{ item }">
          <div class="flex items-center gap-2">
            <UIcon 
              :name="getIconName(item.icon)"
              :class="item.iconClass"  
            />
            <span>{{ item.label }}</span>
          </div>
        </template>
      </USelect>

      <!-- Selector de plan -->
      <USelect
        v-model="filters.plan"
        :items="planItems"
        placeholder="Plan"
        icon="i-heroicons-cube"
        size="md"
        class="w-28 sm:w-40"
        @update:model-value="emitFilters"
      >
        <template #item="{ item }">
          <div class="flex items-center gap-2">
            <UIcon 
              :name="getIconName(item.icon)"
              :class="item.iconClass"  
            />
            <span>{{ item.label }}</span>
          </div>
        </template>
      </USelect>

      <UButton
        v-if="Object.values(filters).some(Boolean) || searchQuery"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-funnel"
        @click="resetAllFilters"
      >
        Limpiar
      </UButton>
      <UButton
        color="success"
        variant="solid"
        icon="i-heroicons-plus"
        @click="$emit('add')"
      >
        Añadir
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import type { TenantFilters } from '~/composables/useTenant';

// Interfaz mejorada sin 'any'
interface SelectItem {
  label: string;
  value: string | number | boolean | null;
  icon?: string;
  iconClass?: string;
  disabled?: boolean;
}

const props = defineProps<{
  statusOptions: { label: string; value: boolean }[];
  planOptions: { label: string; value: string }[];
  initialViewMode?: 'table' | 'grid';
}>();

const emit = defineEmits<{
  (e: 'search', query: string): void;
  (e: 'filter', filters: TenantFilters): void;
  (e: 'view-mode-change', mode: 'table' | 'grid'): void;
  (e: 'reset' | 'add'): void;
}>();

// Estado local
const searchQuery = ref('');
const viewMode = ref<'table' | 'grid'>(props.initialViewMode || 'table');
const filters = reactive<TenantFilters>({
  status: null,
  plan: null
});

// Función para garantizar que el nombre del icono siempre sea un string
function getIconName(icon?: string): string {
  return icon || 'i-heroicons-question-mark-circle';
}

// Transformar las opciones en formato adecuado para USelect
const statusItems = computed<SelectItem[]>(() => {
  const items: SelectItem[] = [
    {
      label: 'Todos',
      value: null,
      icon: 'i-heroicons-adjustments-horizontal',
      iconClass: 'text-gray-400'
    }
  ];
  
  return items.concat(props.statusOptions.map(option => ({
    label: option.label,
    value: option.value,
    icon: option.value ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle',
    iconClass: option.value ? 'text-green-500' : 'text-yellow-500'
  })));
});

const planItems = computed<SelectItem[]>(() => {
  const items: SelectItem[] = [
    {
      label: 'Todos los planes',
      value: null,
      icon: 'i-heroicons-squares-2x2',
      iconClass: 'text-gray-400'
    }
  ];
  
  return items.concat(props.planOptions.map(option => {
    let icon = 'i-heroicons-gift';
    let iconClass = 'text-gray-400';
    
    if (option.value === 'Premium') {
      icon = 'i-heroicons-star';
      iconClass = 'text-amber-400';
    } else if (option.value === 'Pro') {
      icon = 'i-heroicons-rocket-launch';
      iconClass = 'text-blue-400';
    }
    
    return {
      label: option.label,
      value: option.value,
      icon,
      iconClass
    };
  }));
});

// Emitir eventos
function emitSearch() {
  emit('search', searchQuery.value);
}

function emitFilters() {
  emit('filter', { ...filters });
}

function resetAllFilters() {
  searchQuery.value = '';
  filters.status = null;
  filters.plan = null;
  emit('reset');
}

function updateViewMode(mode: 'table' | 'grid') {
  viewMode.value = mode;
  emit('view-mode-change', mode);
}

// Exponer métodos para control desde el componente padre
defineExpose({
  resetFilters: resetAllFilters
});
</script>