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
            
            <UFormGroup label="Nombre de la organización" required :error="errors.nombre" class="mb-5">
              <UInput 
                v-model="form.nombre" 
                placeholder="Ej: Cruz Roja Argentina"
                size="lg"
                @blur="validateField('nombre')"
              />
            </UFormGroup>
            
            <UFormGroup label="Subdominio" required :error="errors.subdominio" class="mb-5">
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
              <template #hint>
                <span class="text-sm text-gray-500 mt-1.5">El subdominio debe ser único, solo letras minúsculas, números y guiones.</span>
              </template>
            </UFormGroup>
            
            <UFormGroup label="Email de contacto" required :error="errors.correo" class="mb-5">
              <UInput 
                v-model="form.correo" 
                type="email" 
                size="lg"
                placeholder="admin@organizacion.org"
                @blur="validateField('correo')"
              />
            </UFormGroup>
          </div>
          
          <!-- Configuración de plan y personalización -->
          <div class="space-y-4 pt-3">
            <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-2">Configuración</h4>
            
            <UFormGroup label="Plan de suscripción" required class="mb-5">
              <USelectMenu
                v-model="form.plan"
                :options="planOptions"
                placeholder="Seleccionar plan"
                size="lg"
              />
              <template #hint>
                <div class="text-sm mt-1.5">
                  <span v-if="form.plan === 'Gratuito'" class="text-gray-500">Límite de 50 voluntarios. Sin funciones avanzadas.</span>
                  <span v-else-if="form.plan === 'Pro'" class="text-blue-400">Hasta 200 voluntarios. Incluye reportes y API.</span>
                  <span v-else-if="form.plan === 'Premium'" class="text-purple-400">Voluntarios ilimitados. Todas las funciones disponibles.</span>
                </div>
              </template>
            </UFormGroup>
            
            <UFormGroup label="Color primario" class="mb-5">
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
            </UFormGroup>
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
  plan: 'Gratuito',
  colorPrimario: '#0D9488' // Color por defecto
});

// Estado para errores
const errors = reactive({
  nombre: '',
  subdominio: '',
  correo: ''
});

// Estado del color picker
const colorPickerOpen = ref(false);

// Opciones para el selector de planes
const planOptions = [
  { label: 'Gratuito', value: 'Gratuito' },
  { label: 'Pro', value: 'Pro' },
  { label: 'Premium', value: 'Premium' }
];

// Lista de colores predefinidos
const predefinedColors = [
  '#0D9488', '#0ea5e9', '#8b5cf6', '#ec4899', '#ef4444',
  '#f97316', '#eab308', '#84cc16', '#14b8a6', '#06b6d4',
  '#3b82f6', '#a855f7', '#d946ef', '#f43f5e', '#10b981'
];

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

// Formatear el subdominio (solo letras minúsculas, números y guiones)
function handleSubdomainInput() {
  form.subdominio = form.subdominio
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '') // Eliminar caracteres no permitidos
    .replace(/--+/g, '-'); // Reemplazar múltiples guiones por uno solo
}

// Validar un campo específico
function validateField(field: 'nombre' | 'subdominio' | 'correo') {
  errors[field] = '';
  
  switch (field) {
    case 'nombre':
      if (!form.nombre.trim()) {
        errors.nombre = 'El nombre es obligatorio';
      } else if (form.nombre.length < 3) {
        errors.nombre = 'El nombre debe tener al menos 3 caracteres';
      }
      break;
      
    case 'subdominio':
      if (!form.subdominio.trim()) {
        errors.subdominio = 'El subdominio es obligatorio';
      } else if (form.subdominio.length < 3) {
        errors.subdominio = 'El subdominio debe tener al menos 3 caracteres';
      } else if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(form.subdominio)) {
        errors.subdominio = 'El subdominio solo puede contener letras minúsculas, números y guiones internos';
      }
      // Aquí se podría añadir una verificación de disponibilidad del subdominio
      break;
      
    case 'correo':
      if (!form.correo.trim()) {
        errors.correo = 'El correo es obligatorio';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
        errors.correo = 'Introduce un correo electrónico válido';
      }
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
    plan: 'Gratuito',
    colorPrimario: '#0D9488'
  });
  
  // Resetear errores
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  // Cerrar modal
  isOpen.value = false;
}

// Interfaz para el tenant nuevo
interface NewTenant {
  nombre: string;
  subdominio: string;
  correo: string;
  plan: string;
  colorPrimario?: string;
}

// Resetear formulario al cerrar
watch(() => isOpen.value, (newVal) => {
  if (!newVal) {
    cancel();
  }
});
</script>