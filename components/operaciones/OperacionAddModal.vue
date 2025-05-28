<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionAddModal.vue -->
<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('cancel')">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
    
    <!-- Modal container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div 
        class="relative w-full max-w-3xl transform overflow-hidden rounded-lg bg-gray-900 border border-gray-800 shadow-xl transition-all"
        @click.stop
      >
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
              <UIcon name="i-heroicons-plus" class="h-5 w-5 text-green-400" />
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-semibold text-white">Nueva Operación</h2>
              <p class="text-gray-400 text-sm">Complete la información para crear una nueva operación</p>
            </div>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark"
              size="sm"
              @click="$emit('cancel')"
            />
          </div>

          <!-- Formulario -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Información básica -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nombre de la actividad -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Nombre de la actividad *
                </label>
                <UInput
                  v-model="form.nombreActividad"
                  placeholder="Ej: Campaña de vacunación"
                  size="md"
                  :color="errors.nombreActividad ? 'red' : 'white'"
                  @blur="validateField('nombreActividad')"
                  @input="clearError('nombreActividad')"
                />
                <p v-if="errors.nombreActividad" class="text-red-400 text-xs mt-1">
                  {{ errors.nombreActividad }}
                </p>
              </div>

              <!-- Tipo -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Tipo *
                </label>
                <USelect
                  v-model="form.tipo"
                  :options="tipoOptions"
                  placeholder="Selecciona un tipo"
                  size="md"
                  :color="errors.tipo ? 'red' : 'white'"
                  @change="validateField('tipo')"
                />
                <p v-if="errors.tipo" class="text-red-400 text-xs mt-1">{{ errors.tipo }}</p>
              </div>

              <!-- Prioridad -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Prioridad *
                </label>
                <USelect
                  v-model="form.prioridad"
                  :options="prioridadOptions"
                  placeholder="Selecciona prioridad"
                  size="md"
                  :color="errors.prioridad ? 'red' : 'white'"
                  @change="validateField('prioridad')"
                />
                <p v-if="errors.prioridad" class="text-red-400 text-xs mt-1">{{ errors.prioridad }}</p>
              </div>
            </div>

            <!-- Descripción -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                Descripción *
              </label>
              <UTextarea
                v-model="form.descripcion"
                placeholder="Describe detalladamente la operación..."
                rows="3"
                :color="errors.descripcion ? 'red' : 'white'"
                @blur="validateField('descripcion')"
                @input="clearError('descripcion')"
              />
              <p v-if="errors.descripcion" class="text-red-400 text-xs mt-1">
                {{ errors.descripcion }}
              </p>
            </div>

            <!-- Asignación -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Voluntario -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Voluntario asignado *
                </label>
                <USelect
                  v-model="form.voluntarioId"
                  :options="voluntarioOptions"
                  placeholder="Selecciona voluntario"
                  size="md"
                  :color="errors.voluntarioId ? 'red' : 'white'"
                  @change="validateField('voluntarioId')"
                />
                <p v-if="errors.voluntarioId" class="text-red-400 text-xs mt-1">
                  {{ errors.voluntarioId }}
                </p>
              </div>

              <!-- Área -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Área *
                </label>
                <USelect
                  v-model="form.area"
                  :options="areaOptions"
                  placeholder="Selecciona área"
                  size="md"
                  :color="errors.area ? 'red' : 'white'"
                  @change="validateField('area')"
                />
                <p v-if="errors.area" class="text-red-400 text-xs mt-1">{{ errors.area }}</p>
              </div>
            </div>

            <!-- Fechas y horas -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Fecha inicio -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Fecha de inicio *
                </label>
                <UInput
                  v-model="form.fechaInicio"
                  type="date"
                  size="md"
                  :min="today"
                  :color="errors.fechaInicio ? 'red' : 'white'"
                  @change="validateField('fechaInicio')"
                />
                <p v-if="errors.fechaInicio" class="text-red-400 text-xs mt-1">
                  {{ errors.fechaInicio }}
                </p>
              </div>

              <!-- Fecha vencimiento -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Fecha de vencimiento *
                </label>
                <UInput
                  v-model="form.fechaVencimiento"
                  type="date"
                  size="md"
                  :min="form.fechaInicio || today"
                  :color="errors.fechaVencimiento ? 'red' : 'white'"
                  @change="validateField('fechaVencimiento')"
                />
                <p v-if="errors.fechaVencimiento" class="text-red-400 text-xs mt-1">
                  {{ errors.fechaVencimiento }}
                </p>
              </div>

              <!-- Horas estimadas -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Horas estimadas *
                </label>
                <UInput
                  v-model.number="form.horasEstimadas"
                  type="number"
                  min="1"
                  max="1000"
                  step="0.5"
                  size="md"
                  :color="errors.horasEstimadas ? 'red' : 'white'"
                  @blur="validateField('horasEstimadas')"
                />
                <p v-if="errors.horasEstimadas" class="text-red-400 text-xs mt-1">
                  {{ errors.horasEstimadas }}
                </p>
              </div>
            </div>

            <!-- Ubicación y tags -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Ubicación -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Ubicación (opcional)
                </label>
                <UInput
                  v-model="form.ubicacion"
                  placeholder="Ej: Centro Comunitario Norte"
                  size="md"
                />
              </div>

              <!-- Tags -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Etiquetas (opcional)
                </label>
                <UInput
                  v-model="tagsInput"
                  placeholder="Separadas por comas"
                  size="md"
                  @blur="updateTags"
                />
                <div v-if="form.tags.length" class="flex flex-wrap gap-1 mt-2">
                  <UBadge
                    v-for="(tag, index) in form.tags"
                    :key="index"
                    color="blue"
                    variant="subtle"
                    size="sm"
                    class="flex items-center gap-1"
                  >
                    {{ tag }}
                    <UButton
                      icon="i-heroicons-x-mark"
                      size="2xs"
                      color="blue"
                      variant="ghost"
                      @click="removeTag(index)"
                    />
                  </UBadge>
                </div>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-end gap-3 pt-4 border-t border-gray-800">
              <UButton
                type="button"
                color="gray"
                variant="ghost"
                :disabled="isSubmitting"
                @click="$emit('cancel')"
              >
                Cancelar
              </UButton>
              <UButton
                type="submit"
                color="green"
                :loading="isSubmitting"
                :disabled="!isFormValid"
              >
                <UIcon name="i-heroicons-plus" class="mr-1" />
                {{ isSubmitting ? 'Creando...' : 'Crear Operación' }}
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(['submit', 'cancel']);

// Opciones
const tipoOptions = [
  { label: 'Tarea', value: 'tarea' },
  { label: 'Proyecto', value: 'proyecto' },
  { label: 'Seguimiento', value: 'seguimiento' }
];

const prioridadOptions = [
  { label: 'Baja', value: 'baja' },
  { label: 'Media', value: 'media' },
  { label: 'Alta', value: 'alta' },
  { label: 'Crítica', value: 'critica' }
];

const voluntarioOptions = [
  { label: 'Ana García', value: 'vol-001' },
  { label: 'Carlos Mendoza', value: 'vol-002' },
  { label: 'María Rodríguez', value: 'vol-003' },
  { label: 'Pedro Silva', value: 'vol-004' },
  { label: 'Laura Jiménez', value: 'vol-005' }
];

const areaOptions = [
  { label: 'Salud', value: 'Salud' },
  { label: 'Educación', value: 'Educación' },
  { label: 'Logística', value: 'Logística' },
  { label: 'TI', value: 'TI' },
  { label: 'Administración', value: 'Administración' },
  { label: 'Comunicación', value: 'Comunicación' },
  { label: 'Medio Ambiente', value: 'Medio Ambiente' },
  { label: 'Desarrollo Comunitario', value: 'Desarrollo Comunitario' }
];

// Estado del formulario
const form = ref({
  nombreActividad: '',
  descripcion: '',
  tipo: '',
  prioridad: 'media',
  voluntarioId: '',
  area: '',
  fechaInicio: '',
  fechaVencimiento: '',
  horasEstimadas: 8,
  ubicacion: '',
  tags: []
});

const errors = ref({});
const isSubmitting = ref(false);
const tagsInput = ref('');

// Fecha mínima (hoy)
const today = new Date().toISOString().split('T')[0];

// Validaciones
const isFormValid = computed(() => {
  return form.value.nombreActividad.trim() !== '' &&
         form.value.descripcion.trim() !== '' &&
         form.value.tipo !== '' &&
         form.value.prioridad !== '' &&
         form.value.voluntarioId !== '' &&
         form.value.area !== '' &&
         form.value.fechaInicio !== '' &&
         form.value.fechaVencimiento !== '' &&
         form.value.horasEstimadas > 0 &&
         Object.keys(errors.value).length === 0;
});

// Funciones
const clearError = (field) => {
  delete errors.value[field];
};

const validateField = (field) => {
  delete errors.value[field];

  switch (field) {
    case 'nombreActividad':
      if (!form.value.nombreActividad.trim()) {
        errors.value.nombreActividad = 'El nombre es obligatorio';
      } else if (form.value.nombreActividad.length < 5) {
        errors.value.nombreActividad = 'Mínimo 5 caracteres';
      }
      break;
      
    case 'descripcion':
      if (!form.value.descripcion.trim()) {
        errors.value.descripcion = 'La descripción es obligatoria';
      } else if (form.value.descripcion.length < 10) {
        errors.value.descripcion = 'Mínimo 10 caracteres';
      }
      break;
      
    case 'tipo':
      if (!form.value.tipo) {
        errors.value.tipo = 'Selecciona un tipo';
      }
      break;
      
    case 'prioridad':
      if (!form.value.prioridad) {
        errors.value.prioridad = 'Selecciona una prioridad';
      }
      break;
      
    case 'voluntarioId':
      if (!form.value.voluntarioId) {
        errors.value.voluntarioId = 'Selecciona un voluntario';
      }
      break;
      
    case 'area':
      if (!form.value.area) {
        errors.value.area = 'Selecciona un área';
      }
      break;
      
    case 'fechaInicio':
      if (!form.value.fechaInicio) {
        errors.value.fechaInicio = 'La fecha de inicio es obligatoria';
      }
      break;
      
    case 'fechaVencimiento':
      if (!form.value.fechaVencimiento) {
        errors.value.fechaVencimiento = 'La fecha de vencimiento es obligatoria';
      } else if (form.value.fechaInicio && form.value.fechaVencimiento <= form.value.fechaInicio) {
        errors.value.fechaVencimiento = 'Debe ser posterior a la fecha de inicio';
      }
      break;
      
    case 'horasEstimadas':
      if (!form.value.horasEstimadas || form.value.horasEstimadas <= 0) {
        errors.value.horasEstimadas = 'Las horas deben ser mayor a 0';
      }
      break;
  }
};

const updateTags = () => {
  if (tagsInput.value.trim()) {
    form.value.tags = tagsInput.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
  }
};

const removeTag = (index) => {
  form.value.tags.splice(index, 1);
  tagsInput.value = form.value.tags.join(', ');
};

const handleSubmit = async () => {
  // Validar todos los campos
  Object.keys(form.value).forEach(field => {
    if (['nombreActividad', 'descripcion', 'tipo', 'prioridad', 'voluntarioId', 'area', 'fechaInicio', 'fechaVencimiento', 'horasEstimadas'].includes(field)) {
      validateField(field);
    }
  });

  if (!isFormValid.value) return;

  isSubmitting.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const voluntario = voluntarioOptions.find(v => v.value === form.value.voluntarioId);
    
    const formData = {
      ...form.value,
      voluntarioNombre: voluntario?.label || '',
      estado: 'pendiente',
      progreso: 0,
      comentarios: [],
      historialCambios: [],
      creadoPor: 'current-user',
      asignadoPor: 'current-user',
      recursos: []
    };

    emit('submit', formData);
    resetForm();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  form.value = {
    nombreActividad: '',
    descripcion: '',
    tipo: '',
    prioridad: 'media',
    voluntarioId: '',
    area: '',
    fechaInicio: '',
    fechaVencimiento: '',
    horasEstimadas: 8,
    ubicacion: '',
    tags: []
  };
  errors.value = {};
  tagsInput.value = '';
};

// Watchers
watch(() => props.modelValue, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
  if (isOpen) resetForm();
});

watch(() => form.value.fechaInicio, () => {
  if (form.value.fechaInicio && form.value.fechaVencimiento && form.value.fechaVencimiento <= form.value.fechaInicio) {
    form.value.fechaVencimiento = '';
  }
});
</script>