<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionDayModal.vue -->
<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
    
    <!-- Modal container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div 
        class="relative w-full max-w-3xl transform overflow-hidden rounded-lg bg-gray-900 border border-gray-800 shadow-xl transition-all"
        @click.stop
      >
        <div class="max-h-[80vh] overflow-y-auto">
          <!-- Header -->
          <div class="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 z-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center">
                  <UIcon name="i-heroicons-calendar-days" class="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h2 class="text-xl font-semibold text-white">
                    {{ formatSelectedDate(selectedDate) }}
                  </h2>
                  <p class="text-gray-400 text-sm">
                    {{ operaciones.length }} operación(es) programada(s)
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <UButton
                  icon="i-heroicons-plus"
                  color="green"
                  variant="ghost"
                  @click="$emit('add')"
                >
                  Nueva Operación
                </UButton>
                <UButton
                  icon="i-heroicons-x-mark"
                  color="gray"
                  variant="ghost"
                  @click="$emit('close')"
                />
              </div>
            </div>

            <!-- Filtros y estadísticas rápidas -->
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <!-- Filtro por estado -->
                <USelect
                  v-model="filtroEstado"
                  :options="estadoFilterOptions"
                  size="sm"
                  class="w-36"
                  placeholder="Todos los estados"
                />

                <!-- Filtro por prioridad -->
                <USelect
                  v-model="filtroPrioridad"
                  :options="prioridadFilterOptions"
                  size="sm"
                  class="w-36"
                  placeholder="Todas las prioridades"
                />

                <!-- Filtro por área -->
                <USelect
                  v-model="filtroArea"
                  :options="areaFilterOptions"
                  size="sm"
                  class="w-36"
                  placeholder="Todas las áreas"
                />
              </div>

              <!-- Estadísticas rápidas -->
              <div class="flex items-center space-x-4 text-sm">
                <div class="flex items-center space-x-1">
                  <div class="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span class="text-gray-400">{{ completadasCount }} completadas</span>
                </div>
                <div class="flex items-center space-x-1">
                  <div class="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span class="text-gray-400">{{ enProgresoCount }} en progreso</span>
                </div>
                <div class="flex items-center space-x-1">
                  <div class="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span class="text-gray-400">{{ vencidasCount }} vencidas</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <!-- Lista de operaciones -->
            <template v-if="operacionesFiltradas.length > 0">
              <div class="space-y-4">
                <!-- Operaciones agrupadas por horario -->
                <div
                  v-for="grupo in operacionesAgrupadas"
                  :key="grupo.periodo"
                  class="border border-gray-800 rounded-lg overflow-hidden"
                >
                  <!-- Encabezado del grupo -->
                  <div class="bg-gray-800/50 px-4 py-2 border-b border-gray-800">
                    <div class="flex items-center justify-between">
                      <h3 class="font-medium text-white flex items-center">
                        <UIcon :name="getPeriodoIcon(grupo.periodo)" class="h-4 w-4 mr-2" />
                        {{ grupo.periodo }}
                      </h3>
                      <UBadge color="gray" variant="subtle" size="sm">
                        {{ grupo.operaciones.length }} operaciones
                      </UBadge>
                    </div>
                  </div>

                  <!-- Operaciones del grupo -->
                  <div class="divide-y divide-gray-800">
                    <div
                      v-for="operacion in grupo.operaciones"
                      :key="operacion.id"
                      class="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                      @click="$emit('detail', operacion)"
                    >
                      <div class="flex items-start justify-between">
                        <!-- Información principal -->
                        <div class="flex items-start space-x-3 flex-1">
                          <div
                            class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            :class="getTipoClasses(operacion.tipo)"
                          >
                            <UIcon :name="getTipoIcon(operacion.tipo)" class="h-4 w-4" />
                          </div>

                          <div class="flex-1 min-w-0">
                            <div class="flex items-center space-x-2 mb-1">
                              <h4 class="text-sm font-medium text-white truncate">
                                {{ operacion.nombreActividad }}
                              </h4>
                              <UBadge :color="getPrioridadColor(operacion.prioridad)" variant="subtle" size="xs">
                                {{ getPrioridadLabel(operacion.prioridad) }}
                              </UBadge>
                            </div>

                            <p class="text-xs text-gray-400 line-clamp-2 mb-2">
                              {{ operacion.descripcion }}
                            </p>

                            <div class="flex items-center space-x-4 text-xs text-gray-400">
                              <div class="flex items-center space-x-1">
                                <UIcon name="i-heroicons-user" class="h-3 w-3" />
                                <span>{{ operacion.voluntarioNombre }}</span>
                              </div>
                              <div class="flex items-center space-x-1">
                                <UIcon name="i-heroicons-building-office" class="h-3 w-3" />
                                <span>{{ operacion.area }}</span>
                              </div>
                              <div class="flex items-center space-x-1">
                                <UIcon name="i-heroicons-clock" class="h-3 w-3" />
                                <span>{{ operacion.horasEstimadas }}h estimadas</span>
                              </div>
                              <div v-if="operacion.ubicacion" class="flex items-center space-x-1">
                                <UIcon name="i-heroicons-map-pin" class="h-3 w-3" />
                                <span>{{ operacion.ubicacion }}</span>
                              </div>
                            </div>

                            <!-- Progreso -->
                            <div v-if="operacion.estado === 'en_progreso'" class="mt-3">
                              <div class="flex items-center justify-between text-xs mb-1">
                                <span class="text-gray-400">Progreso</span>
                                <span class="text-white font-medium">{{ operacion.progreso }}%</span>
                              </div>
                              <div class="w-full bg-gray-700 rounded-full h-1.5">
                                <div 
                                  :class="getProgresoColor(operacion.progreso)"
                                  class="h-1.5 rounded-full transition-all duration-300"
                                  :style="{ width: `${operacion.progreso}%` }"
                                ></div>
                              </div>
                            </div>

                            <!-- Tags -->
                            <div v-if="operacion.tags && operacion.tags.length" class="flex flex-wrap gap-1 mt-2">
                              <UBadge
                                v-for="tag in operacion.tags.slice(0, 3)"
                                :key="tag"
                                color="blue"
                                variant="subtle"
                                size="xs"
                              >
                                {{ tag }}
                              </UBadge>
                              <UBadge
                                v-if="operacion.tags.length > 3"
                                color="gray"
                                variant="subtle"
                                size="xs"
                              >
                                +{{ operacion.tags.length - 3 }}
                              </UBadge>
                            </div>
                          </div>
                        </div>

                        <!-- Acciones y estado -->
                        <div class="flex items-start space-x-3 ml-4">
                          <div class="text-right">
                            <UBadge :color="getEstadoColor(operacion.estado)" variant="subtle" size="sm">
                              {{ getEstadoLabel(operacion.estado) }}
                            </UBadge>
                            
                            <!-- Advertencias -->
                            <div class="mt-1 space-y-1">
                              <UBadge
                                v-if="isVencida(operacion)"
                                color="red"
                                variant="subtle"
                                size="xs"
                                class="flex items-center"
                              >
                                <UIcon name="i-heroicons-exclamation-triangle" class="h-3 w-3 mr-1" />
                                Vencida
                              </UBadge>
                              
                              <UBadge
                                v-else-if="isProximaAVencer(operacion)"
                                color="yellow"
                                variant="subtle"
                                size="xs"
                                class="flex items-center"
                              >
                                <UIcon name="i-heroicons-clock" class="h-3 w-3 mr-1" />
                                Por vencer
                              </UBadge>
                            </div>
                          </div>

                          <!-- Dropdown de acciones -->
                          <UDropdown :items="getActionItems(operacion)" @click.stop>
                            <UButton
                              icon="i-heroicons-ellipsis-vertical"
                              size="xs"
                              color="gray"
                              variant="ghost"
                            />
                          </UDropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Estado vacío -->
            <template v-else>
              <div class="text-center py-12">
                <div class="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <UIcon name="i-heroicons-calendar-days" class="h-8 w-8 text-gray-400" />
                </div>
                <h3 class="text-lg font-medium text-white mb-2">
                  {{ operaciones.length === 0 ? 'No hay operaciones programadas' : 'No hay operaciones que coincidan con los filtros' }}
                </h3>
                <p class="text-gray-400 mb-4">
                  {{ operaciones.length === 0 
                    ? 'No se encontraron operaciones para este día.' 
                    : 'Prueba ajustando los filtros para ver más resultados.' }}
                </p>
                <UButton
                  icon="i-heroicons-plus"
                  color="green"
                  @click="$emit('add')"
                >
                  Crear Nueva Operación
                </UButton>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  selectedDate: { type: String, default: null },
  operaciones: { type: Array, default: () => [] }
});

const emit = defineEmits(['close', 'detail', 'edit', 'add', 'progress', 'delete']);

// Estado de filtros
const filtroEstado = ref('');
const filtroPrioridad = ref('');
const filtroArea = ref('');

// Opciones de filtros
const estadoFilterOptions = [
  { label: 'Todos los estados', value: '' },
  { label: 'Pendiente', value: 'pendiente' },
  { label: 'En Progreso', value: 'en_progreso' },
  { label: 'Completada', value: 'completada' },
  { label: 'Cancelada', value: 'cancelada' }
];

const prioridadFilterOptions = [
  { label: 'Todas las prioridades', value: '' },
  { label: 'Baja', value: 'baja' },
  { label: 'Media', value: 'media' },
  { label: 'Alta', value: 'alta' },
  { label: 'Crítica', value: 'critica' }
];

const areaFilterOptions = computed(() => {
  const areas = [...new Set(props.operaciones.map(op => op.area))];
  return [
    { label: 'Todas las áreas', value: '' },
    ...areas.map(area => ({ label: area, value: area }))
  ];
});

// Computadas
const operacionesFiltradas = computed(() => {
  return props.operaciones.filter(operacion => {
    if (filtroEstado.value && operacion.estado !== filtroEstado.value) return false;
    if (filtroPrioridad.value && operacion.prioridad !== filtroPrioridad.value) return false;
    if (filtroArea.value && operacion.area !== filtroArea.value) return false;
    return true;
  });
});

const operacionesAgrupadas = computed(() => {
  const grupos = {
    'Mañana (6:00 - 12:00)': [],
    'Tarde (12:00 - 18:00)': [],
    'Noche (18:00 - 24:00)': [],
    'Madrugada (0:00 - 6:00)': []
  };

  operacionesFiltradas.value.forEach(operacion => {
    // Para este ejemplo, distribuimos aleatoriamente
    // En un caso real, se basaría en la hora de inicio de la operación
    const hora = Math.floor(Math.random() * 24);
    
    if (hora >= 6 && hora < 12) {
      grupos['Mañana (6:00 - 12:00)'].push(operacion);
    } else if (hora >= 12 && hora < 18) {
      grupos['Tarde (12:00 - 18:00)'].push(operacion);
    } else if (hora >= 18 && hora < 24) {
      grupos['Noche (18:00 - 24:00)'].push(operacion);
    } else {
      grupos['Madrugada (0:00 - 6:00)'].push(operacion);
    }
  });

  return Object.entries(grupos)
    .filter(([_, operaciones]) => operaciones.length > 0)
    .map(([periodo, operaciones]) => ({ periodo, operaciones }));
});

// Estadísticas
const completadasCount = computed(() => 
  operacionesFiltradas.value.filter(op => op.estado === 'completada').length
);

const enProgresoCount = computed(() => 
  operacionesFiltradas.value.filter(op => op.estado === 'en_progreso').length
);

const vencidasCount = computed(() => 
  operacionesFiltradas.value.filter(op => isVencida(op)).length
);

// Funciones de utilidad
const formatSelectedDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getPeriodoIcon = (periodo) => {
  if (periodo.includes('Mañana')) return 'i-heroicons-sun';
  if (periodo.includes('Tarde')) return 'i-heroicons-sun';
  if (periodo.includes('Noche')) return 'i-heroicons-moon';
  return 'i-heroicons-moon';
};

const getTipoIcon = (tipo) => {
  const iconos = {
    'tarea': 'i-heroicons-clipboard-document-check',
    'proyecto': 'i-heroicons-folder',
    'seguimiento': 'i-heroicons-eye'
  };
  return iconos[tipo] || 'i-heroicons-document';
};

const getTipoClasses = (tipo) => {
  const clases = {
    'tarea': 'bg-blue-900/30 text-blue-400',
    'proyecto': 'bg-purple-900/30 text-purple-400',
    'seguimiento': 'bg-yellow-900/30 text-yellow-400'
  };
  return clases[tipo] || 'bg-gray-900/30 text-gray-400';
};

const getEstadoColor = (estado) => {
  const colores = {
    'pendiente': 'yellow',
    'en_progreso': 'blue',
    'completada': 'green',
    'cancelada': 'red'
  };
  return colores[estado] || 'gray';
};

const getEstadoLabel = (estado) => {
  const labels = {
    'pendiente': 'Pendiente',
    'en_progreso': 'En Progreso',
    'completada': 'Completada',
    'cancelada': 'Cancelada'
  };
  return labels[estado] || estado;
};

const getPrioridadColor = (prioridad) => {
  const colores = {
    'baja': 'green',
    'media': 'yellow',
    'alta': 'orange',
    'critica': 'red'
  };
  return colores[prioridad] || 'gray';
};

const getPrioridadLabel = (prioridad) => {
  const labels = {
    'baja': 'Baja',
    'media': 'Media',
    'alta': 'Alta',
    'critica': 'Crítica'
  };
  return labels[prioridad] || prioridad;
};

const getProgresoColor = (progreso) => {
  if (progreso >= 80) return 'bg-green-600';
  if (progreso >= 50) return 'bg-yellow-600';
  if (progreso >= 25) return 'bg-orange-600';
  return 'bg-red-600';
};

const isVencida = (operacion) => {
  if (!props.selectedDate) return false;
  return operacion.fechaVencimiento < props.selectedDate && 
         operacion.estado !== 'completada' && 
         operacion.estado !== 'cancelada';
};

const isProximaAVencer = (operacion) => {
  if (!props.selectedDate) return false;
  const selectedDateObj = new Date(props.selectedDate);
  const vencimiento = new Date(operacion.fechaVencimiento);
  const diffTime = vencimiento - selectedDateObj;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= 3 && diffDays > 0 && 
         operacion.estado !== 'completada' && 
         operacion.estado !== 'cancelada';
};

const getActionItems = (operacion) => {
  return [
    [{
      label: 'Ver detalles',
      icon: 'i-heroicons-eye',
      click: () => emit('detail', operacion)
    }],
    [{
      label: 'Editar',
      icon: 'i-heroicons-pencil',
      click: () => emit('edit', operacion)
    }],
    [{
      label: 'Actualizar progreso',
      icon: 'i-heroicons-chart-bar',
      click: () => emit('progress', operacion)
    }],
    [{
      label: 'Eliminar',
      icon: 'i-heroicons-trash',
      click: () => emit('delete', operacion)
    }]
  ];
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
