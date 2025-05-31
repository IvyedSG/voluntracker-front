<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionCalendar.vue -->
<template>
    <div class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      <!-- Header del calendario -->
      <div class="p-4 border-b border-gray-800">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h3 class="text-lg font-semibold text-white">
              {{ monthNames[currentMonth] }} {{ currentYear }}
            </h3>
            <div class="flex items-center space-x-1">
              <UButton
                icon="i-heroicons-chevron-left"
                size="sm"
                color="gray"
                variant="ghost"
                @click="previousMonth"
              />
              <UButton
                size="sm"
                color="gray"
                variant="ghost"
                @click="goToToday"
              >
                Hoy
              </UButton>
              <UButton
                icon="i-heroicons-chevron-right"
                size="sm"
                color="gray"
                variant="ghost"
                @click="nextMonth"
              />
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <!-- Leyenda -->
            <div class="flex items-center space-x-3 text-xs">
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-blue-600 rounded"></div>
                <span class="text-gray-400">En Progreso</span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-green-600 rounded"></div>
                <span class="text-gray-400">Completadas</span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-red-600 rounded"></div>
                <span class="text-gray-400">Vencidas</span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-yellow-600 rounded"></div>
                <span class="text-gray-400">Por vencer</span>
              </div>
            </div>
            
            <!-- Vista -->
            <USelect
              v-model="viewMode"
              :options="viewOptions"
              size="sm"
              class="w-32"
            />
          </div>
        </div>
      </div>
  
      <!-- Calendario -->
      <div class="p-4">
        <!-- Vista mensual -->
        <div v-if="viewMode === 'month'" class="grid grid-cols-7 gap-1">
          <!-- Encabezados de días -->
          <div
            v-for="day in dayNames"
            :key="day"
            class="p-2 text-center text-xs font-medium text-gray-400 uppercase"
          >
            {{ day }}
          </div>
  
          <!-- Días del calendario -->
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="aspect-square min-h-[100px] border border-gray-800 rounded p-1 transition-colors hover:bg-gray-800/30"
            :class="getDayClasses(day)"
            @click="selectDay(day)"
          >
            <!-- Número del día -->
            <div class="flex items-center justify-between mb-1">
              <span 
                class="text-sm font-medium"
                :class="getDayNumberClasses(day)"
              >
                {{ day.date }}
              </span>
              <div v-if="getDayOperationsCount(day) > 0" class="flex space-x-1">
                <UBadge
                  color="gray"
                  variant="subtle"
                  size="xs"
                >
                  {{ getDayOperationsCount(day) }}
                </UBadge>
              </div>
            </div>
  
            <!-- Operaciones del día -->
            <div class="space-y-1 overflow-hidden">
              <div
                v-for="operacion in getDayOperations(day).slice(0, 3)"
                :key="operacion.id"
                class="text-xs p-1 rounded cursor-pointer truncate transition-colors"
                :class="getOperacionClasses(operacion)"
                :title="operacion.nombreActividad"
                @click.stop="$emit('detail', operacion)"
              >
                {{ operacion.nombreActividad }}
              </div>
              <div
                v-if="getDayOperations(day).length > 3"
                class="text-xs text-gray-400 text-center"
              >
                +{{ getDayOperations(day).length - 3 }} más
              </div>
            </div>
          </div>
        </div>
  
        <!-- Vista semanal -->
        <div v-else-if="viewMode === 'week'" class="grid grid-cols-8 gap-1">
          <!-- Encabezado de horas -->
          <div class="p-2"></div>
          <div
            v-for="day in weekDays"
            :key="day.fullDate"
            class="p-2 text-center border-b border-gray-800"
          >
            <div class="text-xs text-gray-400">{{ dayNames[day.dayOfWeek] }}</div>
            <div 
              class="text-sm font-medium"
              :class="day.isToday ? 'text-green-400' : 'text-white'"
            >
              {{ day.date }}
            </div>
          </div>
  
          <!-- Horas y eventos -->
          <template v-for="hour in 24" :key="hour">
            <!-- Hora -->
            <div class="p-2 text-xs text-gray-400 text-right border-r border-gray-800">
              {{ String(hour - 1).padStart(2, '0') }}:00
            </div>
            
            <!-- Días -->
            <div
              v-for="day in weekDays"
              :key="`${day.fullDate}-${hour}`"
              class="min-h-[40px] border-r border-b border-gray-800 p-1 relative"
            >
              <!-- Operaciones en esta hora -->
              <div
                v-for="operacion in getHourOperations(day, hour - 1)"
                :key="operacion.id"
                class="absolute inset-x-1 text-xs p-1 rounded cursor-pointer truncate"
                :class="getOperacionClasses(operacion)"
                :title="operacion.nombreActividad"
                @click="$emit('detail', operacion)"
              >
                {{ operacion.nombreActividad }}
              </div>
            </div>
          </template>
        </div>
  
        <!-- Vista de agenda -->
        <div v-else class="space-y-4">
          <div
            v-for="day in agendaDays"
            :key="day.fullDate"
            class="border border-gray-800 rounded-lg overflow-hidden"
          >
            <!-- Encabezado del día -->
            <div class="bg-gray-800/50 p-3 border-b border-gray-800">
              <div class="flex items-center justify-between">
                <h4 class="font-medium text-white">
                  {{ formatAgendaDate(day.fullDate) }}
                </h4>
                <UBadge color="gray" variant="subtle" size="sm">
                  {{ getDayOperations(day).length }} operaciones
                </UBadge>
              </div>
            </div>
  
            <!-- Operaciones del día -->
            <div class="p-3">
              <div v-if="getDayOperations(day).length === 0" class="text-center py-8 text-gray-500">
                No hay operaciones programadas
              </div>
              <div v-else class="space-y-2">
                <div
                  v-for="operacion in getDayOperations(day)"
                  :key="operacion.id"
                  class="flex items-center justify-between p-3 bg-gray-800/30 rounded border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                  @click="$emit('detail', operacion)"
                >
                  <div class="flex items-center space-x-3">
                    <div 
                      class="w-3 h-3 rounded-full"
                      :class="getOperacionDotColor(operacion)"
                    ></div>
                    <div>
                      <h5 class="text-sm font-medium text-white">{{ operacion.nombreActividad }}</h5>
                      <p class="text-xs text-gray-400">{{ operacion.voluntarioNombre }} • {{ operacion.area }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <UBadge :color="getEstadoColor(operacion.estado)" variant="subtle" size="xs">
                      {{ getEstadoLabel(operacion.estado) }}
                    </UBadge>
                    <UBadge :color="getPrioridadColor(operacion.prioridad)" variant="subtle" size="xs">
                      {{ getPrioridadLabel(operacion.prioridad) }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Modal de día seleccionado -->
    <OperacionDayModal
      v-model="showDayModal"
      :selected-date="selectedDate"
      :operaciones="selectedDayOperations"
      @close="showDayModal = false"
      @detail="$emit('detail', $event)"
      @edit="$emit('edit', $event)"
      @add="$emit('add')"
    />
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import OperacionDayModal from './OperacionDayModal.vue';
  
  const props = defineProps({
    operaciones: {
      type: Array,
      default: () => []
    }
  });
  
  const emit = defineEmits(['detail', 'edit', 'add']);
  
  // Estado
  const currentDate = ref(new Date());
  const currentMonth = ref(new Date().getMonth());
  const currentYear = ref(new Date().getFullYear());
  const viewMode = ref('month');
  const showDayModal = ref(false);
  const selectedDate = ref(null);
  
  // Constantes
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  const viewOptions = [
    { label: 'Mes', value: 'month' },
    { label: 'Semana', value: 'week' },
    { label: 'Agenda', value: 'agenda' }
  ];
  
  // Computadas
  const calendarDays = computed(() => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1);
    const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
  
    const days = [];
    const current = new Date(startDate);
  
    for (let i = 0; i < 42; i++) {
      days.push({
        date: current.getDate(),
        fullDate: current.toISOString().split('T')[0],
        isCurrentMonth: current.getMonth() === currentMonth.value,
        isToday: current.toDateString() === new Date().toDateString(),
        dayOfWeek: current.getDay()
      });
      current.setDate(current.getDate() + 1);
    }
  
    return days;
  });
  
  const weekDays = computed(() => {
    const startOfWeek = new Date(currentDate.value);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push({
        date: day.getDate(),
        fullDate: day.toISOString().split('T')[0],
        isToday: day.toDateString() === new Date().toDateString(),
        dayOfWeek: day.getDay()
      });
    }
  
    return days;
  });
  
  const agendaDays = computed(() => {
    const days = [];
    const start = new Date(currentYear.value, currentMonth.value, 1);
    const end = new Date(currentYear.value, currentMonth.value + 1, 0);
  
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOperations = getDayOperations({ fullDate: d.toISOString().split('T')[0] });
      if (dayOperations.length > 0) {
        days.push({
          fullDate: d.toISOString().split('T')[0],
          date: d.getDate()
        });
      }
    }
  
    return days;
  });
  
  const selectedDayOperations = computed(() => {
    if (!selectedDate.value) return [];
    return getDayOperations({ fullDate: selectedDate.value });
  });
  
  // Funciones
  const getDayOperations = (day) => {
    return props.operaciones.filter(op => {
      const fechaInicio = op.fechaInicio;
      const fechaVencimiento = op.fechaVencimiento;
      return day.fullDate >= fechaInicio && day.fullDate <= fechaVencimiento;
    });
  };
  
  const getDayOperationsCount = (day) => {
    return getDayOperations(day).length;
  };
  
  const getHourOperations = (day, hour) => {
    // Para esta demo, distribuimos las operaciones a lo largo del día
    const dayOps = getDayOperations(day);
    return dayOps.filter((_, index) => index % 24 === hour);
  };
  
  const getDayClasses = (day) => {
    return {
      'bg-gray-800/50': !day.isCurrentMonth,
      'bg-gray-700/30': day.isToday,
      'cursor-pointer': day.isCurrentMonth
    };
  };
  
  const getDayNumberClasses = (day) => {
    return {
      'text-gray-500': !day.isCurrentMonth,
      'text-green-400 font-bold': day.isToday,
      'text-white': day.isCurrentMonth && !day.isToday
    };
  };
  
  const getOperacionClasses = (operacion) => {
    const baseClasses = 'hover:opacity-80';
    
    if (isVencida(operacion)) {
      return `${baseClasses} bg-red-600 text-white`;
    }
    
    if (isProximaAVencer(operacion)) {
      return `${baseClasses} bg-yellow-600 text-white`;
    }
    
    switch (operacion.estado) {
      case 'completada':
        return `${baseClasses} bg-green-600 text-white`;
      case 'en_progreso':
        return `${baseClasses} bg-blue-600 text-white`;
      case 'cancelada':
        return `${baseClasses} bg-gray-600 text-white`;
      default:
        return `${baseClasses} bg-gray-700 text-gray-300`;
    }
  };
  
  const getOperacionDotColor = (operacion) => {
    if (isVencida(operacion)) return 'bg-red-600';
    if (isProximaAVencer(operacion)) return 'bg-yellow-600';
    
    switch (operacion.estado) {
      case 'completada': return 'bg-green-600';
      case 'en_progreso': return 'bg-blue-600';
      case 'cancelada': return 'bg-gray-600';
      default: return 'bg-gray-500';
    }
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
  
  const isVencida = (operacion) => {
    const hoy = new Date().toISOString().split('T')[0];
    return operacion.fechaVencimiento < hoy && 
           operacion.estado !== 'completada' && 
           operacion.estado !== 'cancelada';
  };
  
  const isProximaAVencer = (operacion) => {
    const hoy = new Date();
    const vencimiento = new Date(operacion.fechaVencimiento);
    const diffTime = vencimiento - hoy;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 3 && diffDays > 0 && 
           operacion.estado !== 'completada' && 
           operacion.estado !== 'cancelada';
  };
  
  const formatAgendaDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const selectDay = (day) => {
    if (!day.isCurrentMonth) return;
    
    selectedDate.value = day.fullDate;
    showDayModal.value = true;
  };
  
  const previousMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11;
      currentYear.value--;
    } else {
      currentMonth.value--;
    }
  };
  
  const nextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0;
      currentYear.value++;
    } else {
      currentMonth.value++;
    }
  };
  
  const goToToday = () => {
    const today = new Date();
    currentMonth.value = today.getMonth();
    currentYear.value = today.getFullYear();
    currentDate.value = today;
  };
  
  // Watchers
  watch([currentMonth, currentYear], () => {
    currentDate.value = new Date(currentYear.value, currentMonth.value, 1);
  });
  </script>