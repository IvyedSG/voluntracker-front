<template>
  <UModal 
    v-model:open="isOpen" 
    :dismissible="true"
    title="Detalles de organización"
    size="lg"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <UIcon name="i-heroicons-building-office-2" class="mr-3 text-green-500 text-2xl" />
          <h3 class="text-xl font-medium">Detalles de organización</h3>
        </div>
        <UBadge 
          :color="tenant.activo ? 'success' : 'warning'" 
          variant="subtle"
          size="lg"
          :icon="tenant.activo ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle'"
        >
          {{ tenant.activo ? 'Activo' : 'Inactivo' }}
        </UBadge>
      </div>
    </template>
    
    <template #body>
      <div class="space-y-7">
        <!-- Cabecera con info principal -->
        <div class="flex items-center">
          <div 
            class="h-20 w-20 rounded-xl flex-shrink-0 relative overflow-hidden border-2 border-gray-800 shadow-lg"
            :style="{ 'border-color': `${tenant.colorPrimario}40` }"
          >
            <div 
              class="absolute inset-0 opacity-20" 
              :style="{ backgroundColor: tenant.colorPrimario }"
            ></div>
            <img 
              :src="tenant.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(tenant.nombre)}&background=0D9488&color=ffffff`" 
              :alt="tenant.nombre"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="ml-5">
            <h2 class="text-2xl font-bold text-white">{{ tenant.nombre }}</h2>
            <div class="flex items-center mt-2 text-gray-400 text-base">
              <UIcon name="i-heroicons-globe-alt" class="mr-2 text-lg" />
              <span>
                <code class="bg-gray-800/50 px-2 py-1 rounded text-sm">{{ tenant.subdominio }}</code>
                <span class="text-gray-500 ml-1">.voluntracker.org</span>
              </span>
            </div>
          </div>
        </div>
        
        <!-- Estadísticas rápidas -->
        <div class="grid grid-cols-3 gap-5 p-5 bg-gray-800/30 rounded-lg border border-gray-800 shadow-inner">
          <div class="text-center">
            <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">Voluntarios</div>
            <div class="text-2xl font-semibold">{{ tenant.numVoluntarios }}</div>
          </div>
          <div class="text-center border-x border-gray-800">
            <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">Plan</div>
            <UBadge :color="getPlanColor(tenant.plan)" variant="subtle" size="xl">
              {{ tenant.plan }}
            </UBadge>
          </div>
          <div class="text-center">
            <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">Creado</div>
            <div class="text-base">{{ formatDate(tenant.fechaCreacion) }}</div>
          </div>
        </div>
        
        <!-- Información detallada -->
        <div class="space-y-4">
          <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400">Información de contacto</h4>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            <div class="space-y-2 p-4 bg-gray-800/20 rounded-lg border border-gray-800">
              <div class="text-sm text-gray-500">Email principal</div>
              <div class="flex items-center">
                <UIcon name="i-heroicons-envelope" class="mr-2 text-gray-400 text-xl" />
                <a :href="`mailto:${tenant.correo}`" class="text-lg text-blue-400 hover:text-blue-300 transition-colors">
                  {{ tenant.correo }}
                </a>
              </div>
            </div>
            
            <div class="space-y-2 p-4 bg-gray-800/20 rounded-lg border border-gray-800">
              <div class="text-sm text-gray-500">Enlace de acceso</div>
              <div class="flex items-center">
                <UIcon name="i-heroicons-link" class="mr-2 text-gray-400 text-xl" />
                <a 
                  :href="`https://${tenant.subdominio}.voluntracker.org`" 
                  target="_blank"
                  class="text-lg text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {{ tenant.subdominio }}.voluntracker.org
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Color primario -->
        <div class="space-y-3">
          <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400">Configuración de marca</h4>
          <div class="flex items-center p-4 bg-gray-800/20 rounded-lg border border-gray-800">
            <div class="text-base text-gray-300 mr-4">Color primario:</div>
            <div 
              class="h-10 w-10 rounded-full border-2 border-gray-700 shadow-md" 
              :style="{ backgroundColor: tenant.colorPrimario }"
            ></div>
            <div class="text-base font-mono text-gray-400 ml-3">{{ tenant.colorPrimario }}</div>
          </div>
        </div>
        
      </div>
    </template>
    
    <template #footer>
      <div class="flex justify-between w-full py-1">
        <UButton
          color="neutral"
          variant="ghost"
          size="lg"
          @click="isOpen = false"
        >
          Cerrar
        </UButton>
        
        <UButton
          color="warning"
          icon="i-heroicons-pencil-square"
          size="lg"
          @click="$emit('edit', tenant)"
        >
          Editar organización
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
const props = defineProps<{
  tenant: {
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
  };
  open: boolean;
}>();

// Emits
const emit = defineEmits<{
  (e: 'update:open', open: boolean): void;
  (e: 'edit' | 'toggle-status', tenant: { 
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
  }): void;
}>();

// Estado del modal
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});

// Método para obtener el color según el plan
function getPlanColor(plan: string): "success" | "warning" | "primary" | "secondary" | "info" | "error" | "neutral" | undefined {
  switch (plan) {
    case 'Premium':
      return 'primary'
    case 'Pro':
      return 'info'
    case 'Básico':
      return 'neutral'
    default:
      return 'neutral'
  }
}

// Formatear fecha
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
</script>