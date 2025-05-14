<template>
  <div>
    <!-- Header section with title and actions -->
    <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white mb-1">Planes de suscripción</h1>
        <p class="text-gray-400">Configura los planes disponibles para las organizaciones</p>
      </div>
      
      <div class="flex gap-2">
        <UButton
          color="success"
          icon="i-heroicons-plus"
          @click="openAddPlanModal"
        >
          Añadir plan
        </UButton>
      </div>
    </div>

    <!-- Stats section -->
    <PlanStats 
      :stats="plansStats" 
      class="mb-8" 
    />

    <!-- Loading state -->
    <div v-if="isLoading" class="p-8 flex justify-center items-center h-52">
      <div class="flex flex-col items-center">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-green-500 mb-3"/>
        <p class="text-gray-400">Cargando planes...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="p-8 text-center h-52 flex flex-col items-center justify-center">
      <UIcon name="i-heroicons-exclamation-triangle" class="h-10 w-10 text-red-500 mx-auto mb-3"/>
      <p class="text-red-400 mb-4">{{ error }}</p>
      <UButton color="success" @click="loadPlans">
        Reintentar
      </UButton>
    </div>

    <!-- Empty state -->
    <div v-else-if="plans.length === 0" class="p-8 text-center h-52 flex flex-col items-center justify-center">
      <UIcon name="i-heroicons-credit-card" class="h-10 w-10 text-gray-500 mx-auto mb-3"/>
      <h3 class="text-lg font-medium text-gray-300 mb-1">No hay planes configurados</h3>
      <p class="text-gray-400 mb-4">Añade un nuevo plan para comenzar a configurar las suscripciones.</p>
      <UButton color="success" @click="openAddPlanModal">
        Añadir plan
      </UButton>
    </div>

    <!-- Plans Grid -->
    <div v-else class="relative pt-10 pb-20">
      <!-- Elementos decorativos ambientales -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 left-1/4 w-80 h-80 bg-green-500/3 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full filter blur-3xl"></div>
        <div class="absolute top-1/3 left-1/2 w-60 h-60 bg-purple-500/3 rounded-full filter blur-3xl"></div>
      </div>
      
      <!-- Tablero para las cartas con diseño mejorado -->
      <div class="max-w-7xl mx-auto px-4 xl:px-6">
        <div class="plans-grid">
          <PlanCard 
            v-for="plan in plans" 
            :key="plan.id"
            :plan="plan"
            @edit="openEditPlanModal"
            @view-orgs="navigateToTenantsByPlan"
            @delete="confirmDeletePlan"
            @view-details="openPlanDetailsModal"
          />
        </div>
      </div>
    </div>

    <!-- Modales -->
    <PlanAddModal 
      v-model:open="isAddPlanModalOpen" 
      :saving="isSaving"
      @save="savePlan"
    />

    <PlanEditModal 
      v-if="editingPlan"
      v-model:open="isEditPlanModalOpen" 
      :plan="editingPlan"
      :saving="isSaving"
      @update="handleUpdatePlan"
    />

    <PlanDeleteModal
      v-if="planToDelete"
      v-model:open="isDeleteConfirmOpen"
      :plan="planToDelete"
      :deleting="isDeleting"
      @confirm="handleDeletePlan"
      @cancel="planToDelete = null"
    />

    <PlanDetailsModal
      v-if="selectedPlan"
      v-model:open="isPlanDetailsModalOpen"
      :plan="selectedPlan"
      @close="selectedPlan = null"
      @edit="openEditPlanModal"
      @view-orgs="navigateToTenantsByPlan"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, provide } from 'vue'
import { useRouter } from 'vue-router'
import { usePlanStore } from '~/stores/planStore'
import type { Plan, NewPlan } from '~/types/plan'

// Router para navegación
const router = useRouter()

// Inicializar el store de planes
const planStore = usePlanStore()

// Estados de visualización
const isLoading = computed(() => planStore.isLoading)
const error = computed(() => planStore.error)
const plans = computed(() => planStore.plans)
const plansStats = computed(() => planStore.plansStats)

// Proporcionar plansStats a los componentes hijos
provide('plansStats', plansStats);

// Estados para modales
const isAddPlanModalOpen = ref(false)
const isEditPlanModalOpen = ref(false)
const isDeleteConfirmOpen = ref(false)
const editingPlan = ref<Plan | null>(null)
const planToDelete = ref<Plan | null>(null)
const isPlanDetailsModalOpen = ref(false)
const selectedPlan = ref<Plan | null>(null)

// Estados para operaciones
const isSaving = ref(false)
const isDeleting = ref(false)

// Función para cargar o recargar los datos
async function loadPlans() {
  await planStore.fetchPlans()
}

// Función para navegar a tenants filtrados por plan
function navigateToTenantsByPlan(plan: Plan) {
  router.push({
    path: '/tenants',
    query: { plan: plan.nombre }
  })
}

// Abrir modal de edición
function openEditPlanModal(plan: Plan) {
  editingPlan.value = JSON.parse(JSON.stringify(plan)) // Copia profunda
  isEditPlanModalOpen.value = true
}

// Abrir modal para añadir
function openAddPlanModal() {
  isAddPlanModalOpen.value = true
}

// Abrir modal de detalles
function openPlanDetailsModal(plan: Plan) {
  selectedPlan.value = plan
  isPlanDetailsModalOpen.value = true
}

// Confirmar eliminación
function confirmDeletePlan(plan: Plan) {
  planToDelete.value = plan
  isDeleteConfirmOpen.value = true
}

// Guardar nuevo plan
async function savePlan(newPlan: NewPlan) {
  isSaving.value = true
  
  try {
    const result = await planStore.createPlan(newPlan)
    
    if ('success' in result && result.success && result.data) {
      isAddPlanModalOpen.value = false
      
      useToast().add({
        title: 'Plan creado',
        description: `${newPlan.nombre} ha sido añadido correctamente`,
        icon: 'i-heroicons-check-circle',
        color: 'success'
      })
    } else {
      useToast().add({
        title: 'Error',
        description: 'No se pudo crear el plan',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'error'
      })
    }
  } catch (err) {
    console.error('Error al crear plan:', err)
    useToast().add({
      title: 'Error',
      description: 'No se pudo crear el plan',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'error'
    })
  } finally {
    isSaving.value = false
  }
}

// Actualizar plan existente
async function handleUpdatePlan(updatedPlan: Plan) {
  if (!updatedPlan) return
  
  isSaving.value = true
  
  try {
    const result = await planStore.updatePlan(updatedPlan)
    
    if (result.success && result.data) {
      isEditPlanModalOpen.value = false
      
      useToast().add({
        title: 'Plan actualizado',
        description: `${updatedPlan.nombre} ha sido actualizado correctamente`,
        icon: 'i-heroicons-check-circle',
        color: 'info'
      })
    } else {
      useToast().add({
        title: 'Error',
        description: result.error || 'No se pudo actualizar el plan',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'error'
      })
    }
  } catch (err) {
    console.error('Error al actualizar plan:', err)
    useToast().add({
      title: 'Error',
      description: 'No se pudo actualizar el plan',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'error'
    })
  } finally {
    isSaving.value = false
  }
}

// Eliminar plan
async function handleDeletePlan() {
  if (!planToDelete.value) return
  
  isDeleting.value = true
  
  try {
    const result = await planStore.deletePlan(planToDelete.value.id)
    
    if (result.success) {
      isDeleteConfirmOpen.value = false
      
      useToast().add({
        title: 'Plan eliminado',
        description: `${planToDelete.value.nombre} ha sido eliminado permanentemente`,
        icon: 'i-heroicons-check-circle',
        color: 'error'
      })
      
      planToDelete.value = null
    } else {
      useToast().add({
        title: 'Error',
        description: result.error || 'No se pudo eliminar el plan',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'error'
      })
    }
  } catch (err) {
    console.error('Error al eliminar plan:', err)
    useToast().add({
      title: 'Error',
      description: 'No se pudo eliminar el plan',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'error'
    })
  } finally {
    isDeleting.value = false
  }
}

// Cargar datos al montar el componente
onMounted(async () => {
  await loadPlans()
})
</script>

<style>
/* Grid personalizado para tarjetas de planes */
.plans-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem; /* Reducido ligeramente el gap para permitir tarjetas más anchas */
  margin: 0 auto;
  width: 100%;
}

/* Pantallas pequeñas: móviles */
@media (max-width: 767px) {
  .plans-grid > * {
    margin-bottom: 1.5rem;
    flex: 0 0 100%;
    max-width: 340px; /* Un poco más ancho en móviles */
  }
}

/* Pantallas medianas: tablets y laptops pequeñas */
@media (min-width: 768px) and (max-width: 1279px) {
  .plans-grid {
    max-width: 900px; /* Aumentado de 700px para permitir 2 tarjetas cómodamente */
    gap: 2rem;
  }
  
  .plans-grid > * {
    flex: 0 0 calc(50% - 2rem); /* 2 por fila */
    max-width: 340px;
  }
}

/* Pantallas grandes: desktops y laptops grandes */
@media (min-width: 1280px) {
  .plans-grid {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 1.5rem; /* Reducido para permitir tarjetas más anchas */
    max-width: 1250px; /* Ligeramente aumentado */
  }
  
  .plans-grid > * {
    flex: 0 0 calc(33.333% - 1rem); /* 3 por fila con distribución equitativa */
    max-width: 340px;
  }
}

/* Pantallas extra grandes */
@media (min-width: 1600px) {
  .plans-grid {
    max-width: 1400px;
    gap: 2.5rem;
  }
  
  .plans-grid > * {
    flex: 0 0 calc(33.333% - 1.5rem);
    max-width: 380px; /* Tarjetas más anchas para pantallas más grandes */
  }
}
</style>