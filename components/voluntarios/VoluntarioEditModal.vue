<template>
    <UModal v-model:open="isOpen" :dismissible="true" size="2xl">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <UIcon
              name="i-heroicons-pencil-square"
              class="mr-3 text-yellow-500 text-3xl"
            />
            <h3 class="text-2xl font-medium">Editar voluntario</h3>
          </div>
          <UBadge
            :color="form.estado === 'activo' ? 'success' : 'warning'"
            variant="subtle"
            size="xl"
            :icon="
              form.estado === 'activo'
                ? 'i-heroicons-check-circle'
                : 'i-heroicons-pause-circle'
            "
          >
            {{ form.estado }}
          </UBadge>
        </div>
      </template>
  
      <template #body>
        <div class="space-y-5">
          <!-- Cabecera con avatar -->
          <div
            class="flex items-center bg-gray-800/20 rounded-lg border border-gray-800 p-4"
          >
            <div class="relative">
              <div
                class="h-20 w-20 rounded-full relative overflow-hidden border-2 border-gray-800 shadow-md"
                :class="form.estado === 'activo' ? 'border-green-700' : 'border-yellow-700'"
              >
                <UAvatar
                  :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    form.nombre
                  )}&background=0369a1&color=ffffff`"
                  :alt="form.nombre"
                  class="h-20 w-20"
                />
              </div>
            </div>
  
            <div class="ml-5 flex-1">
              <div class="font-bold text-xl text-white">{{ form.nombre }}</div>
              <div class="flex items-center text-base text-gray-400">
                <UIcon
                  name="i-heroicons-identification"
                  class="mr-2 text-gray-500"
                />
                DNI: {{ voluntario.dni }}
              </div>
              <div class="flex items-center text-base text-gray-400">
                <UIcon name="i-heroicons-calendar" class="mr-2 text-gray-500" />
                Registrado el {{ formatDate(voluntario.fechaRegistro) }}
              </div>
            </div>
          </div>
  
          <!-- Información personal -->
          <div>
            <h4
              class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-3"
            >
              Información personal
            </h4>
  
            <!-- Grid de 2x2 -->
            <div class="grid grid-cols-2 gap-5">
              <!-- Nombre -->
              <div class="p-4 bg-gray-800/20 rounded-lg border border-gray-800">
                <UFormField
                  label="Nombre completo"
                  required
                  :error="errors.nombre"
                  class="mb-0"
                >
                  <UInput
                    v-model="form.nombre"
                    placeholder="Nombre y apellidos"
                    size="lg"
                    @blur="validateField('nombre')"
                  />
                </UFormField>
              </div>
  
              <!-- DNI -->
              <div class="p-4 bg-gray-800/20 rounded-lg border border-gray-800">
                <UFormField
                  label="DNI"
                  required
                  :error="errors.dni"
                  class="mb-0"
                >
                  <UInput
                    v-model="form.dni"
                    placeholder="Ej: 12345678A"
                    size="lg"
                    @blur="validateField('dni')"
                  />
                </UFormField>
              </div>
  
              <!-- Correo -->
              <div class="p-4 bg-gray-800/20 rounded-lg border border-gray-800">
                <UFormField
                  label="Correo electrónico"
                  required
                  :error="errors.correo"
                  class="mb-0"
                >
                  <UInput
                    v-model="form.correo"
                    type="email"
                    size="lg"
                    placeholder="ejemplo@correo.com"
                    @blur="validateField('correo')"
                  />
                </UFormField>
              </div>
  
              <!-- Teléfono -->
              <div class="p-4 bg-gray-800/20 rounded-lg border border-gray-800">
                <UFormField
                  label="Teléfono"
                  required
                  :error="errors.telefono"
                  class="mb-0"
                >
                  <UInput
                    v-model="form.telefono"
                    placeholder="Ej: 600123456"
                    size="lg"
                    @blur="validateField('telefono')"
                  />
                </UFormField>
              </div>
            </div>
          </div>
  
          <!-- Configuración y estado -->
          <div class="grid grid-cols-2 gap-5">
            <!-- Área -->
            <div>
              <h4
                class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-3"
              >
                Área asignada
              </h4>
              <div class="p-4 bg-gray-800/20 rounded-lg border border-gray-800">
                <UFormField label="Área" required class="mb-0">
                  <USelect
                    v-model="form.area"
                    :items="areaOptions"
                    placeholder="Seleccionar área"
                    size="lg"
                  />
                </UFormField>
              </div>
            </div>
  
            <!-- Estado -->
            <div>
              <h4
                class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-3"
              >
                Estado
              </h4>
              <div class="p-4 bg-gray-800/20 rounded-lg border border-gray-800">
                <UFormField label="Estado actual" required class="mb-0">
                  <USelect
                    v-model="form.estado"
                    :items="estadoOptions"
                    placeholder="Seleccionar estado"
                    size="lg"
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
  
        </div>
      </template>
  
      <template #footer>
        <div class="flex justify-between w-full py-2">
          <UButton
            color="neutral"
            variant="ghost"
            size="lg"
            @click="isOpen = false"
          >
            Cancelar
          </UButton>
          <UButton
            color="info"
            size="lg"
            icon="i-heroicons-check"
            :loading="saving"
            :disabled="!isFormValid || saving"
            @click="submit"
          >
            Guardar cambios
          </UButton>
        </div>
      </template>
    </UModal>
  </template>
  
  <script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { formatDate } from '~/utils/dateUtils';
import type { Voluntario } from '~/types/voluntarios';

// Props
const props = defineProps<{
  modelValue: boolean;
  voluntario: Voluntario;
  saving?: boolean;
}>();

// Emits
const emit = defineEmits<{
  (e: "update:modelValue", open: boolean): void;
  (e: "submit", voluntario: Voluntario): void;
}>();

// Estado del modal
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value)
});

// Estado del formulario
const form = reactive({
  ...props.voluntario,
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

// Resetear el formulario cuando cambie el voluntario
watch(
  () => props.voluntario,
  (newVoluntario) => {
    Object.assign(form, newVoluntario);
  },
  { immediate: true }
);

// Estado para errores
const errors = reactive({
  nombre: "",
  dni: "",
  correo: "",
  telefono: ""
});

// Comprobar si el formulario es válido
const isFormValid = computed(() => {
  return (
    form.nombre.trim() !== "" &&
    form.dni.trim() !== "" &&
    form.correo.trim() !== "" &&
    form.telefono.trim() !== "" &&
    !errors.nombre &&
    !errors.dni &&
    !errors.correo &&
    !errors.telefono
  );
});

// Validar un campo específico
function validateField(field: "nombre" | "dni" | "correo" | "telefono") {
  errors[field] = "";

  switch (field) {
    case "nombre":
      if (!form.nombre.trim()) {
        errors.nombre = "El nombre es obligatorio";
      } else if (form.nombre.length < 3) {
        errors.nombre = "El nombre debe tener al menos 3 caracteres";
      }
      break;

    case "dni":
      if (!form.dni.trim()) {
        errors.dni = "El DNI es obligatorio";
      } else if (!/^[0-9]{8}[A-Za-z]$/.test(form.dni)) {
        errors.dni = "Formato de DNI inválido (Ej: 12345678A)";
      }
      break;

    case "correo":
      if (!form.correo.trim()) {
        errors.correo = "El correo es obligatorio";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
        errors.correo = "Introduce un correo electrónico válido";
      }
      break;

    case "telefono":
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
  validateField("nombre");
  validateField("dni");
  validateField("correo");
  validateField("telefono");

  return !errors.nombre && !errors.dni && !errors.correo && !errors.telefono;
}

// Enviar el formulario
function submit() {
  if (!validateForm()) return;

  // Actualizar voluntario
  emit("submit", {
    ...props.voluntario,
    nombre: form.nombre,
    dni: form.dni,
    correo: form.correo,
    telefono: form.telefono,
    area: form.area,
    estado: form.estado
  });
}

// Limpiar errores al cerrar el modal
watch(isOpen, (val) => {
  if (!val) {
    Object.keys(errors).forEach((key) => {
      errors[key as keyof typeof errors] = "";
    });
  }
});
</script>