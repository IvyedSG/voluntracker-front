<template>
  <UModal 
    v-model:open="isOpen" 
    :dismissible="true"
    size="2xl"
  >
    <template #header>
      <div class="flex items-center bg-gradient-to-r from-green-900/30 to-emerald-900/20 p-3 rounded-lg">
        <UIcon name="i-heroicons-user-plus" class="mr-3 text-green-500 text-2xl" />
        <h3 class="text-xl font-medium bg-gradient-to-r from-white to-green-100 text-transparent bg-clip-text">Añadir nuevo voluntario</h3>
      </div>
    </template>
    
    <template #body>
      <div class="space-y-6 py-3">
        <!-- Formulario de creación con estilos mejorados -->
        <form class="space-y-5" @submit.prevent="submit">
          <!-- Información personal -->
          <div class="space-y-4">
            <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 flex items-center pl-1 border-l-4 border-green-500">
              <UIcon name="i-heroicons-user-circle" class="mr-2 text-green-500" />
              Información personal
            </h4>
            
            <!-- Nombre y DNI -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="Nombre completo" required :error="errors.nombre" class="mb-3">
                <UInput 
                  v-model="form.nombre" 
                  placeholder="Nombre y apellidos"
                  size="lg"
                  class="bg-gray-800/40 border-gray-700 focus-within:ring-1 focus-within:ring-green-500/50 transition-all"
                  @blur="validateField('nombre')"
                />
              </UFormField>
              
              <UFormField label="DNI" required :error="errors.dni" class="mb-3">
                <UInput 
                  v-model="form.dni" 
                  placeholder="Ej: 12345678A"
                  size="lg"
                  class="bg-gray-800/40 border-gray-700 focus-within:ring-1 focus-within:ring-green-500/50 transition-all"
                  @blur="validateField('dni')"
                />
              </UFormField>
            </div>
            
            <!-- Correo y teléfono -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="Correo electrónico" required :error="errors.correo" class="mb-3">
                <UInput 
                  v-model="form.correo" 
                  type="email" 
                  size="lg"
                  placeholder="ejemplo@correo.com"
                  class="bg-gray-800/40 border-gray-700 focus-within:ring-1 focus-within:ring-green-500/50 transition-all"
                  @blur="validateField('correo')"
                />
              </UFormField>
              
              <UFormField label="Teléfono" required :error="errors.telefono" class="mb-3">
                <UInput 
                  v-model="form.telefono" 
                  placeholder="Ej: 600123456"
                  size="lg"
                  class="bg-gray-800/40 border-gray-700 focus-within:ring-1 focus-within:ring-green-500/50 transition-all"
                  @blur="validateField('telefono')"
                />
              </UFormField>
            </div>
          </div>
          
          <!-- Asignación y estado -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <div>
              <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 flex items-center pl-1 border-l-4 border-green-500 mb-3">
                <UIcon name="i-heroicons-briefcase" class="mr-2 text-green-500" />
                Asignación
              </h4>
              <div class="p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-800">
                <UFormField label="Área" required class="mb-0">
                  <USelect
                    v-model="form.area"
                    :items="areaOptions"
                    placeholder="Seleccionar área"
                    size="lg"
                    class="bg-gray-800/40 border-gray-700"
                  />
                </UFormField>
              </div>
            </div>
            
            <div>
              <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 flex items-center pl-1 border-l-4 border-green-500 mb-3">
                <UIcon name="i-heroicons-flag" class="mr-2 text-green-500" />
                Estado
              </h4>
              <div class="p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-800">
                <UFormField label="Estado inicial" required class="mb-0">
                  <USelect
                    v-model="form.estado"
                    :items="estadoOptions"
                    placeholder="Seleccionar estado"
                    size="lg"
                    class="bg-gray-800/40 border-gray-700"
                  >
                    <template #item="{ item }">
                      <div class="flex items-center gap-2">
                        <UIcon 
                          :name="item.value === 'activo' ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle'" 
                          :class="item.value === 'activo' ? 'text-green-500' : 'text-yellow-500'" 
                        />
                        <span>{{ item.label }}</span>
                      </div>
                    </template>
                  </USelect>
                </UFormField>
              </div>
            </div>
          </div>
        </form>
      </div>
    </template>
    
    <template #footer>
      <div class="flex justify-between w-full py-3 border-t border-gray-800">
        <UButton 
          color="neutral" 
          variant="ghost" 
          size="lg"
          @click="cancel"
          class="hover:bg-gray-800 transition-colors"
        >
          Cancelar
        </UButton>
        <UButton
          color="success"
          size="lg"
          :loading="saving"
          :disabled="!isFormValid || saving"
          @click="submit"
          class="shadow-md hover:shadow-lg hover:shadow-green-900/30 transition-all"
        >
          <UIcon name="i-heroicons-check" class="mr-1" />
          Guardar
        </UButton>
      </div>
    </template>
  </UModal>
</template>
  
  <script setup lang="ts">
  import {reactive, computed, watch } from 'vue';
import type { Voluntario } from '~/types/voluntarios';

// Props
const props = defineProps<{
  modelValue: boolean; // Cambiar 'open' por 'modelValue'
  saving?: boolean;
}>();

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', open: boolean): void; // Cambiar 'update:open' por 'update:modelValue'
  (e: 'submit', data: Omit<Voluntario, 'id' | 'fechaRegistro' | 'historial'>): void; // Cambiar 'save' por 'submit'
}>();

// Estado del modal
const isOpen = computed({
  get: () => props.modelValue, // Cambiar props.open por props.modelValue
  set: (value) => emit('update:modelValue', value) // Cambiar 'update:open' por 'update:modelValue'
});

  
  // Estado del formulario
  const form = reactive({
    nombre: '',
    dni: '',
    correo: '',
    telefono: '',
    area: 'Otros',
    estado: 'activo'
  });
  
  // Opciones para los selectores
  const areaOptions = [
    { label: "Salud", value: "Salud" },
    { label: "Educación", value: "Educación" },
    { label: "TI", value: "TI" },
    { label: "Administración", value: "Administración" },
    { label: "Logística", value: "Logística" },
    { label: "Comunicación", value: "Comunicación" },
    { label: "Otros", value: "Otros" }
  ];
  
  const estadoOptions = [
    { label: "Activo", value: "activo" },
    { label: "Inactivo", value: "inactivo" }
  ];
  
  // Estado para errores
  const errors = reactive({
    nombre: '',
    dni: '',
    correo: '',
    telefono: ''
  });
  
  // Comprobar si el formulario es válido
  const isFormValid = computed(() => {
    return (
      form.nombre.trim() !== '' &&
      form.dni.trim() !== '' &&
      form.correo.trim() !== '' &&
      form.telefono.trim() !== '' &&
      form.area.trim() !== '' &&
      form.estado.trim() !== '' &&
      !errors.nombre &&
      !errors.dni &&
      !errors.correo &&
      !errors.telefono
    );
  });
  
  // Validar un campo específico
  function validateField(field: 'nombre' | 'dni' | 'correo' | 'telefono') {
    errors[field] = '';
  
    switch (field) {
      case 'nombre':
        if (!form.nombre.trim()) {
          errors.nombre = "El nombre es obligatorio";
        } else if (form.nombre.length < 3) {
          errors.nombre = "El nombre debe tener al menos 3 caracteres";
        }
        break;
  
      case 'dni':
        if (!form.dni.trim()) {
          errors.dni = "El DNI es obligatorio";
        } else if (!/^[0-9]{8}[A-Za-z]$/.test(form.dni)) {
          errors.dni = "Formato de DNI inválido (Ej: 12345678A)";
        }
        break;
  
      case 'correo':
        if (!form.correo.trim()) {
          errors.correo = "El correo es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
          errors.correo = "Introduce un correo electrónico válido";
        }
        break;
  
      case 'telefono':
        if (!form.telefono.trim()) {
          errors.telefono = "El teléfono es obligatorio";
        } else if (!/^[0-9]{9}$/.test(form.telefono)) {
          errors.telefono = "Introduce un número de teléfono válido (9 dígitos)";
        }
        break;
    }
  }
  
  // Validar todos los campos
  function validateForm() {
    validateField('nombre');
    validateField('dni');
    validateField('correo');
    validateField('telefono');
    
    return !errors.nombre && !errors.dni && !errors.correo && !errors.telefono;
  }
  
  // Enviar el formulario
function submit() {
  if (!validateForm()) return;
  
  // Crear objeto con datos del voluntario
  const newVoluntario = {
    nombre: form.nombre,
    dni: form.dni,
    correo: form.correo,
    telefono: form.telefono,
    area: form.area,
    estado: form.estado
  };
  
  // Emitir evento para guardar
  emit('submit', newVoluntario); // Cambiar 'save' por 'submit'
}
  // Cancelar y cerrar el modal
  function cancel() {
    // Resetear el formulario
    Object.assign(form, {
      nombre: '',
      dni: '',
      correo: '',
      telefono: '',
      area: 'Otros',
      estado: 'activo'
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