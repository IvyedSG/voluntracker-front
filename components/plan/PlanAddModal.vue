<template>
  <UModal 
    v-model:open="isOpen" 
    :dismissible="true"
    title="Añadir nuevo plan"
    size="2xl"
  >
    <template #header>
      <div class="flex items-center">
        <UIcon name="i-heroicons-plus-circle" class="mr-3 text-green-500 text-2xl" />
        <h3 class="text-xl font-medium">Añadir nuevo plan</h3>
      </div>
    </template>
    
    <template #body>
      <div class="space-y-6 py-2">
        <!-- Formulario de creación -->
        <form class="space-y-5" @submit.prevent="submit">
          <!-- Información básica -->
          <div class="space-y-4">
            <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-2">Información general</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nombre del plan -->
              <UFormField label="Nombre del plan" required :error="errors.nombre">
                <UInput 
                  v-model="form.nombre" 
                  placeholder="ej. Premium" 
                  size="lg"
                  @blur="validateField('nombre')"
                />
              </UFormField>
              
              <!-- Icono del plan -->
              <UFormField label="Icono">
                <USelect
                  v-model="form.icono"
                  :items="planStore.iconOptions"
                  size="lg"
                >
                  <template #leading>
                    <UIcon :name="form.icono" :style="{ color: form.color }" />
                  </template>
                  <template #item="{ item }">
                    <div class="flex items-center gap-2">
                      <UIcon 
                        :name="item.value"
                        :style="{ color: form.color }"
                      />
                      <span>{{ item.label }}</span>
                    </div>
                  </template>
                </USelect>
              </UFormField>
            </div>
            
            <!-- Descripción del plan -->
            <UFormField label="Descripción" required :error="errors.descripcion">
              <UTextarea 
                v-model="form.descripcion" 
                placeholder="Describe brevemente este plan..." 
                size="lg"
                :rows="3"
                @blur="validateField('descripcion')"
              />
            </UFormField>
            
            <!-- Color del plan -->
            <UFormField label="Color del plan">
              <div class="relative">
                <UInput 
                  v-model="form.color" 
                  placeholder="#0D9488" 
                  size="lg"
                  type="text"
                  @click="colorPickerOpen = !colorPickerOpen"
                />
                <div 
                  class="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full cursor-pointer border border-gray-700"
                  :style="{ backgroundColor: form.color }"
                  @click="colorPickerOpen = !colorPickerOpen"
                />
                
                <!-- Color picker dropdown -->
                <div 
                  v-if="colorPickerOpen" 
                  class="absolute z-10 mt-1 p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-xl"
                >
                  <div class="grid grid-cols-5 gap-3 mb-3">
                    <div 
                      v-for="color in planStore.predefinedColors" 
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
            </UFormField>
          </div>
          
          <!-- Precios y límites -->
          <div class="space-y-4 pt-3 border-t border-gray-800">
            <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-2">Precio y facturación</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Precio -->
              <UFormField label="Precio" required :error="errors.precio">
                <UInputAddon>
                  <template #leading>
                    <UIcon name="i-heroicons-currency-dollar" />
                  </template>
                  <UInput 
                    v-model.number="form.precio" 
                    placeholder="0"
                    size="lg"
                    type="number"
                    min="0"
                    @blur="validateField('precio')"
                  />
                </UInputAddon>
              </UFormField>
              
              <!-- Moneda -->
              <UFormField label="Moneda">
                <USelect
                  v-model="form.moneda"
                  :items="planStore.currencyOptions"
                  size="lg"
                />
              </UFormField>
              
              <!-- Periodo de facturación -->
              <UFormField label="Facturación">
                <USelect
                  v-model="form.periodoFacturacion"
                  :items="planStore.billingPeriodOptions"
                  size="lg"
                />
              </UFormField>
            </div>
          </div>
          
          <!-- Límites y capacidades -->
          <div class="space-y-4 pt-3 border-t border-gray-800">
            <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-2">Límites y capacidades</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Organizadores -->
              <UFormField label="Organizadores máximos" hint="Usar -1 para ilimitado">
                <UInput 
                  v-model.number="form.maxOrganizadores" 
                  type="number"
                  min="-1"
                  size="lg"
                  @blur="validateField('maxOrganizadores')"
                />
              </UFormField>
              
              <!-- Voluntarios -->
              <UFormField label="Voluntarios máximos" hint="Usar -1 para ilimitado">
                <UInput 
                  v-model.number="form.maxVoluntarios" 
                  type="number"
                  min="-1"
                  size="lg"
                  @blur="validateField('maxVoluntarios')"
                />
              </UFormField>
              
              <!-- Eventos -->
              <UFormField label="Eventos por mes" hint="Usar -1 para ilimitado">
                <UInput 
                  v-model.number="form.maxEventos" 
                  type="number"
                  min="-1"
                  size="lg"
                  @blur="validateField('maxEventos')"
                />
              </UFormField>
              
              <!-- Almacenamiento -->
              <UFormField label="Almacenamiento (MB)">
                <UInput 
                  v-model.number="form.almacenamiento" 
                  type="number"
                  min="0"
                  size="lg"
                  @blur="validateField('almacenamiento')"
                />
              </UFormField>
            </div>
            
            <!-- Características adicionales -->
            <div class="mt-4 space-y-3">
              <h5 class="text-sm font-medium text-gray-400">Características adicionales</h5>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <UToggle v-model="form.soportePrioritario" size="lg">
                  <span class="text-gray-300">Soporte prioritario</span>
                </UToggle>
                
                <UToggle v-model="form.reportesAvanzados" size="lg">
                  <span class="text-gray-300">Reportes avanzados</span>
                </UToggle>
                
                <UToggle v-model="form.personalizacion" size="lg">
                  <span class="text-gray-300">Personalización completa</span>
                </UToggle>
                
                <UToggle v-model="form.apiAccess" size="lg">
                  <span class="text-gray-300">API access</span>
                </UToggle>
              </div>
            </div>
          </div>
          
          <!-- Características visibles -->
          <div class="space-y-4 pt-3 border-t border-gray-800">
            <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-2">Características del plan</h4>
            
            <p class="text-sm text-gray-400 mb-3">Añade las características que se mostrarán en la tarjeta del plan:</p>
            
            <div class="space-y-3">
              <div v-for="(item, index) in form.caracteristicas" :key="index" class="flex gap-2 items-center">
                <UToggle v-model="item.incluido" size="md" />
                <UInput 
                  v-model="item.texto" 
                  placeholder="ej. Soporte 24/7"
                  size="lg"
                  class="flex-grow"
                />
                <UButton 
                  color="error" 
                  variant="ghost" 
                  icon="i-heroicons-trash" 
                  size="sm"
                  @click="removeFeature(index)"
                  :disabled="form.caracteristicas.length <= 1"
                />
              </div>
              
              <UButton 
                color="success" 
                variant="ghost" 
                icon="i-heroicons-plus" 
                size="sm"
                @click="addFeature"
                class="mt-2"
              >
                Añadir característica
              </UButton>
            </div>
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
          Guardar plan
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { usePlanStore } from '~/stores/planStore'
import type { NewPlan } from '~/types/plan'

// Props
const props = defineProps<{
  open: boolean;
  saving?: boolean;
}>();

// Emits
const emit = defineEmits<{
  (e: 'update:open', open: boolean): void;
  (e: 'save', data: NewPlan): void;
}>();

// Obtener el store para acceder a datos y funciones comunes
const planStore = usePlanStore()

// Estado del modal
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});

// Estado del formulario
const form = reactive<NewPlan>({
  nombre: '',
  descripcion: '',
  precio: 0,
  periodoFacturacion: 'mensual',
  moneda: 'USD',
  color: planStore.DEFAULT_COLOR,
  icono: planStore.DEFAULT_ICON,
  caracteristicas: [
    { texto: 'Organizadores', incluido: true },
    { texto: 'Voluntarios', incluido: true },
    { texto: 'Eventos mensuales', incluido: true },
    { texto: 'Almacenamiento', incluido: true }
  ],
  maxOrganizadores: 3,
  maxVoluntarios: 50,
  maxEventos: 10,
  almacenamiento: 500,
  soportePrioritario: false,
  reportesAvanzados: false,
  personalizacion: false,
  apiAccess: false
});

// Estado para errores
const errors = reactive({
  nombre: '',
  descripcion: '',
  precio: '',
  maxOrganizadores: '',
  maxVoluntarios: '',
  maxEventos: '',
  almacenamiento: ''
});

// Estado del color picker
const colorPickerOpen = ref(false);

// Comprobar si el formulario es válido
const isFormValid = computed(() => {
  return (
    form.nombre.trim() !== '' &&
    form.descripcion.trim() !== '' &&
    !errors.nombre &&
    !errors.descripcion &&
    !errors.precio
  );
});

// Seleccionar un color predefinido
function selectColor(color: string) {
  form.color = color;
  colorPickerOpen.value = false;
}

// Validar un campo específico usando las funciones del store
function validateField(field: string) {
  switch (field) {
    case 'nombre':
      errors.nombre = planStore.validateName(form.nombre);
      break;
    case 'descripcion':
      errors.descripcion = planStore.validateDescription(form.descripcion);
      break;
    case 'precio':
      errors.precio = planStore.validatePrice(form.precio);
      break;
    case 'maxOrganizadores':
      errors.maxOrganizadores = planStore.validateMaxValue(form.maxOrganizadores, 'organizadores');
      break;
    case 'maxVoluntarios':
      errors.maxVoluntarios = planStore.validateMaxValue(form.maxVoluntarios, 'voluntarios');
      break;
    case 'maxEventos':
      errors.maxEventos = planStore.validateMaxValue(form.maxEventos, 'eventos');
      break;
    case 'almacenamiento':
      errors.almacenamiento = planStore.validateMaxValue(form.almacenamiento, 'almacenamiento');
      break;
  }
}

// Añadir una nueva característica
function addFeature() {
  form.caracteristicas.push({ texto: '', incluido: true });
}

// Eliminar una característica
function removeFeature(index: number) {
  if (form.caracteristicas.length > 1) {
    form.caracteristicas.splice(index, 1);
  }
}

// Validar todos los campos
function validateForm() {
  validateField('nombre');
  validateField('descripcion');
  validateField('precio');
  validateField('maxOrganizadores');
  validateField('maxVoluntarios');
  validateField('maxEventos');
  validateField('almacenamiento');
  
  return !errors.nombre && !errors.descripcion && !errors.precio &&
    !errors.maxOrganizadores && !errors.maxVoluntarios && !errors.maxEventos && !errors.almacenamiento;
}

// Enviar el formulario
function submit() {
  if (!validateForm()) return;
  
  // Filtrar características vacías
  const validFeatures = form.caracteristicas.filter(f => f.texto.trim() !== '');
  
  // Crear objeto con datos del plan
  const newPlan: NewPlan = {
    ...form,
    caracteristicas: validFeatures.length > 0 ? validFeatures : [{ texto: 'Plan básico', incluido: true }]
  };
  
  // Emitir evento para guardar
  emit('save', newPlan);
}

// Cancelar y cerrar el modal
function cancel() {
  // Resetear el formulario
  Object.assign(form, {
    nombre: '',
    descripcion: '',
    precio: 0,
    periodoFacturacion: 'mensual',
    moneda: 'USD',
    color: planStore.DEFAULT_COLOR,
    icono: planStore.DEFAULT_ICON,
    caracteristicas: [
      { texto: 'Organizadores', incluido: true },
      { texto: 'Voluntarios', incluido: true },
      { texto: 'Eventos mensuales', incluido: true },
      { texto: 'Almacenamiento', incluido: true }
    ],
    maxOrganizadores: 3,
    maxVoluntarios: 50,
    maxEventos: 10,
    almacenamiento: 500,
    soportePrioritario: false,
    reportesAvanzados: false,
    personalizacion: false,
    apiAccess: false
  });
  
  // Resetear errores
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  // Cerrar modal
  isOpen.value = false;
}

// Resetear formulario al cerrar
watch(() => isOpen.value, (newVal) => {
  if (!newVal) {
    cancel();
  }
});
</script>