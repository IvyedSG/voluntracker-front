import { useTenantStore } from '~/stores/tenantStore'
import type { TenantErrors } from '~/types/tenant'

interface TenantForm {
  nombre: string
  subdominio: string
  correo: string
}

export function useTenantForm(form: TenantForm, originalSubdomain?: Ref<string | undefined>) {
  const tenantStore = useTenantStore()
  
  const errors = reactive<TenantErrors>({
    nombre: '',
    subdominio: '',
    correo: ''
  })
  
  // Validar un campo específico
  function validateField(field: 'nombre' | 'subdominio' | 'correo') {
    switch (field) {
      case 'nombre':
        errors.nombre = tenantStore.validateName(form.nombre)
        break
      case 'subdominio':
        errors.subdominio = tenantStore.validateSubdomain(
          form.subdominio, 
          originalSubdomain?.value
        )
        break
      case 'correo':
        errors.correo = tenantStore.validateEmail(form.correo)
        break
    }
  }
  
  // Validar todos los campos
  function validateForm() {
    validateField('nombre')
    validateField('subdominio')
    validateField('correo')
    
    return !errors.nombre && !errors.subdominio && !errors.correo
  }
  
  // Formatear el subdominio
  function handleSubdomainInput() {
    form.subdominio = tenantStore.formatSubdomain(form.subdominio)
  }
  
  // Comprobar si el formulario es válido
  const isFormValid = computed(() => {
    return (
      form.nombre?.trim() !== '' &&
      form.subdominio?.trim() !== '' &&
      form.correo?.trim() !== '' &&
      !errors.nombre &&
      !errors.subdominio &&
      !errors.correo
    )
  })
  
  return {
    errors,
    validateField,
    validateForm,
    handleSubdomainInput,
    isFormValid,
    planOptions: tenantStore.planOptions,
    predefinedColors: tenantStore.predefinedColors,
    getPlanIcon: tenantStore.getPlanIcon,
    getPlanIconClass: (plan: string): string => {
      switch (plan) {
        case 'Premium':
          return 'text-amber-300'
        case 'Pro':
          return 'text-blue-400'
        case 'Gratuito':
        default:
          return 'text-gray-400'
      }
    }
  }
}