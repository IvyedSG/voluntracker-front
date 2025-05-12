<template>
  <div class="overflow-hidden border border-gray-800 rounded-lg bg-gray-900/50 shadow-lg">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-800/60">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Organización
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
              Subdominio
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">
              Fecha
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Plan
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
              Voluntarios
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Estado
            </th>
            <th class="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-800">
          <tr 
            v-for="tenant in tenants" 
            :key="tenant.id" 
            class="hover:bg-gray-800/30 transition-colors"
            :class="{'opacity-60': loading}"
          >
            <td class="px-4 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 relative">
                  <div 
                    class="absolute inset-0 rounded-full"
                    :style="`background-color: ${tenant.colorPrimario}15`"
                  ></div>
                  <img 
                    class="h-10 w-10 rounded-full object-cover border-2 border-black/30" 
                    :src="tenant.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(tenant.nombre)}&background=0D9488&color=ffffff`" 
                    :alt="tenant.nombre"
                    :style="{ 'border-color': `${tenant.colorPrimario}30` }"
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-white">{{ tenant.nombre }}</div>
                  <div class="text-sm text-gray-400 hidden sm:block">{{ tenant.correo }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-4 whitespace-nowrap hidden md:table-cell">
              <div class="flex items-center text-sm text-gray-300">
                <code class="bg-gray-800/50 px-2 py-0.5 rounded text-xs">{{ tenant.subdominio }}</code>
                <span class="ml-1 text-gray-500">.voluntracker.org</span>
              </div>
            </td>
            <td class="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
              <div class="text-sm text-gray-300">{{ formatDate(tenant.fechaCreacion) }}</div>
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
              <UBadge :color="getPlanColor(tenant.plan)" variant="subtle">
                {{ tenant.plan }}
              </UBadge>
            </td>
            <td class="px-4 py-4 whitespace-nowrap hidden md:table-cell">
              <div class="text-sm text-gray-300">
                <span class="font-semibold">{{ tenant.numVoluntarios }}</span>
              </div>
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
              <UBadge 
                :color="tenant.activo ? 'success' : 'warning'" 
                variant="subtle"
                :icon="tenant.activo ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle'"
              >
                {{ tenant.activo ? 'Activo' : 'Inactivo' }}
              </UBadge>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-right">
              <div class="flex justify-end gap-1">
                <UTooltip text="Acceder como superadmin">
                  <UButton 
                    color="info" 
                    variant="ghost" 
                    icon="i-heroicons-arrow-top-right-on-square" 
                    size="xl"
                    :to="`https://${tenant.subdominio}.voluntracker.org`"
                    target="_blank"
                  />
                </UTooltip>
                <UTooltip text="Ver detalles">
                  <UButton 
                    color="neutral" 
                    variant="ghost" 
                    icon="i-heroicons-eye" 
                    size="xl"
                    @click="$emit('view-tenant', tenant)"
                  />
                </UTooltip>
                <UTooltip text="Editar">
                  <UButton 
                    color="warning" 
                    variant="ghost" 
                    icon="i-heroicons-pencil-square" 
                    size="xl"
                    @click="$emit('edit-tenant', tenant)"
                  />
                </UTooltip>
                <UTooltip :text="tenant.activo ? 'Desactivar' : 'Activar'">
                  <UButton 
                    :color="tenant.activo ? 'warning' : 'success'" 
                    variant="ghost" 
                    :icon="tenant.activo ? 'i-heroicons-pause' : 'i-heroicons-play'" 
                    size="xl"
                    @click="$emit('toggle-status', tenant)"
                    :disabled="loading"
                  />
                </UTooltip>
                <UTooltip text="Eliminar">
                  <UButton 
                    color="error" 
                    variant="ghost" 
                    icon="i-heroicons-trash" 
                    size="lg"
                    @click="$emit('delete-tenant', tenant)"
                    :disabled="loading"
                  />
                </UTooltip>
              </div>
            </td>
          </tr>
          <!-- Estado vacío o skeleton cuando está cargando -->
          <tr v-if="tenants.length === 0 && !loading">
            <td colspan="7" class="px-4 py-8 text-center text-gray-400">
              No hay organizaciones para mostrar
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
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
}>();

// Método para obtener el color según el plan
function getPlanColor(plan: string): "success" | "warning" | "primary" | "secondary" | "info" | "error" | "neutral" | undefined {
  switch (plan) {
    case 'Premium':
      return 'warning';
    case 'Pro':
      return 'info';
    case 'Gratuito':
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