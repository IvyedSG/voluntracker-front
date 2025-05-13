import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Plan, NewPlan, PlanStats } from '~/types/plan'

// Importar datos de prueba para desarrollo
import { mockPlans } from '~/mocks/plans'

export const usePlanStore = defineStore('plan', () => {
  // Estado
  const plans = ref<Plan[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // Constantes
  const DEFAULT_COLOR = '#0D9488'
  const DEFAULT_ICON = 'i-heroicons-ticket'
  
  // Monedas disponibles
  const currencyOptions = [
    { label: 'USD - Dólar estadounidense', value: 'USD' },
    { label: 'EUR - Euro', value: 'EUR' },
    { label: 'MXN - Peso mexicano', value: 'MXN' },
    { label: 'COP - Peso colombiano', value: 'COP' },
    { label: 'ARS - Peso argentino', value: 'ARS' },
    { label: 'CLP - Peso chileno', value: 'CLP' },
    { label: 'PEN - Sol peruano', value: 'PEN' },
    { label: 'BRL - Real brasileño', value: 'BRL' },
  ]
  
  // Períodos de facturación
  const billingPeriodOptions = [
    { label: 'Mensual', value: 'mensual' },
    { label: 'Anual', value: 'anual' },
  ]
  
  // Colores predefinidos
  const predefinedColors = [
    '#0D9488', // Teal
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#EF4444', // Red
    '#6366F1', // Indigo
    '#84CC16', // Lime
    '#14B8A6', // Teal
  ]
  
  // Iconos disponibles
  const iconOptions = [
    { label: 'Ticket', value: 'i-heroicons-ticket' },
    { label: 'Estrella', value: 'i-heroicons-star' },
    { label: 'Diamante', value: 'i-heroicons-sparkles' },
    { label: 'Cohete', value: 'i-heroicons-rocket-launch' },
    { label: 'Trofeo', value: 'i-heroicons-trophy' },
    { label: 'Regalo', value: 'i-heroicons-gift' },
    { label: 'Tarjeta de crédito', value: 'i-heroicons-credit-card' },
    { label: 'Bombilla', value: 'i-heroicons-light-bulb' },
    { label: 'Corazón', value: 'i-heroicons-heart' },
    { label: 'Nube', value: 'i-heroicons-cloud' },
  ]
  
  // Stats computadas
  const plansStats = computed<PlanStats>(() => {
    const activos = plans.value.filter(p => p.activo).length
    const sortedByOrgs = [...plans.value].sort((a, b) => b.numOrganizaciones - a.numOrganizaciones)
    const planMasPopular = sortedByOrgs.length > 0 ? sortedByOrgs[0].nombre : 'N/A'
    const ingresosTotal = plans.value.reduce((sum, plan) => 
      sum + (plan.precio * plan.numOrganizaciones), 0)
      
    return {
      total: plans.value.length,
      activos,
      nuevosUltimaSemana: 2, // Mock data
      planMasPopular,
      ingresosTotal,
      ingresosIncremento: 12.5, // Mock data
      organizacionesPromedio: plans.value.length > 0 
        ? plans.value.reduce((sum, plan) => sum + plan.numOrganizaciones, 0) / plans.value.length 
        : 0
    }
  })
  
  // Acciones
  async function fetchPlans() {
    isLoading.value = true
    error.value = null
    
    try {
      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 800))
      plans.value = mockPlans
    } catch (err) {
      console.error('Error fetching plans:', err)
      error.value = 'No se pudieron cargar los planes. Inténtalo de nuevo.'
    } finally {
      isLoading.value = false
    }
  }
  
  async function createPlan(planData: NewPlan) {
    try {
      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newPlan: Plan = {
        id: `plan-${Date.now()}`,
        ...planData,
        activo: true,
        fechaCreacion: new Date().toISOString(),
        numOrganizaciones: 0
      }
      
      plans.value.push(newPlan)
      
      return {
        success: true,
        data: newPlan
      }
    } catch (err) {
      console.error('Error creating plan:', err)
      return {
        success: false,
        error: 'No se pudo crear el plan'
      }
    }
  }
  
  async function updatePlan(updatedPlan: Plan) {
    try {
      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const index = plans.value.findIndex(p => p.id === updatedPlan.id)
      
      if (index !== -1) {
        plans.value[index] = { ...updatedPlan }
        
        return {
          success: true,
          data: updatedPlan
        }
      }
      
      return {
        success: false,
        error: 'Plan no encontrado'
      }
    } catch (err) {
      console.error('Error updating plan:', err)
      return {
        success: false,
        error: 'No se pudo actualizar el plan'
      }
    }
  }
  
  async function togglePlanStatus(plan: Plan) {
    try {
      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = plans.value.findIndex(p => p.id === plan.id)
      
      if (index !== -1) {
        plans.value[index].activo = !plans.value[index].activo
        
        return {
          success: true
        }
      }
      
      return {
        success: false,
        error: 'Plan no encontrado'
      }
    } catch (err) {
      console.error('Error toggling plan status:', err)
      return {
        success: false,
        error: 'No se pudo cambiar el estado del plan'
      }
    }
  }
  
  async function deletePlan(planId: string) {
    try {
      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const index = plans.value.findIndex(p => p.id === planId)
      
      if (index !== -1) {
        plans.value.splice(index, 1)
        
        return {
          success: true
        }
      }
      
      return {
        success: false,
        error: 'Plan no encontrado'
      }
    } catch (err) {
      console.error('Error deleting plan:', err)
      return {
        success: false,
        error: 'No se pudo eliminar el plan'
      }
    }
  }
  
  // Utilidades
  function formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }
  
  function validateName(name: string) {
    if (!name.trim()) {
      return 'El nombre es obligatorio'
    }
    if (name.length < 3) {
      return 'El nombre debe tener al menos 3 caracteres'
    }
    return ''
  }
  
  function validateDescription(description: string) {
    if (!description.trim()) {
      return 'La descripción es obligatoria'
    }
    if (description.length < 10) {
      return 'La descripción debe tener al menos 10 caracteres'
    }
    return ''
  }
  
  function validatePrice(price: number | string) {
    const parsedPrice = typeof price === 'string' ? parseFloat(price) : price
    
    if (isNaN(parsedPrice)) {
      return 'El precio debe ser un número'
    }
    if (parsedPrice < 0) {
      return 'El precio no puede ser negativo'
    }
    return ''
  }
  
  function validateMaxValue(value: number | string, fieldName: string) {
    const parsedValue = typeof value === 'string' ? parseInt(value) : value
    
    if (isNaN(parsedValue)) {
      return `El valor de ${fieldName} debe ser un número`
    }
    if (parsedValue < 0) {
      return `El valor de ${fieldName} no puede ser negativo`
    }
    return ''
  }
  
  function getIconComponent(iconName: string) {
    return iconName || DEFAULT_ICON
  }
  
  return {
    // Estado
    plans,
    isLoading,
    error,
    
    // Constantes y opciones
    DEFAULT_COLOR,
    DEFAULT_ICON,
    currencyOptions,
    billingPeriodOptions,
    predefinedColors,
    iconOptions,
    
    // Stats
    plansStats,
    
    // Acciones
    fetchPlans,
    createPlan,
    updatePlan,
    togglePlanStatus,
    deletePlan,
    
    // Utilidades
    formatCurrency,
    validateName,
    validateDescription,
    validatePrice,
    validateMaxValue,
    getIconComponent
  }
})