<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\coordinadores\CoordinadorAddModal.vue -->
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
          <div class="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mr-4">
            <UIcon name="i-heroicons-user-plus" class="h-6 w-6 text-green-400" />
          </div>
          <h2 class="text-xl font-semibold text-white">Añadir coordinador</h2>
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
                  focus: 'ring-green-500/50'
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
                  focus: 'ring-green-500/50'
                }"
                @blur="validateField('correo')"
              />
              <template #error>
                <p v-if="errors.correo" class="text-red-400 text-sm mt-1">{{ errors.correo }}</p>
              </template>
            </UFormGroup>
          </div>
  
          <!-- Configuración -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Rol y Nivel de Acceso -->
            <div class="space-y-4">
              <!-- Rol -->
              <UFormGroup label="Rol" name="rol" required>
                <USelect
                  v-model="form.rol"
                  :options="rolOptions"
                  placeholder="Seleccionar rol"
                  size="lg"
                  :ui="{
                    base: 'bg-gray-800/50 border-gray-700',
                    focus: 'ring-green-500/50'
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
              <UFormGroup label="Nivel de acceso" name="nivelAcceso" required>
                <USelect
                  v-model="form.nivelAcceso"
                  :options="nivelOptions"
                  placeholder="Seleccionar nivel de acceso"
                  size="lg"
                  :ui="{
                    base: 'bg-gray-800/50 border-gray-700',
                    focus: 'ring-green-500/50'
                  }"
                  @blur="validateField('nivelAcceso')"
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
                  <p v-if="errors.nivelAcceso" class="text-red-400 text-sm mt-1">{{ errors.nivelAcceso }}</p>
                </template>
              </UFormGroup>
            </div>
  
            <!-- Áreas asignadas -->
            <div>
              <UFormGroup label="Áreas asignadas" name="areasAsignadas">
                <USelectMenu
                  v-model="form.areasAsignadas"
                  :options="areasOptions"
                  multiple
                  placeholder="Seleccionar áreas"
                  size="lg"
                  :ui="{
                    base: 'bg-gray-800/50 border-gray-700',
                    focus: 'ring-green-500/50'
                  }"
                  @blur="validateField('areasAsignadas')"
                >
                  <template #label>
                    <div class="flex items-center">
                      <span v-if="form.areasAsignadas.length === 0">Seleccionar áreas</span>
                      <span v-else>{{ form.areasAsignadas.length }} áreas seleccionadas</span>
                    </div>
                  </template>
                </USelectMenu>
                <template #description>
                  <p class="text-gray-400 text-xs">Las áreas determinan a qué partes del sistema tendrá acceso este coordinador.</p>
                </template>
                <template #error>
                  <p v-if="errors.areasAsignadas" class="text-red-400 text-sm mt-1">{{ errors.areasAsignadas }}</p>
                </template>
              </UFormGroup>
  
              <!-- Límites según el plan -->
              <div class="mt-4 p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg text-sm">
                <div class="flex items-start">
                  <UIcon name="i-heroicons-information-circle" class="mr-2 mt-0.5 text-blue-400 flex-shrink-0" />
                  <div>
                    <p class="text-blue-300">Este usuario tendrá acceso a las áreas seleccionadas según los límites de tu plan.</p>
                    <p class="text-blue-400 mt-1 text-xs">Límite de áreas según tu plan: <span class="font-semibold">Ilimitado</span></p>
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
              color="green"
              :loading="isSubmitting"
              :disabled="isSubmitting || !isFormValid"
            >
              <UIcon name="i-heroicons-user-plus" class="mr-1" />
              Añadir coordinador
            </UButton>
          </div>
        </form>
      </div>
    </UModal>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  // Props
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
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
  ];
  
  const nivelOptions = [
    { label: 'Básico', value: 'basico' },
    { label: 'Avanzado', value: 'avanzado' }
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
    nombre: '',
    correo: '',
    rol: '',
    nivelAcceso: 'basico',
    areasAsignadas: [],
    estado: 'pendiente' // Por defecto al crear es pendiente hasta confirmación
  });
  
  // Estado de errores del formulario
  const errors = ref({
    nombre: '',
    correo: '',
    rol: '',
    nivelAcceso: '',
    areasAsignadas: ''
  });
  
  // Estado de envío del formulario
  const isSubmitting = ref(false);
  
  // Computed para verificar si el formulario es válido
  const isFormValid = computed(() => {
    return (
      form.value.nombre.trim() !== '' &&
      form.value.correo.trim() !== '' &&
      form.value.rol !== '' &&
      form.value.nivelAcceso !== '' &&
      Object.values(errors.value).every(error => error === '')
    );
  });
  
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
  
    if (field === 'nivelAcceso' && !form.value.nivelAcceso) {
      errors.value.nivelAcceso = 'Debes seleccionar un nivel de acceso';
    }
  };
  
  // Validar todo el formulario
  const validateForm = () => {
    validateField('nombre');
    validateField('correo');
    validateField('rol');
    validateField('nivelAcceso');
    
    return Object.values(errors.value).every(error => error === '');
  };
  
  // Manejar el envío del formulario
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    isSubmitting.value = true;
    
    try {
      // Preparar los datos a enviar
      const formData = {
        nombre: form.value.nombre,
        correo: form.value.correo,
        rol: form.value.rol,
        nivelAcceso: form.value.nivelAcceso,
        areasAsignadas: form.value.areasAsignadas,
        estado: 'pendiente'
      };
      
      // Emitir el evento submit con los datos del formulario
      emit('submit', formData);
      
      // Resetear el formulario tras envío exitoso
      resetForm();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  // Resetear el formulario
  const resetForm = () => {
    form.value = {
      nombre: '',
      correo: '',
      rol: '',
      nivelAcceso: 'basico',
      areasAsignadas: [],
      estado: 'pendiente'
    };
    errors.value = {
      nombre: '',
      correo: '',
      rol: '',
      nivelAcceso: '',
      areasAsignadas: ''
    };
  };
  
  // Resetear el formulario cuando se cierra el modal
  watch(isOpen, (newValue) => {
    if (!newValue) {
      resetForm();
    }
  });
  
  // Función para obtener el icono según el rol
  function getRolIcon(rol) {
    switch (rol) {
      case 'admin_global': return 'i-heroicons-shield-exclamation';
      case 'lider_local': return 'i-heroicons-identification';
      case 'coordinador_local': return 'i-heroicons-user-group';
      default: return 'i-heroicons-user';
    }
  }
  </script>