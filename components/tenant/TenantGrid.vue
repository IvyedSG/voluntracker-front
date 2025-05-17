<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <UCard
      v-for="tenant in tenants"
      :key="tenant.id"
      class="border border-gray-800 bg-gray-900/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/10 overflow-hidden"
      :class="{'opacity-60': loading}"
    >
      <!-- Cabecera con color de la organización -->
      <div 
        class="h-2 -mx-4 -mt-4 mb-4"
        :style="{ backgroundColor: tenant.colorPrimario }"
      ></div>
      
      <div class="flex justify-between">
        <!-- Logo y nombre -->
        <div class="flex space-x-3">
          <div class="flex-shrink-0 relative">
            <div 
              class="absolute inset-0 rounded-full"
              :style="`background-color: ${tenant.colorPrimario}15`"
            ></div>
            <NuxtImg 
              class="h-10 w-10 rounded-full object-cover border-2 border-black/30" 
              :src="tenant.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(tenant.nombre)}&background=0D9488&color=ffffff`" 
              :alt="tenant.nombre"
              :style="{ 'border-color': `${tenant.colorPrimario}30` }"
            />
          </div>
          <div>
            <h3 class="text-white font-medium leading-tight">{{ tenant.nombre }}</h3>
            <div class="flex items-center mt-1 text-xs text-gray-400">
              <code class="bg-gray-800/50 px-1.5 py-0.5 rounded">{{ tenant.subdominio }}</code>
              <span class="ml-1 text-gray-500">.voluntracker.org</span>
            </div>
          </div>
        </div>
        
        <!-- Estado -->
        <UBadge 
          :color="tenant.activo ? 'success' : 'warning'" 
          variant="subtle"
          :icon="tenant.activo ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle'"
          size="xl"
        >
          {{ tenant.activo ? 'Activo' : 'Inactivo' }}
        </UBadge>
      </div>
      
      <!-- Información organizativa -->
      <div class="grid grid-cols-3 gap-4 mt-4 py-3 border-t border-b border-gray-800">
        <div class="text-center">
          <div class="text-xs text-gray-400 mb-1">Voluntarios</div>
          <div class="font-semibold">{{ tenant.numVoluntarios }}</div>
        </div>
        <div class="text-center border-x border-gray-800">
          <div class="text-xs text-gray-400 mb-1">Plan</div>
          <UBadge :color="getPlanColor(tenant.plan)" variant="subtle" size="lg">
            {{ tenant.plan }}
          </UBadge>
        </div>
        <div class="text-center">
          <div class="text-xs text-gray-400 mb-1">Creación</div>
          <div class="text-md">{{ formatDate(tenant.fechaCreacion) }}</div>
        </div>
      </div>
      
      <!-- Acciones -->
      <div class="flex justify-between items-center mt-3">
        <UButton 
          color="info" 
          variant="ghost" 
          icon="i-heroicons-arrow-top-right-on-square" 
          size="xl"
          :to="`https://${tenant.subdominio}.voluntracker.org`"
          target="_blank"
        >
          Acceder
        </UButton>
        
        <div class="flex gap-1">
          <UButton 
            color="neutral" 
            variant="ghost" 
            icon="i-heroicons-eye" 
            size="xl"
            @click="$emit('view-tenant', tenant)"
          />
          <UButton 
            color="warning" 
            variant="ghost" 
            icon="i-heroicons-pencil-square" 
            size="xl"
            @click="$emit('edit-tenant', tenant)"
          />
          <UButton 
            :color="tenant.activo ? 'warning' : 'success'" 
            variant="ghost" 
            :icon="tenant.activo ? 'i-heroicons-pause' : 'i-heroicons-play'" 
            size="xl"
            @click="$emit('toggle-status', tenant)"
            :disabled="loading"
          />
          <UButton 
            color="error" 
            variant="ghost" 
            icon="i-heroicons-trash" 
            size="xl"
            @click="$emit('delete-tenant', tenant)"
            :disabled="loading"
          />
        </div>
      </div>
    </UCard>
    
    
    <!-- Estado vacío -->
    <div v-if="tenants.length === 0 && !loading" class="col-span-full p-8 text-center text-gray-400">
      No hay organizaciones para mostrar
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components';

// Definir una interfaz para el tipo Tenant
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

defineProps<{
  tenants: Tenant[];
  loading?: boolean;
}>();

defineEmits<{
  (e: 'view-tenant' | 'edit-tenant' | 'toggle-status' | 'delete-tenant', tenant: Tenant): void;
  (e: 'add-tenant'): void;
}>();

// Método para obtener el color según el plan
function getPlanColor(plan: string): "success" | "warning" | "primary" | "secondary" | "info" | "error" | "neutral" | undefined {
  switch (plan) {
    case 'Premium':
      return 'primary';
    case 'Pro':
      return 'info';
    case 'Básico':
      return 'neutral';
    default:
      return 'neutral';
  }
}

// Formatear fecha
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}
</script>