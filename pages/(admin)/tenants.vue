<template>
  <div>
    <!-- Vista de opciones y sumatoria -->
    <div class="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Tarjetas resumen -->
      <UCard
        class="bg-gradient-to-br from-emerald-800/20 to-emerald-700/10 border border-emerald-800/30 shadow-lg"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-emerald-400">Organizaciones activas</div>
            <div class="text-2xl font-bold mt-1">{{ tenantsStats.activos }}</div>
            <div class="mt-1 text-xs text-emerald-300/70">
              <span class="flex items-center">
                <UIcon name="i-heroicons-arrow-up" class="mr-0.5" />
                <span>↑ {{ tenantsStats.nuevosUltimaSemana }} nuevas esta semana</span>
              </span>
            </div>
          </div>
          <div class="bg-emerald-700/20 p-3 rounded-xl">
            <UIcon name="i-heroicons-building-office-2" class="h-6 w-6 text-emerald-400" />
          </div>
        </div>
      </UCard>

      <UCard
        class="bg-gradient-to-br from-blue-800/20 to-blue-700/10 border border-blue-800/30 shadow-lg"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-blue-400">Voluntarios totales</div>
            <div class="text-2xl font-bold mt-1">{{ tenantsStats.totalVoluntarios.toLocaleString() }}</div>
            <div class="mt-1 text-xs text-blue-300/70 flex items-center">
              <UIcon name="i-heroicons-user-group" class="mr-0.5" />
              <span>Promedio de {{ tenantsStats.promedioVoluntarios }} por ONG</span>
            </div>
          </div>
          <div class="bg-blue-700/20 p-3 rounded-xl">
            <UIcon name="i-heroicons-users" class="h-6 w-6 text-blue-400" />
          </div>
        </div>
      </UCard>

      <UCard
        class="bg-gradient-to-br from-purple-800/20 to-purple-700/10 border border-purple-800/30 shadow-lg"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-purple-400">Planes Premium</div>
            <div class="text-2xl font-bold mt-1">{{ tenantsStats.premium }}</div>
            <div class="mt-1 text-xs text-purple-300/70 flex items-center">
              <UIcon name="i-heroicons-currency-dollar" class="mr-0.5" />
              <span>{{ tenantsStats.porcentajePremium }}% del total</span>
            </div>
          </div>
          <div class="bg-purple-700/20 p-3 rounded-xl">
            <UIcon name="i-heroicons-star" class="h-6 w-6 text-purple-400" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Controles de vista y búsqueda -->
    <div class="mb-6 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
      <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Buscar organización..."
          class="w-full md:w-80"
          @update:model-value="filterTenants"
        />
        <UButtonGroup class="hidden sm:flex">
          <UButton
            :color="viewMode === 'table' ? 'success' : 'neutral'"
            variant="ghost"
            :icon="viewMode === 'table' ? 'i-heroicons-table-cells-solid' : 'i-heroicons-table-cells'"
            @click="viewMode = 'table'"
          />
          <UButton
            :color="viewMode === 'grid' ? 'success' : 'neutral'"
            variant="ghost"
            :icon="viewMode === 'grid' ? 'i-heroicons-squares-2x2-solid' : 'i-heroicons-squares-2x2'"
            @click="viewMode = 'grid'"
          />
        </UButtonGroup>
      </div>

      <div class="flex flex-wrap gap-2">
        <USelectMenu
          v-model="filters.status"
          :options="statusOptions"
          placeholder="Estado"
          class="w-28 sm:w-40"
          @update:model-value="filterTenants"
        />
        <USelectMenu
          v-model="filters.plan"
          :options="planOptions"
          placeholder="Plan"
          class="w-28 sm:w-40"
          @update:model-value="filterTenants"
        />
        <UButton
          v-if="Object.values(filters).some(Boolean) || searchQuery"
          color="neutral"
          variant="ghost"
          icon="i-heroicons-funnel"
          @click="resetFilters"
        >
          Limpiar
        </UButton>
        <UButton
          color="success"
          variant="solid"
          icon="i-heroicons-plus"
          @click="openAddTenantModal"
        >
          Añadir
        </UButton>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="p-8 flex justify-center items-center h-52">
      <div class="flex flex-col items-center">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-green-500 mb-3"/>
        <p class="text-gray-400">Cargando organizaciones...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="p-8 text-center h-52 flex flex-col items-center justify-center">
      <UIcon name="i-heroicons-exclamation-triangle" class="h-10 w-10 text-red-500 mx-auto mb-3"/>
      <p class="text-red-400 mb-4">{{ error }}</p>
      <UButton color="success" @click="fetchTenants">
        Reintentar
      </UButton>
    </div>

    <!-- Empty state -->
    <div v-else-if="filteredTenants.length === 0" class="p-8 text-center h-52 flex flex-col items-center justify-center">
      <UIcon name="i-heroicons-building-office-2" class="h-10 w-10 text-gray-500 mx-auto mb-3"/>
      <h3 class="text-lg font-medium text-gray-300 mb-1">No hay organizaciones</h3>
      <p class="text-gray-400 mb-4">
        {{ searchQuery || Object.values(filters).some(Boolean) 
          ? 'No se encontraron organizaciones con los filtros actuales.' 
          : 'Crea una nueva organización para comenzar.' }}
      </p>
      <UButton
v-if="!searchQuery && !Object.values(filters).some(Boolean)"
               color="success" @click="openAddTenantModal">
        Añadir Organización
      </UButton>
    </div>

    <!-- Tenant list -->
    <div v-else>
      <!-- Vista de tabla -->
      <TenantTable 
        v-if="viewMode === 'table'" 
        :tenants="paginatedTenants" 
        :loading="isTableLoading"
        @view-tenant="openTenantDetailModal"
        @edit-tenant="openEditTenantModal"
        @toggle-status="toggleTenantStatus"
        @delete-tenant="confirmDeleteTenant"
      />

      <TenantGrid 
        v-else 
        :tenants="paginatedTenants" 
        :loading="isTableLoading"
        @view-tenant="openTenantDetailModal"
        @edit-tenant="openEditTenantModal"
        @toggle-status="toggleTenantStatus"
        @delete-tenant="confirmDeleteTenant"
        @add-tenant="openAddTenantModal"
      />

      <!-- Paginación -->
      <div class="mt-6 px-4 py-3 bg-gray-900/30 border border-gray-800 rounded-lg flex items-center justify-between">
        <div class="text-sm text-gray-400">
          Mostrando <span class="font-medium text-white">{{ paginatedTenants.length }}</span> de <span class="font-medium text-white">{{ filteredTenants.length }}</span> organizaciones
        </div>
        <UPagination 
          v-model:page="currentPage" 
          :total="filteredTenants.length" 
          :items-per-page="itemsPerPage"
          color="neutral"
          active-color="success"
          active-variant="solid"
          variant="ghost"
          size="sm"
          :sibling-count="1"
        />
      </div>
    </div>

    <!-- Modales -->
    <TenantAddModal 
      v-model:open="isAddTenantModalOpen" 
      :saving="isSaving"
      @save="saveTenant"
    />

    <TenantEditModal 
      v-if="editingTenant"
      v-model:open="isEditTenantModalOpen" 
      :tenant="editingTenant"
      :saving="isSaving"
      @update="updateTenant"
    />

    <TenantDetailModal 
      v-if="selectedTenant"
      v-model:open="isTenantDetailModalOpen" 
      :tenant="selectedTenant"
      @edit="openEditTenantModal(selectedTenant)"
      @toggle-status="toggleTenantStatus"
    />

    <!-- Modal de confirmación para eliminar -->
    <TenantDeleteModal
      v-if="tenantToDelete"
      v-model:open="isDeleteConfirmOpen"
      :tenant="tenantToDelete"
      :deleting="isDeleting"
      @confirm="deleteTenant"
      @cancel="tenantToDelete = null"
    />

    <!-- Modal de confirmación para eliminar -->
    <UModal v-model="isDeleteConfirmOpen" prevent-close>
      <template #header>
        <div class="flex items-center">
          <UIcon name="i-heroicons-exclamation-triangle" class="mr-2 text-red-500" />
          <h3 class="text-lg font-medium">Confirmar eliminación</h3>
        </div>
      </template>
      
      <template #body>
        <div class="space-y-4">
          <p>¿Estás seguro de que deseas eliminar la organización <span class="font-semibold text-white">{{ tenantToDelete?.nombre }}</span>?</p>
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
            @click="isDeleteConfirmOpen = false"
          >
            Cancelar
          </UButton>
          <UButton 
            color="error" 
            :loading="isDeleting" 
            @click="deleteTenant"
          >
            Eliminar permanentemente
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// Estados de visualización
const viewMode = ref('table') // 'table' o 'grid'
const currentPage = ref(1)
const itemsPerPage = 8
const isTableLoading = ref(false)

// Estados para datos de tenants
const tenants = ref<Tenant[]>([])
const selectedTenant = ref<Tenant | null>(null)
const tenantToDelete = ref<Tenant | null>(null)

// Estados de UI
const isLoading = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')
const filters = reactive({
  status: null as boolean | null,
  plan: null as string | null
})

// Estados de modales
const isAddTenantModalOpen = ref(false)
const isEditTenantModalOpen = ref(false)
const isTenantDetailModalOpen = ref(false)
const isDeleteConfirmOpen = ref(false)

// Opciones para filtros
const statusOptions = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false }
]

const planOptions = [
  { label: 'Gratuito', value: 'Gratuito' },
  { label: 'Pro', value: 'Pro' },
  { label: 'Premium', value: 'Premium' }
]

// Referencia temporal al tenant en edición
const editingTenant = ref<Tenant | null>(null)

// Calcular estadísticas de los tenants
const tenantsStats = computed(() => {
  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  
  const activos = tenants.value.filter(t => t.activo).length
  const nuevosUltimaSemana = tenants.value.filter(t => 
    new Date(t.fechaCreacion) >= oneWeekAgo
  ).length
  
  const totalVoluntarios = tenants.value.reduce((sum, t) => sum + t.numVoluntarios, 0)
  const promedioVoluntarios = Math.round(totalVoluntarios / (tenants.value.length || 1))
  
  const premium = tenants.value.filter(t => t.plan === 'Premium').length
  const porcentajePremium = Math.round((premium / tenants.value.length) * 100) || 0
  
  return {
    activos,
    nuevosUltimaSemana,
    totalVoluntarios,
    promedioVoluntarios,
    premium,
    porcentajePremium
  }
})

// Filtrado de tenants según búsqueda y filtros
const filteredTenants = computed(() => {
  let filtered = [...tenants.value]
  
  // Aplicar búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(tenant => 
      tenant.nombre.toLowerCase().includes(query) || 
      tenant.subdominio.toLowerCase().includes(query) ||
      tenant.correo.toLowerCase().includes(query)
    )
  }
  
  // Aplicar filtros
  if (filters.status !== null) {
    filtered = filtered.filter(tenant => tenant.activo === filters.status)
  }
  
  if (filters.plan) {
    filtered = filtered.filter(tenant => tenant.plan === filters.plan)
  }
  
  return filtered
})

// Paginación
const paginatedTenants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTenants.value.slice(start, end)
})

// Resetear filtros
function resetFilters() {
  searchQuery.value = ''
  filters.status = null
  filters.plan = null
  currentPage.value = 1
}

// Filtrar tenants
function filterTenants() {
  currentPage.value = 1 // Resetear paginación al cambiar filtros
}

// Abrir modal de detalles
function openTenantDetailModal(tenant: Tenant) {
  selectedTenant.value = tenant
  isTenantDetailModalOpen.value = true
}

// Abrir modal de edición
function openEditTenantModal(tenant: Tenant) {
  editingTenant.value = JSON.parse(JSON.stringify(tenant)) // Copia profunda
  isEditTenantModalOpen.value = true
}

// Abrir modal para añadir
function openAddTenantModal() {
  isAddTenantModalOpen.value = true
}

// Cambiar estado (activar/desactivar)
async function toggleTenantStatus(tenant: Tenant) {
  const newStatus = !tenant.activo
  const action = newStatus ? 'activar' : 'desactivar'
  
  try {
    isTableLoading.value = true
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Actualizar estado en la lista
    const index = tenants.value.findIndex(t => t.id === tenant.id)
    if (index !== -1) {
      tenants.value[index].activo = newStatus
    }
    
    // Si el tenant en detalle es el que se está modificando, actualizar también
    if (selectedTenant.value?.id === tenant.id) {
      selectedTenant.value.activo = newStatus
    }
    
    // Mostrar mensaje de éxito
    useToast().add({
      title: `Organización ${newStatus ? 'activada' : 'desactivada'}`,
      description: `${tenant.nombre} ha sido ${action}da correctamente`,
      icon: 'i-heroicons-check-circle',
      color: newStatus ? 'success' : 'warning'
    })
  } catch (err) {
    console.error(`Error al ${action} tenant:`, err)
    useToast().add({
      title: 'Error',
      description: `No se pudo ${action} la organización`,
      icon: 'i-heroicons-exclamation-triangle',
      color: 'error'
    })
  } finally {
    isTableLoading.value = false
  }
}

// Confirmar eliminación
function confirmDeleteTenant(tenant: Tenant) {
  console.log('Confirmando eliminación de tenant:', tenant);
  tenantToDelete.value = tenant;
  isDeleteConfirmOpen.value = true;
}

// Guardar nuevo tenant
async function saveTenant(newTenant: NewTenant) {
  isSaving.value = true
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Crear nuevo tenant con datos del formulario
    const newTenantData: Tenant = {
      id: Date.now().toString(),
      nombre: newTenant.nombre,
      logo: newTenant.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(newTenant.nombre)}&background=0D9488&color=ffffff`,
      subdominio: newTenant.subdominio,
      correo: newTenant.correo,
      fechaCreacion: new Date().toISOString(),
      plan: newTenant.plan,
      numVoluntarios: 0,
      activo: true,
      colorPrimario: newTenant.colorPrimario || '#0D9488'
    }
    
    tenants.value.unshift(newTenantData)
    isAddTenantModalOpen.value = false
    
    // Mostrar mensaje de éxito
    useToast().add({
      title: 'Organización creada',
      description: `${newTenant.nombre} ha sido añadida correctamente`,
      icon: 'i-heroicons-check-circle',
      color: 'success'
    })
  } catch (err) {
    console.error('Error al crear tenant:', err)
    useToast().add({
      title: 'Error',
      description: 'No se pudo crear la organización',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'error'
    })
  } finally {
    isSaving.value = false
  }
}

// Actualizar tenant existente
async function updateTenant(updatedTenant: Tenant) {
  if (!updatedTenant) return
  
  isSaving.value = true
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Actualizar tenant en la lista
    const index = tenants.value.findIndex(t => t.id === updatedTenant.id)
    if (index !== -1) {
      tenants.value[index] = { ...updatedTenant }
    }
    
    // Si el tenant en detalle es el que se está modificando, actualizar también
    if (selectedTenant.value?.id === updatedTenant.id) {
      selectedTenant.value = { ...updatedTenant }
    }
    
    isEditTenantModalOpen.value = false
    
    // Mostrar mensaje de éxito
    useToast().add({
      title: 'Organización actualizada',
      description: `${updatedTenant.nombre} ha sido actualizada correctamente`,
      icon: 'i-heroicons-check-circle',
      color: 'info'
    })
  } catch (err) {
    console.error('Error al actualizar tenant:', err)
    useToast().add({
      title: 'Error',
      description: 'No se pudo actualizar la organización',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'error'
    })
  } finally {
    isSaving.value = false
  }
}

// Eliminar tenant
async function deleteTenant() {
  if (!tenantToDelete.value) return;
  
  isDeleting.value = true;
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Eliminar tenant de la lista
    tenants.value = tenants.value.filter(t => t.id !== tenantToDelete.value?.id);
    
    isDeleteConfirmOpen.value = false;
    
    // Si el tenant eliminado estaba siendo mostrado en detalle, cerrar modal
    if (selectedTenant.value?.id === tenantToDelete.value.id) {
      isTenantDetailModalOpen.value = false;
    }
    
    // Mostrar mensaje de éxito
    useToast().add({
      title: 'Organización eliminada',
      description: `${tenantToDelete.value.nombre} ha sido eliminada permanentemente`,
      icon: 'i-heroicons-check-circle',
      color: 'error'
    });
    
    tenantToDelete.value = null;
  } catch (err) {
    console.error('Error al eliminar tenant:', err);
    useToast().add({
      title: 'Error',
      description: 'No se pudo eliminar la organización',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'error'
    });
  } finally {
    isDeleting.value = false;
  }
}

// Cargar datos de tenants
const fetchTenants = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Simular una llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Datos de ejemplo
    tenants.value = [
      {
        id: '1',
        nombre: 'Cruz Roja Argentina',
        logo: 'https://i.pravatar.cc/150?u=tenant1',
        subdominio: 'cruzroja',
        correo: 'admin@cruzroja.org',
        fechaCreacion: '2023-06-12T10:30:00Z',
        plan: 'Premium',
        numVoluntarios: 156,
        activo: true,
        colorPrimario: '#e34850'
      },
      {
        id: '2',
        nombre: 'Fundación Esperanza',
        logo: 'https://i.pravatar.cc/150?u=tenant2',
        subdominio: 'esperanza',
        correo: 'contacto@esperanza.org',
        fechaCreacion: '2023-08-15T14:15:00Z',
        plan: 'Pro',
        numVoluntarios: 78,
        activo: true,
        colorPrimario: '#3b82f6'
      },
      {
        id: '3',
        nombre: 'Voluntarios Unidos',
        logo: 'https://i.pravatar.cc/150?u=tenant3',
        subdominio: 'vol-unidos',
        correo: 'info@vol-unidos.org',
        fechaCreacion: '2023-10-21T09:45:00Z',
        plan: 'Gratuito',
        numVoluntarios: 24,
        activo: false,
        colorPrimario: '#16a34a'
      },
      {
        id: '4',
        nombre: 'Greenpeace Local',
        logo: 'https://i.pravatar.cc/150?u=tenant4',
        subdominio: 'greenpeace-local',
        correo: 'contacto@greenpeace-local.org',
        fechaCreacion: '2024-01-08T11:30:00Z',
        plan: 'Premium',
        numVoluntarios: 98,
        activo: true,
        colorPrimario: '#15803d'
      },
      {
        id: '5',
        nombre: 'Cáritas Diocesana',
        logo: 'https://i.pravatar.cc/150?u=tenant5',
        subdominio: 'caritas',
        correo: 'admin@caritas.org',
        fechaCreacion: '2024-03-17T16:20:00Z',
        plan: 'Pro',
        numVoluntarios: 112,
        activo: true,
        colorPrimario: '#dc2626'
      },
      {
        id: '6',
        nombre: 'Médicos Sin Fronteras',
        logo: 'https://i.pravatar.cc/150?u=tenant6',
        subdominio: 'msf',
        correo: 'info@msf.org',
        fechaCreacion: '2023-09-03T08:20:00Z',
        plan: 'Premium',
        numVoluntarios: 203,
        activo: true,
        colorPrimario: '#0284c7'
      },
      {
        id: '7',
        nombre: 'Protectora de Animales',
        logo: 'https://i.pravatar.cc/150?u=tenant7',
        subdominio: 'protectora',
        correo: 'contacto@protectora.org',
        fechaCreacion: '2023-11-11T15:40:00Z',
        plan: 'Gratuito',
        numVoluntarios: 45,
        activo: true,
        colorPrimario: '#854d0e'
      }
    ]
  } catch (err) {
    console.error('Error al cargar tenants:', err)
    error.value = 'No se pudieron cargar las organizaciones. Intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}

// Interfaces
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

interface NewTenant {
  nombre: string;
  logo?: string;
  subdominio: string;
  correo: string;
  plan: string;
  colorPrimario?: string;
}

// Cargar datos al montar el componente
onMounted(() => {
  fetchTenants()
})
</script>