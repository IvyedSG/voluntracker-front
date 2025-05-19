<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\coordinadores\CoordinadorEditModal.vue -->
<template>
    <UModal 
      v-model="isOpen" 
      :ui="{ 
        container: 'bg-gray-900 border border-gray-800 max-w-2xl',
        overlay: 'backdrop-blur-sm'
      }"
    >
      <div class="p-5">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 rounded-full bg-yellow-900/30 flex items-center justify-center mr-4">
            <UIcon name="i-heroicons-pencil-square" class="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h2 class="text-xl font-semibold text-white">Editar coordinador</h2>
            <p class="text-gray-400 text-sm">ID: {{ coordinador.id }}</p>
          </div>
          <UBadge 
            :color="getEstadoColor(coordinador.estado)" 
            :variant="coordinador.estado === 'activo' ? 'solid' : 'subtle'"
            size="md"
            class="ml-auto"
            :icon="getEstadoIcon(coordinador.estado)"
          >
            {{ formatEstado(coordinador.estado) }}
          </UBadge>
        </div>
  
        <!-- Formulario -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Información personal -->
          <div class="space-y-4">
            <!-- Nombre -->
            <UFormGroup label="Nombre completo" name="nombre" required>
              <UInput
                v-model="form.nombre"
                placeholder="Nombre completo del coordinador"
                size="lg"
                :ui="{
                  base: 'bg-gray-800/50 border-gray-700',
                  focus: 'ring-yellow-500/50'
                }"
                @blur="validateField('nombre')"
              />
              <template #error>
                <p v-if="errors.nombre" class="text-red-400 text-sm mt-1">{{ errors.nombre }}</p>
              </template>
            </UFormGroup>
  
            <!-- Correo -->
            <UFormGroup label="Correo electrónico" name="correo" required>
              <UInput
                v-model="form.correo"
                type="email"
                placeholder="ejemplo@organizacion.org"
                size="lg"
                :ui="{
                  base: 'bg-gray-800/50 border-gray-700',
                  focus: 'ring-yellow-500/50'
                }"
                @blur="validateField('correo')"
              />
              <template #error>
                <p v-if="errors.correo" class="text-red-400 text-sm mt-1">{{ errors.correo }}</p>
              </template>
              <template #description>
                <p class="text-gray-400 text-xs">
                  Cambiar el correo electrónico requerirá reenviar la invitación al nuevo correo.
                </p>
              </template>
            </UFormGroup>
          </div>
  
          <!-- Configuración y asignaciones -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Rol y Nivel de Acceso -->
            <div class="space-y-4">
              <!-- Estado -->
              <UFormGroup label="Estado" name="estado">
                <USelect
                  v-model="form.estado"
                  :options="estadoOptions"
                  size="lg"
                  :ui="{
                    base: 'bg-gray-800/50 border-gray-700',
                    focus: 'ring-yellow-500/50'
                  }"
                >
                  <template #option="{ option }">
                    <div class="flex items-center">
                      <UIcon :name="getEstadoIcon(option.value)" class="mr-2" :class="getEstadoIconClass(option.value)" />
                      <span>{{ option.label }}</span>
                    </div>
                  </template>
                </USelect>
              </UFormGroup>
  
              <!-- Rol -->
              <UFormGroup label="Rol" name="rol" required>
                <USelect
                  v-model="form.rol"
                  :options="rolOptions"
                  placeholder="Seleccionar rol"
                  size="lg"
                  :ui="{
                    base: 'bg-gray-800/50 border-gray-700',
                    focus: 'ring-yellow-500/50'
                  }"
                  @blur="validateField('rol')"
                >
                  <template #option="{ option }">
                    <div class="flex items-center">
                      <UIcon :name="getRolIcon(option.value)" class="mr-2 text-blue-400" />
                      <span>{{ option.label }}</span>
                    </div>
                  </template>
                </USelect>
                <template #error>
                  <p v-if="errors.rol" class="text-red-400 text-sm mt-1">{{ errors.rol }}</p>
                </template>
              </UFormGroup>
  
              <!-- Nivel de Acceso -->
              <UFormGroup label="Nivel de acceso" name="nivel" required>
                <USelect
                  v-model="form.nivel"
                  :options="nivelOptions"
                  placeholder="Seleccionar nivel de acceso"
                  size="lg"
                  :ui="{
                    base: 'bg-gray-800/50 border-gray-700',
                    focus: 'ring-yellow-500/50'
                  }"
                  @blur="validateField('nivel')"
                >
                  <template #option="{ option }">
                    <div class="flex items-center">
                      <UIcon 
                        :name="option.value === 'avanzado' ? 'i-heroicons-star' : 'i-heroicons-academic-cap'" 
                        class="mr-2"
                        :class="option.value === 'avanzado' ? 'text-purple-400' : 'text-blue-400'"
                      />
                      <span>{{ option.label }}</span>
                    </div>
                  </template>
                </USelect>
                <template #error>
                  <p v-if="errors.nivel" class="text-red-400 text-sm mt-1">{{ errors.nivel }}</p>
                </template>
              </UFormGroup>
            </div>
  
            <!-- Áreas asignadas -->
            <div>
              <UFormGroup label="Áreas asignadas" name="areas">
                <USelectMenu
                  v-model="form.areas"
                  :options="areasOptions"
                  multiple
                  placeholder="Seleccionar áreas"
                  size="lg"
                  :ui="{
                    base: 'bg-gray-800/50 border-gray-700',
                    focus: 'ring-yellow-500/50'
                  }"
                >
                  <template #label>
                    <div class="flex items-center">
                      <span v-if="form.areas.length === 0">Seleccionar áreas</span>
                      <span v-else>{{ form.areas.length }} áreas seleccionadas</span>
                    </div>
                  </template>
                </USelectMenu>
                <template #description>
                  <p class="text-gray-400 text-xs">Las áreas determinan a qué partes del sistema tendrá acceso este coordinador.</p>
                </template>
              </UFormGroup>
  
              <!-- Información de registro -->
              <div class="mt-5 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <h4 class="text-sm font-medium text-gray-300 mb-2">Información de registro</h4>
                <div class="grid grid-cols-1 gap-2 text-xs text-gray-400">
                  <div class="flex justify-between">
                    <span>Fecha de registro:</span>
                    <span class="font-medium text-gray-300">{{ formatDate(coordinador.fechaRegistro) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Último acceso:</span>
                    <span class="font-medium text-gray-300">
                      {{ coordinador.ultimoAcceso ? formatDate(coordinador.ultimoAcceso) : 'Nunca' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Botones de acción -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <UButton 
              type="button"
              color="gray"
              variant="ghost"
              @click="$emit('cancel')"
            >
              Cancelar
            </UButton>
            <UButton 
              type="submit"
              color="amber"
              :loading="isSubmitting"
              :disabled="isSubmitting || !isFormValid"
            >
              <UIcon name="i-heroicons-check-circle" class="mr-1" />
              Guardar cambios
            </UButton>
          </div>
        </form>
      </div>
    </UModal>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import { formatDate } from '~/utils/dateUtils';
  
  // Props
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    coordinador: {
      type: Object,
      required: true
    }
  });
  
  // Emits
  const emit = defineEmits(['update:modelValue', 'submit', 'cancel']);
  
  // Sincronizar el estado del modal con v-model
  const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });
  
  // Opciones para los selects
  const rolOptions = [
    { label: 'Administrador Global', value: 'admin_global' },
    { label: 'Líder Local', value: 'lider_local' },
    { label: 'Coordinador Local', value: 'coordinador_local' },
    { label: 'Voluntario', value: 'voluntario' }
  ];
  
  const nivelOptions = [
    { label: 'Básico', value: 'basico' },
    { label: 'Avanzado', value: 'avanzado' }
  ];
  
  const estadoOptions = [
    { label: 'Activo', value: 'activo' },
    { label: 'Inactivo', value: 'inactivo' },
    { label: 'Pendiente', value: 'pendiente' }
  ];
  
  const areasOptions = [
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
    id: '',
    nombre: '',
    correo: '',
    rol: '',
    nivel: '',
    estado: '',
    areas: [],
    fechaRegistro: '',
    ultimoAcceso: null
  });
  
  // Estado de errores del formulario
  const errors = ref({
    nombre: '',
    correo: '',
    rol: '',
    nivel: ''
  });
  
  // Estado de envío del formulario
  const isSubmitting = ref(false);
  
  // Computed para verificar si el formulario es válido
  const isFormValid = computed(() => {
    return (
      form.value.nombre.trim() !== '' &&
      form.value.correo.trim() !== '' &&
      form.value.rol !== '' &&
      form.value.nivel !== '' &&
      Object.values(errors.value).every(error => error === '')
    );
  });
  
  // Inicializar el formulario con los datos del coordinador
  onMounted(() => {
    initializeForm();
  });
  
  // También reinicializar cuando cambie el coordinador
  watch(() => props.coordinador, () => {
    initializeForm();
  }, { deep: true });
  
  // Inicializar formulario
  function initializeForm() {
  if (props.coordinador) {
    form.value = {
      id: props.coordinador.id,
      nombre: props.coordinador.nombre,
      correo: props.coordinador.correo,
      rol: props.coordinador.rol,
      nivel: props.coordinador.nivelAcceso,  // Corregido
      estado: props.coordinador.estado,
      areas: [...props.coordinador.areasAsignadas.map(a => a.nombre)],  // Corregido y mapeado
      fechaRegistro: props.coordinador.fechaRegistro,
      ultimoAcceso: props.coordinador.ultimoAcceso
    };
  }
}
  
  // Validar campos individuales
  const validateField = (field) => {
    errors.value[field] = '';
  
    if (field === 'nombre') {
      if (!form.value.nombre.trim()) {
        errors.value.nombre = 'El nombre es obligatorio';
      } else if (form.value.nombre.length < 3) {
        errors.value.nombre = 'El nombre debe tener al menos 3 caracteres';
      }
    }
  
    if (field === 'correo') {
      if (!form.value.correo.trim()) {
        errors.value.correo = 'El correo es obligatorio';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.correo)) {
        errors.value.correo = 'El formato del correo no es válido';
      }
    }
  
    if (field === 'rol' && !form.value.rol) {
      errors.value.rol = 'Debes seleccionar un rol';
    }
  
    if (field === 'nivel' && !form.value.nivel) {
      errors.value.nivel = 'Debes seleccionar un nivel de acceso';
    }
  };
  
  // Validar todo el formulario
  const validateForm = () => {
    validateField('nombre');
    validateField('correo');
    validateField('rol');
    validateField('nivel');
    
    return Object.values(errors.value).every(error => error === '');
  };
  
  // Manejar el envío del formulario
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    isSubmitting.value = true;
    
    try {
      // Emitir el evento submit con los datos actualizados del formulario
      emit('submit', { ...form.value });
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  // Función para obtener el icono según el rol
  function getRolIcon(rol) {
    switch (rol) {
      case 'admin_global': return 'i-heroicons-shield-exclamation';
      case 'lider_local': return 'i-heroicons-identification';
      case 'coordinador_local': return 'i-heroicons-user-group';
      case 'voluntario': return 'i-heroicons-user';
      default: return 'i-heroicons-user';
    }
  }
  
  // Función para formatear el estado
  function formatEstado(estado) {
    switch (estado) {
      case 'activo': return 'Activo';
      case 'inactivo': return 'Inactivo';
      case 'pendiente': return 'Pendiente';
      default: return estado;
    }
  }
  
  // Función para obtener el color según el estado
  function getEstadoColor(estado) {
    switch (estado) {
      case 'activo': return 'success';
      case 'inactivo': return 'warning';
      case 'pendiente': return 'blue';
      default: return 'gray';
    }
  }
  
  // Función para obtener el icono según el estado
  function getEstadoIcon(estado) {
    switch (estado) {
      case 'activo': return 'i-heroicons-check-circle';
      case 'inactivo': return 'i-heroicons-pause-circle';
      case 'pendiente': return 'i-heroicons-clock';
      default: return 'i-heroicons-question-mark-circle';
    }
  }
  
  // Función para obtener la clase del icono según el estado
  function getEstadoIconClass(estado) {
    switch (estado) {
      case 'activo': return 'text-green-500';
      case 'inactivo': return 'text-amber-500';
      case 'pendiente': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  }
  </script>