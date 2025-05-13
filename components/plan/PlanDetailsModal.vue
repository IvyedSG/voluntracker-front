<template>
  <UModal 
    v-model:open="isOpen" 
    :ui="{ wrapper: 'max-w-3xl' }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center">
          <div 
            class="h-14 w-14 rounded-lg flex items-center justify-center mr-4 shadow-lg"
            :style="{ 
              backgroundColor: `${plan.color}30`,
              boxShadow: `0 0 15px ${plan.color}30`
            }"
          >
            <UIcon
              :name="plan.icono"
              class="text-2xl"
              :style="{ color: plan.color }"
            />
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">{{ plan.nombre }}</h3>
            <div class="flex items-center mt-1">
              <UBadge 
                v-if="plan.activo" 
                color="success" 
                variant="subtle"
                size="sm"
                class="mr-2"
              >
                Activo
              </UBadge>
              <UBadge 
                v-else 
                color="warning" 
                variant="subtle"
                size="sm"
                class="mr-2"
              >
                Inactivo
              </UBadge>
              <span class="text-sm text-gray-400">
                Creado el {{ formatDate(plan.fechaCreacion) }}
              </span>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div v-if="plan.precio === 0" class="text-xl font-bold text-white">Gratis</div>
          <div v-else class="flex items-baseline justify-end">
            <span 
              class="text-xl font-bold"
              :style="{ color: plan.color }"
            >
              {{ formatCurrency(plan.precio, plan.moneda) }}
            </span>
            <span class="text-gray-400 ml-1 text-sm">/ {{ plan.periodoFacturacion === 'mensual' ? 'mes' : 'año' }}</span>
          </div>
          <span class="text-sm text-gray-500">{{ plan.numOrganizaciones }} {{ plan.numOrganizaciones === 1 ? 'organización' : 'organizaciones' }}</span>
        </div>
      </div>
    </template>
    
    <template #body>
      <div>
        <div class="px-6 py-4 border-b border-gray-800">
          <h4 class="text-lg font-medium text-white mb-2">Descripción</h4>
          <p class="text-gray-300">{{ plan.descripcion }}</p>
        </div>
        
        <div class="px-6 py-4 border-b border-gray-800">
          <h4 class="text-lg font-medium text-white mb-4">Características</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <div 
              v-for="(caracteristica, index) in plan.caracteristicas" 
              :key="index" 
              class="flex items-start"
            >
              <UIcon 
                :name="caracteristica.incluido ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                :class="caracteristica.incluido ? 'text-green-500' : 'text-gray-600'"
                class="mt-0.5 mr-2 flex-shrink-0"
              />
              <span :class="caracteristica.incluido ? 'text-gray-300' : 'text-gray-500'">
                {{ caracteristica.texto }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 border-b border-gray-800">
          <h4 class="text-lg font-medium text-white mb-4">Detalles técnicos</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <div class="text-sm text-gray-500 mb-1">Organizadores</div>
              <div class="text-white">
                {{ plan.maxOrganizadores === -1 ? 'Ilimitados' : `Hasta ${plan.maxOrganizadores}` }}
              </div>
            </div>
            
            <div>
              <div class="text-sm text-gray-500 mb-1">Voluntarios</div>
              <div class="text-white">
                {{ plan.maxVoluntarios === -1 ? 'Ilimitados' : `Hasta ${plan.maxVoluntarios}` }}
              </div>
            </div>
            
            <div>
              <div class="text-sm text-gray-500 mb-1">Eventos</div>
              <div class="text-white">
                {{ plan.maxEventos === -1 ? 'Ilimitados' : `Hasta ${plan.maxEventos} por mes` }}
              </div>
            </div>
            
            <div>
              <div class="text-sm text-gray-500 mb-1">Almacenamiento</div>
              <div class="text-white">
                {{ formatStorage(plan.almacenamiento) }}
              </div>
            </div>
            
            <div>
              <div class="text-sm text-gray-500 mb-1">Soporte prioritario</div>
              <div class="flex items-center">
                <UIcon 
                  :name="plan.soportePrioritario ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                  :class="plan.soportePrioritario ? 'text-green-500' : 'text-gray-600'"
                  class="mr-2"
                />
                <span class="text-white">{{ plan.soportePrioritario ? 'Incluido' : 'No incluido' }}</span>
              </div>
            </div>
            
            <div>
              <div class="text-sm text-gray-500 mb-1">Reportes avanzados</div>
              <div class="flex items-center">
                <UIcon 
                  :name="plan.reportesAvanzados ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                  :class="plan.reportesAvanzados ? 'text-green-500' : 'text-gray-600'"
                  class="mr-2"
                />
                <span class="text-white">{{ plan.reportesAvanzados ? 'Incluido' : 'No incluido' }}</span>
              </div>
            </div>
            
            <div>
              <div class="text-sm text-gray-500 mb-1">Personalización</div>
              <div class="flex items-center">
                <UIcon 
                  :name="plan.personalizacion ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                  :class="plan.personalizacion ? 'text-green-500' : 'text-gray-600'"
                  class="mr-2"
                />
                <span class="text-white">{{ plan.personalizacion ? 'Completa' : 'Limitada' }}</span>
              </div>
            </div>
            
            <div>
              <div class="text-sm text-gray-500 mb-1">Acceso API</div>
              <div class="flex items-center">
                <UIcon 
                  :name="plan.apiAccess ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                  :class="plan.apiAccess ? 'text-green-500' : 'text-gray-600'"
                  class="mr-2"
                />
                <span class="text-white">{{ plan.apiAccess ? 'Incluido' : 'No incluido' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <template #footer>
      <div class="flex justify-between w-full">
        <UButton
          color="primary"
          variant="outline"
          @click="$emit('close')"
        >
          Cerrar
        </UButton>
        
        <div class="flex gap-2">
          <UButton
            v-if="plan.numOrganizaciones > 0"
            color="primary"
            icon="i-heroicons-users"
            @click="$emit('view-orgs', plan); $emit('close')"
          >
            Ver organizaciones
          </UButton>
          
          <UButton
            color="warning"
            icon="i-heroicons-pencil-square"
            @click="$emit('edit', plan); $emit('close')"
          >
            Editar plan
          </UButton>
        </div>
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
  }
});

const emit = defineEmits(['update:open', 'close', 'edit', 'view-orgs']);

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});

// Formatear fecha
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Formatear moneda
function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Formatear almacenamiento
function formatStorage(megabytes: number) {
  if (megabytes >= 1000) {
    return `${megabytes / 1000} GB`;
  }
  return `${megabytes} MB`;
}
</script>