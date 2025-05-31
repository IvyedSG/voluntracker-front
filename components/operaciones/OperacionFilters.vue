<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionFilters.vue -->
<template>
    <div class="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-white">Filtros Avanzados</h3>
        <UButton
          icon="i-heroicons-funnel"
          color="gray"
          variant="ghost"
          size="sm"
          @click="toggleCollapsed"
        >
          {{ isCollapsed ? 'Expandir' : 'Contraer' }}
        </UButton>
      </div>
  
      <div v-if="!isCollapsed" class="space-y-4">
        <!-- Filtros principales -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <!-- Búsqueda -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-300 mb-1">Búsqueda</label>
            <UInput
              v-model="localFilters.search"
              placeholder="Buscar operaciones..."
              icon="i-heroicons-magnifying-glass"
              size="md"
              @input="debouncedUpdate"
            />
          </div>
  
          <!-- Tipo -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Tipo</label>
            <USelect
              v-model="localFilters.tipo"
              :options="tipoOptionsWithAll"
              placeholder="Todos"
              size="md"
              @change="updateFilters"
            />
          </div>
  
          <!-- Estado -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Estado</label>
            <USelect
              v-model="localFilters.estado"
              :options="estadoOptionsWithAll"
              placeholder="Todos"
              size="md"
              @change="updateFilters"
            />
          </div>
  
          <!-- Prioridad -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Prioridad</label>
            <USelect
              v-model="localFilters.prioridad"
              :options="prioridadOptionsWithAll"
              placeholder="Todas"
              size="md"
              @change="updateFilters"
            />
          </div>
        </div>
  
        <!-- Filtros secundarios -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Área -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Área</label>
            <USelect
              v-model="localFilters.area"
              :options="areaOptionsWithAll"
              placeholder="Todas"
              size="md"
              @change="updateFilters"
            />
          </div>
  
          <!-- Voluntario -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Voluntario</label>
            <USelect
              v-model="localFilters.voluntario"
              :options="voluntarioOptionsWithAll"
              placeholder="Todos"
              size="md"
              @change="updateFilters"
            />
          </div>
  
          <!-- Fecha inicio -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Desde</label>
            <UInput
              v-model="localFilters.fechaInicio"
              type="date"
              size="md"
              @change="updateFilters"
            />
          </div>
  
          <!-- Fecha fin -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Hasta</label>
            <UInput
              v-model="localFilters.fechaFin"
              type="date"
              size="md"
              @change="updateFilters"
            />
          </div>
        </div>
  
        <!-- Acciones -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-800">
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-400">
              {{ activeFiltersCount }} filtro(s) activo(s)
            </span>
            <UBadge v-if="activeFiltersCount > 0" color="green" variant="subtle" size="sm">
              {{ filteredCount }} resultados
            </UBadge>
          </div>
          
          <div class="flex items-center space-x-2">
            <UButton
              v-if="hasActiveFilters"
              color="gray"
              variant="ghost"
              size="sm"
              @click="clearAllFilters"
            >
              Limpiar todo
            </UButton>
            
            <UButton
              color="green"
              variant="outline"
              size="sm"
              @click="$emit('export')"
            >
              Exportar filtrados
            </UButton>
          </div>
        </div>
  
        <!-- Filtros activos -->
        <div v-if="activeFilters.length > 0" class="flex flex-wrap gap-2">
          <UBadge
            v-for="filter in activeFilters"
            :key="filter.key"
            color="green"
            variant="subtle"
            size="sm"
            class="flex items-center gap-1"
          >
            {{ filter.label }}
            <UButton
              icon="i-heroicons-x-mark"
              size="2xs"
              color="green"
              variant="ghost"
              @click="removeFilter(filter.key)"
            />
          </UBadge>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { debounce } from 'lodash-es';
  
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({})
    },
    tipoOptions: { type: Array, default: () => [] },
    estadoOptions: { type: Array, default: () => [] },
    prioridadOptions: { type: Array, default: () => [] },
    areaOptions: { type: Array, default: () => [] },
    voluntarioOptions: { type: Array, default: () => [] },
    filteredCount: { type: Number, default: 0 }
  });
  
  const emit = defineEmits(['update:modelValue', 'export']);
  
  // Estado local
  const isCollapsed = ref(false);
  const localFilters = ref({
    search: '',
    tipo: null,
    estado: null,
    prioridad: null,
    area: null,
    voluntario: null,
    fechaInicio: null,
    fechaFin: null,
    ...props.modelValue
  });
  
  // Opciones con "Todos"
  const tipoOptionsWithAll = computed(() => [
    { label: 'Todos los tipos', value: null },
    ...props.tipoOptions
  ]);
  
  const estadoOptionsWithAll = computed(() => [
    { label: 'Todos los estados', value: null },
    ...props.estadoOptions
  ]);
  
  const prioridadOptionsWithAll = computed(() => [
    { label: 'Todas las prioridades', value: null },
    ...props.prioridadOptions
  ]);
  
  const areaOptionsWithAll = computed(() => [
    { label: 'Todas las áreas', value: null },
    ...props.areaOptions
  ]);
  
  const voluntarioOptionsWithAll = computed(() => [
    { label: 'Todos los voluntarios', value: null },
    ...props.voluntarioOptions
  ]);
  
  // Verificar filtros activos
  const hasActiveFilters = computed(() => {
    return Object.values(localFilters.value).some(value => value !== null && value !== '');
  });
  
  const activeFiltersCount = computed(() => {
    return Object.values(localFilters.value).filter(value => value !== null && value !== '').length;
  });
  
  // Filtros activos para mostrar
  const activeFilters = computed(() => {
    const active = [];
    
    if (localFilters.value.search) {
      active.push({ key: 'search', label: `"${localFilters.value.search}"` });
    }
    
    if (localFilters.value.tipo) {
      const tipo = props.tipoOptions.find(t => t.value === localFilters.value.tipo);
      active.push({ key: 'tipo', label: tipo?.label });
    }
    
    if (localFilters.value.estado) {
      const estado = props.estadoOptions.find(e => e.value === localFilters.value.estado);
      active.push({ key: 'estado', label: estado?.label });
    }
    
    if (localFilters.value.prioridad) {
      const prioridad = props.prioridadOptions.find(p => p.value === localFilters.value.prioridad);
      active.push({ key: 'prioridad', label: prioridad?.label });
    }
    
    if (localFilters.value.area) {
      const area = props.areaOptions.find(a => a.value === localFilters.value.area);
      active.push({ key: 'area', label: area?.label });
    }
    
    if (localFilters.value.voluntario) {
      const voluntario = props.voluntarioOptions.find(v => v.value === localFilters.value.voluntario);
      active.push({ key: 'voluntario', label: voluntario?.label });
    }
    
    if (localFilters.value.fechaInicio) {
      active.push({ key: 'fechaInicio', label: `Desde: ${localFilters.value.fechaInicio}` });
    }
    
    if (localFilters.value.fechaFin) {
      active.push({ key: 'fechaFin', label: `Hasta: ${localFilters.value.fechaFin}` });
    }
    
    return active;
  });
  
  // Funciones
  const updateFilters = () => {
    emit('update:modelValue', { ...localFilters.value });
  };
  
  const debouncedUpdate = debounce(updateFilters, 300);
  
  const removeFilter = (key) => {
    localFilters.value[key] = key === 'search' ? '' : null;
    updateFilters();
  };
  
  const clearAllFilters = () => {
    localFilters.value = {
      search: '',
      tipo: null,
      estado: null,
      prioridad: null,
      area: null,
      voluntario: null,
      fechaInicio: null,
      fechaFin: null
    };
    updateFilters();
  };
  
  const toggleCollapsed = () => {
    isCollapsed.value = !isCollapsed.value;
  };
  
  // Watchers
  watch(() => props.modelValue, (newValue) => {
    localFilters.value = { ...localFilters.value, ...newValue };
  }, { deep: true });
  </script>