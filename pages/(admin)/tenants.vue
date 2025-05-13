<template>
  <div>
    <!-- Vista de estadísticas -->
    <TenantStats 
      :stats="tenantsStats" 
      :total-orgs="tenants.length" 
      class="mb-6" 
    />

    <!-- Controles de vista y búsqueda -->
    <TenantControls
      :status-options="statusOptions"
      :plan-options="planOptions"
      :initial-view-mode="viewMode"
      @search="handleSearch"
      @filter="handleFilter"
      @reset="resetFilters"
      @view-mode-change="viewMode = $event"
      @add="openAddTenantModal"
      ref="tenantControlsRef"
    />

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
      <UButton color="success" @click="loadTenants">
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
        color="success" 
        @click="openAddTenantModal"
      >
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
        @toggle-status="handleToggleTenantStatus"
        @delete-tenant="confirmDeleteTenant"
      />

      <TenantGrid 
        v-else 
        :tenants="paginatedTenants" 
        :loading="isTableLoading"
        @view-tenant="openTenantDetailModal"
        @edit-tenant="openEditTenantModal"
        @toggle-status="handleToggleTenantStatus"
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
      @update="handleUpdateTenant"
    />

    <TenantDetailModal 
      v-if="selectedTenant"
      v-model:open="isTenantDetailModalOpen" 
      :tenant="selectedTenant"
      @edit="openEditTenantModal(selectedTenant)"
      @toggle-status="handleToggleTenantStatus"
    />

    <!-- Modal de confirmación para eliminar -->
    <TenantDeleteModal
      v-if="tenantToDelete"
      v-model:open="isDeleteConfirmOpen"
      :tenant="tenantToDelete"
      :deleting="isDeleting"
      @confirm="handleDeleteTenant"
      @cancel="tenantToDelete = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useTenantStore } from '~/stores/tenantStore'
import type { Tenant, NewTenant, TenantFilters } from '~/types/tenant'

// Inicializar el store de tenant
const tenantStore = useTenantStore()

// Referencias a componentes
const tenantControlsRef = ref(null);

// Estados de visualización
const viewMode = ref<'table' | 'grid'>('table')
const currentPage = ref(1)
const itemsPerPage = 8
const isTableLoading = ref(false)

// Estados para modales
const isAddTenantModalOpen = ref(false)
const isEditTenantModalOpen = ref(false)
const isTenantDetailModalOpen = ref(false)
const isDeleteConfirmOpen = ref(false)

// Estados para datos seleccionados
const selectedTenant = ref<Tenant | null>(null)
const tenantToDelete = ref<Tenant | null>(null)
const editingTenant = ref<Tenant | null>(null)

// Estados para operaciones
const isSaving = ref(false)
const isDeleting = ref(false)

// Tomar opciones directamente del store
const { planOptions, statusOptions } = tenantStore

// Configurar filtrado
const searchQuery = ref('')
const filters = reactive<TenantFilters>({
  status: null,
  plan: null
})

// Stats computadas
const tenantsStats = computed(() => tenantStore.tenantsStats)

// Getters desde el store
const tenants = computed(() => tenantStore.tenants)
const isLoading = computed(() => tenantStore.isLoading)
const error = computed(() => tenantStore.error)

// Manejadores para eventos del componente TenantControls
function handleSearch(query: string) {
  searchQuery.value = query;
  currentPage.value = 1;
}

function handleFilter(newFilters: { status: boolean | null; plan: string | null }) {
  filters.status = newFilters.status;
  filters.plan = newFilters.plan;
  currentPage.value = 1;
}

// Filtrado de tenants según búsqueda y filtros
const filteredTenants = computed(() => {
  let filtered = [...tenantStore.tenants]
  
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

// Función para cargar o recargar los datos
async function loadTenants() {
  await tenantStore.fetchTenants()
}

// Resetear filtros
function resetFilters() {
  searchQuery.value = ''
  filters.status = null
  filters.plan = null
  currentPage.value = 1
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
async function handleToggleTenantStatus(tenant: Tenant) {
  const newStatus = !tenant.activo
  const action = newStatus ? 'activar' : 'desactivar'
  
  try {
    isTableLoading.value = true
    
    const result = await tenantStore.toggleTenantStatus(tenant)
    
    if (result.success) {
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
    } else {
      useToast().add({
        title: 'Error',
        description: result.error || `No se pudo ${action} la organización`,
        icon: 'i-heroicons-exclamation-triangle',
        color: 'error'
      })
    }
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
  tenantToDelete.value = tenant
  isDeleteConfirmOpen.value = true
}

// Guardar nuevo tenant
async function saveTenant(newTenant: NewTenant) {
  isSaving.value = true
  
  try {
    const result = await tenantStore.createTenant(newTenant)
    
    if ('success' in result && result.success && result.data) {
      isAddTenantModalOpen.value = false
      
      // Mostrar mensaje de éxito
      useToast().add({
        title: 'Organización creada',
        description: `${newTenant.nombre} ha sido añadida correctamente`,
        icon: 'i-heroicons-check-circle',
        color: 'success'
      })
    } else {
      useToast().add({
        title: 'Error',
        description: 'No se pudo crear la organización',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'error'
      })
    }
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
async function handleUpdateTenant(updatedTenant: Tenant) {
  if (!updatedTenant) return
  
  isSaving.value = true
  
  try {
    const result = await tenantStore.updateTenant(updatedTenant)
    
    if (result.success && result.data) {
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
    } else {
      useToast().add({
        title: 'Error',
        description: 'error' in result ? result.error : 'No se pudo actualizar la organización',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'error'
      })
    }
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
async function handleDeleteTenant() {
  if (!tenantToDelete.value) return
  
  isDeleting.value = true
  
  try {
    const result = await tenantStore.deleteTenant(tenantToDelete.value.id)
    
    if (result.success) {
      isDeleteConfirmOpen.value = false
      
      // Si el tenant eliminado estaba siendo mostrado en detalle, cerrar modal
      if (selectedTenant.value?.id === tenantToDelete.value.id) {
        isTenantDetailModalOpen.value = false
      }
      
      // Mostrar mensaje de éxito
      useToast().add({
        title: 'Organización eliminada',
        description: `${tenantToDelete.value.nombre} ha sido eliminada permanentemente`,
        icon: 'i-heroicons-check-circle',
        color: 'error'
      })
      
      tenantToDelete.value = null
    } else {
      useToast().add({
        title: 'Error',
        description: result.error || 'No se pudo eliminar la organización',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'error'
      })
    }
  } catch (err) {
    console.error('Error al eliminar tenant:', err)
    useToast().add({
      title: 'Error',
      description: 'No se pudo eliminar la organización',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'error'
    })
  } finally {
    isDeleting.value = false
  }
}

// Cargar datos al montar el componente
onMounted(async () => {
  await loadTenants()
})
</script>