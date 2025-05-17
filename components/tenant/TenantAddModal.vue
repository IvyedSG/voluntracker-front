<template>
  <UModal 
    v-model:open="isOpen" 
    :dismissible="true"
    title="Añadir nueva organización"
    size="lg"
  >
    <template #header>
      <div class="flex items-center">
        <UIcon name="i-heroicons-plus-circle" class="mr-3 text-green-500 text-2xl" />
        <h3 class="text-xl font-medium">Añadir nueva organización</h3>
      </div>
    </template>
    
    <template #body>
      <div class="space-y-6 py-2">
        <!-- Formulario de creación -->
        <form class="space-y-5" @submit.prevent="submit">
          <!-- Información básica -->
          <div class="space-y-4">
            <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-2">Información general</h4>
            
            <UFormField label="Nombre de la organización" required :error="errors.nombre" class="mb-5">
              <UInput 
                v-model="form.nombre" 
                placeholder="Ej: Cruz Roja Argentina"
                size="lg"
                @blur="validateField('nombre')"
              />
            </UFormField>

            <UFormField label="Subdominio" required :error="errors.subdominio" class="mb-5">
              <div class="flex items-center gap-2">
                <UInput 
                  v-model="form.subdominio" 
                  placeholder="Ej: cruzroja"
                  size="lg"
                  @input="handleSubdomainInput"
                  @blur="validateField('subdominio')"
                />
                <span class="text-gray-400 text-lg">.voluntracker.org</span>
              </div>
            </UFormField>
            
            <UFormField label="Email de contacto" required :error="errors.correo" class="mb-5">
              <UInput 
                v-model="form.correo" 
                type="email" 
                size="lg"
                placeholder="admin@organizacion.org"
                @blur="validateField('correo')"
              />
            </UFormField>
          </div>
          
          <!-- Configuración de plan y personalización -->
          <div class="space-y-4 pt-3">
            <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-2">Configuración</h4>
            
            <UFormField label="Plan de suscripción" required class="mb-5">
              <USelect
                v-model="form.plan"
                :items="planOptions"
                placeholder="Seleccionar plan"
                size="lg"
              >
                <template #item="{ item }">
                  <div class="flex items-center gap-2">
                    <UIcon 
                      :name="getPlanIcon(item.value)"
                      :class="getPlanIconClass(item.value)"
                    />
                    <span>{{ item.label }}</span>
                  </div>
                </template>
              </USelect>
              <template #hint>
                <div class="text-sm mt-1.5">
                  <span :class="tenantStore.getPlanTextClass(form.plan)">
                    {{ tenantStore.getPlanDescription(form.plan) }}
                  </span>
                </div>
              </template>
            </UFormField>
            
            <UFormField label="Color primario" class="mb-5">
              <div class="flex items-center gap-4">
                <div 
                  class="h-12 w-12 rounded-full cursor-pointer border-2 border-gray-700 transition-transform hover:scale-110 relative shadow-md"
                  :style="{ backgroundColor: form.colorPrimario }"
                  @click="colorPickerOpen = !colorPickerOpen"
                >
                  <!-- Tooltip modificado -->
                  <div v-if="!colorPickerOpen" class="cursor-pointer">
                    <UTooltip text="Elegir color" :popper="{ placement: 'top' }" />
                  </div>
                </div>
                <UInput 
                  v-model="form.colorPrimario" 
                  placeholder="#00AB55"
                  size="lg"
                  class="w-40" 
                />
                
                <!-- Color picker -->
                <div 
                  v-if="colorPickerOpen" 
                  class="absolute mt-2 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10"
                >
                  <div class="grid grid-cols-5 gap-3 mb-3">
                    <div 
                      v-for="color in predefinedColors" 
                      :key="color"
                      class="h-8 w-8 rounded-full cursor-pointer border-2 border-gray-700 transition-transform hover:scale-110 shadow-sm"
                      :style="{ backgroundColor: color }"
                      @click="selectColor(color)"
                    />
                  </div>
                  <div class="flex justify-end">
                    <UButton size="sm" color="neutral" variant="ghost" @click="colorPickerOpen = false">
                      Cerrar
                    </UButton>
                  </div>
                </div>
              </div>
              <template #hint>
                <span class="text-sm text-gray-500 mt-1.5">Este color se usará para la personalización de la interfaz de la organización.</span>
              </template>
            </UFormField>
          </div>
        </form>
      </div>
    </template>
    
    <template #footer>
      <div class="flex justify-between w-full py-1">
        <UButton 
          color="neutral" 
          variant="ghost" 
          size="lg"
          @click="cancel"
        >
          Cancelar
        </UButton>
        <UButton
          color="success"
          size="lg"
          :loading="saving"
          :disabled="!isFormValid || saving"
          @click="submit"
        >
          Guardar
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useTenantStore } from '~/stores/tenantStore'
import type { NewTenant } from '~/types/tenant'

// Props
const props = defineProps<{
  open: boolean;
  saving?: boolean;
}>();

// Emits
const emit = defineEmits<{
  (e: 'update:open', open: boolean): void;
  (e: 'save', data: NewTenant): void;
}>();

// Obtener el store para acceder a datos y funciones comunes
const tenantStore = useTenantStore()

// Estado del modal
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});

// Estado del formulario
const form = reactive({
  nombre: '',
  subdominio: '',
  correo: '',
  plan: 'Básico',
  colorPrimario: tenantStore.DEFAULT_COLOR // Usar color por defecto del store
});

// Estado para errores
const errors = reactive({
  nombre: '',
  subdominio: '',
  correo: ''
});

// Estado del color picker
const colorPickerOpen = ref(false);

// Usar opciones de planes directamente desde el store
const planOptions = tenantStore.planOptions.map(option => ({
  ...option,
  icon: tenantStore.getPlanIcon(option.value)
}));

// Usar colores predefinidos desde el store
const predefinedColors = tenantStore.predefinedColors;

// Comprobar si el formulario es válido
const isFormValid = computed(() => {
  return (
    form.nombre.trim() !== '' &&
    form.subdominio.trim() !== '' &&
    form.correo.trim() !== '' &&
    !errors.nombre &&
    !errors.subdominio &&
    !errors.correo
  );
});

// Seleccionar un color predefinido
function selectColor(color: string) {
  form.colorPrimario = color;
  colorPickerOpen.value = false;
}

// Formatear el subdominio usando la función del store
function handleSubdomainInput() {
  form.subdominio = tenantStore.formatSubdomain(form.subdominio);
}

// Validar un campo específico usando las funciones del store
function validateField(field: 'nombre' | 'subdominio' | 'correo') {
  switch (field) {
    case 'nombre':
      errors.nombre = tenantStore.validateName(form.nombre);
      break;
    case 'subdominio':
      errors.subdominio = tenantStore.validateSubdomain(form.subdominio);
      break;
    case 'correo':
      errors.correo = tenantStore.validateEmail(form.correo);
      break;
  }
}

// Validar todos los campos
function validateForm() {
  validateField('nombre');
  validateField('subdominio');
  validateField('correo');
  
  return !errors.nombre && !errors.subdominio && !errors.correo;
}

// Enviar el formulario
function submit() {
  if (!validateForm()) return;
  
  // Crear objeto con datos del tenant
  const newTenant: NewTenant = {
    nombre: form.nombre,
    subdominio: form.subdominio,
    correo: form.correo,
    plan: form.plan,
    colorPrimario: form.colorPrimario
  };
  
  // Emitir evento para guardar
  emit('save', newTenant);
}

// Cancelar y cerrar el modal
function cancel() {
  // Resetear el formulario
  Object.assign(form, {
    nombre: '',
    subdominio: '',
    correo: '',
    plan: 'Básico',
    colorPrimario: '#0D9488'
  });
  
  // Resetear errores
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  // Cerrar modal
  isOpen.value = false;
}

// Obtener icono según el plan
function getPlanIcon(plan: string): string {
  switch (plan) {
    case 'Premium':
      return 'i-heroicons-star';
    case 'Pro':
      return 'i-heroicons-rocket-launch';
    case 'Básico':
    default:
      return 'i-heroicons-gift';
  }
}

// Obtener clase de estilo para el icono según el plan
function getPlanIconClass(plan: string): string {
  switch (plan) {
    case 'Premium':
      return 'text-amber-300';
    case 'Pro':
      return 'text-blue-400';
    case 'Básico':
    default:
      return 'text-gray-400';
  }
}

// Resetear formulario al cerrar
watch(() => isOpen.value, (newVal) => {
  if (!newVal) {
    cancel();
  }
});
</script>