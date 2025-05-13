<template>
  <UModal v-model:open="isOpen" :dismissible="true" size="3xl">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <UIcon
            name="i-heroicons-pencil-square"
            class="mr-3 text-yellow-500 text-3xl"
          />
          <!-- Aumentado de 2xl a 3xl -->
          <h3 class="text-2xl font-medium">Editar organización</h3>
          <!-- Aumentado de xl a 2xl -->
        </div>
        <UBadge
          :color="form.activo ? 'success' : 'warning'"
          variant="subtle"
          size="xl"
          :icon="
            form.activo
              ? 'i-heroicons-check-circle'
              : 'i-heroicons-pause-circle'
          "
        >
          {{ form.activo ? "Activo" : "Inactivo" }}
        </UBadge>
      </div>
    </template>

    <template #body>
      <div class="space-y-5">
        <!-- Aumentado de 4 a 5 -->
        <!-- Cabecera con logo e info básica -->
        <div
          class="flex items-center bg-gray-800/20 rounded-lg border border-gray-800 p-4"
        >
          <!-- Aumentado de p-3 a p-4 -->
          <div class="relative">
            <div
              class="h-20 w-20 rounded-xl relative overflow-hidden border-2 border-gray-800 shadow-md"
              :style="{ 'border-color': `${form.colorPrimario}40` }"
            >
              <div
                class="absolute inset-0 opacity-20"
                :style="{ backgroundColor: form.colorPrimario }"
              />
              <img
                :src="
                  form.logo ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    form.nombre
                  )}&background=0D9488&color=ffffff`
                "
                :alt="form.nombre"
                class="h-full w-full object-cover"
              />
            </div>

            <!-- Botón para cambiar logo -->
            <div
              class="absolute bottom-0 right-0 p-1.5 bg-gray-900 rounded-md border border-gray-700 cursor-pointer shadow-lg"
              @click="() => {}"
            >
              <UIcon
                name="i-heroicons-camera"
                size="md"
                class="text-gray-300"
              />
              <!-- Aumentado de sm a md -->
            </div>
          </div>

          <div class="ml-5 flex-1">
            <!-- Aumentado de ml-4 a ml-5 -->
            <div class="font-bold text-xl text-white">{{ form.nombre }}</div>
            <!-- Aumentado de lg a xl -->
            <div class="flex items-center text-base text-gray-400">
              <!-- Aumentado de sm a base -->
              <UIcon
                name="i-heroicons-identification"
                class="mr-2 text-gray-500"
              />
              <!-- Aumentado de mr-1 a mr-2 -->
              ID: {{ tenant.id }}
            </div>
            <div class="flex items-center text-base text-gray-400">
              <!-- Aumentado de sm a base -->
              <UIcon name="i-heroicons-calendar" class="mr-2 text-gray-500" />
              <!-- Aumentado de mr-1 a mr-2 -->
              Creado el {{ formatDate(tenant.fechaCreacion) }}
            </div>
          </div>
        </div>

        <!-- Información principal en grid de 2x2 -->
        <div>
          <h4
            class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-3"
          >
            Información general
          </h4>
          <!-- Aumentado de sm a base y mb-2 a mb-3 -->

          <!-- Grid de 2x2 -->
          <div class="grid grid-cols-2 gap-5">
            <!-- Aumentado de gap-4 a gap-5 -->
            <!-- Fila 1, Columna 1: Nombre -->
            <div class="p-4 bg-gray-800/20 rounded-lg border border-gray-800">
              <!-- Aumentado de p-3 a p-4 -->
              <UFormField
                label="Nombre de la organización"
                required
                :error="errors.nombre"
                class="mb-0"
              >
                <UInput
                  v-model="form.nombre"
                  placeholder="Ej: Cruz Roja Argentina"
                  size="lg"
                  @blur="validateField('nombre')"
                />
              </UFormField>
            </div>

            <!-- Fila 1, Columna 2: Subdominio -->
            <div class="p-4 bg-gray-800/20 rounded-lg border border-gray-800">
              <!-- Aumentado de p-3 a p-4 -->
              <UFormField
                label="Subdominio"
                required
                :error="errors.subdominio"
                class="mb-0"
              >
                <div class="flex items-center gap-2">
                  <UInput
                    v-model="form.subdominio"
                    placeholder="Ej: cruzroja"
                    size="lg"
                    @input="handleSubdomainInput"
                    @blur="validateField('subdominio')"
                  />
                  <span class="text-base text-gray-400 whitespace-nowrap"
                    >.voluntracker.org</span
                  >
                  <!-- Aumentado de sm a base -->
                </div>
              </UFormField>
            </div>

            <!-- Fila 2, Columna 1: Email -->
            <div class="p-4 bg-gray-800/20 rounded-lg border border-gray-800">
              <!-- Aumentado de p-3 a p-4 -->
              <UFormField
                label="Email de contacto"
                required
                :error="errors.correo"
                class="mb-0"
              >
                <UInput
                  v-model="form.correo"
                  type="email"
                  size="lg"
                  placeholder="admin@organizacion.org"
                  @blur="validateField('correo')"
                />
              </UFormField>
            </div>

            <!-- Fila 2, Columna 2: Color primario -->
            <div class="p-4 bg-gray-800/20 rounded-lg border border-gray-800">
              <UFormField label="Color primario" class="mb-0">
                <div class="flex items-center gap-4">
                  <div
                    class="h-12 w-12 rounded-full cursor-pointer border-2 border-gray-700 transition-transform hover:scale-110 relative shadow-md"
                    :style="{ backgroundColor: form.colorPrimario }"
                    @click="colorPickerOpen = !colorPickerOpen"
                  >
                    <!-- Tooltip -->
                    <div v-if="!colorPickerOpen" class="cursor-pointer">
                      <UTooltip
                        text="Elegir color"
                        :popper="{ placement: 'top' }"
                      />
                    </div>
                  </div>
                  <div class="flex-1">
                    <UInput
                      v-model="form.colorPrimario"
                      placeholder="#00AB55"
                      size="lg"
                    />
                  </div>

                  <!-- Color picker -->
                  <div
                    v-if="colorPickerOpen"
                    class="absolute mt-1 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10"
                  >
                    <div class="grid grid-cols-5 gap-3 mb-3">
                      <!-- Aumentado de gap-2 mb-2 a gap-3 mb-3 -->
                      <div
                        v-for="color in predefinedColors"
                        :key="color"
                        class="h-8 w-8 rounded-full cursor-pointer border border-gray-700 transition-transform hover:scale-110 shadow-sm"
                        :style="{ backgroundColor: color }"
                        @click="selectColor(color)"
                      />
                    </div>
                    <div class="flex justify-end">
                      <UButton
                        size="sm"
                        color="neutral"
                        variant="ghost"
                        @click="colorPickerOpen = false"
                      >
                        <!-- Aumentado de xs a sm -->
                        Cerrar
                      </UButton>
                    </div>
                  </div>
                </div>
              </UFormField>
            </div>
          </div>
        </div>

        <!-- Configuración y estadísticas -->
        <div class="flex gap-5">
          <!-- Aumentado de gap-4 a gap-5 -->
          <!-- Plan de suscripción (3/4) -->
          <div class="w-3/4">
            <h4
              class="text-base font-semibold uppercase tracking-wider text-gray-400 mb-3"
            >
              Plan de suscripción
            </h4>
            <div
              class="p-4 bg-gray-800/20 rounded-lg border border-gray-800 h-[120px] flex items-center"
            >
              <div class="flex items-center justify-between w-full">
                <USelectMenu
                  v-model="form.plan"
                  :options="planOptions"
                  placeholder="Seleccionar plan"
                  size="lg"
                  class="w-72"
                />

                <div
                  class="ml-5 bg-gray-800/40 p-3 rounded-lg flex items-center"
                >
                  <UIcon
                    :name="
                      form.plan === 'Premium'
                        ? 'i-heroicons-star'
                        : form.plan === 'Pro'
                        ? 'i-heroicons-rocket-launch'
                        : 'i-heroicons-gift'
                    "
                    class="text-2xl mr-3"
                    :class="
                      form.plan === 'Premium'
                        ? 'text-amber-300'
                        : form.plan === 'Pro'
                        ? 'text-blue-400'
                        : 'text-gray-400'
                    "
                  />
                  <div>
                    <div
                      class="text-base font-medium"
                      :class="
                        form.plan === 'Premium'
                          ? 'text-amber-300'
                          : form.plan === 'Pro'
                          ? 'text-blue-400'
                          : 'text-gray-400'
                      "
                    >
                      {{ form.plan }}
                    </div>
                    <div class="text-sm text-gray-500">
                      <span v-if="form.plan === 'Gratuito'"
                        >1 usuario organizador</span
                      >
                      <span v-else-if="form.plan === 'Pro'"
                        >7 usuarios organizadores</span
                      >
                      <span v-else-if="form.plan === 'Premium'"
                        >20 usuarios organizadores</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between w-full py-2">
        <!-- Aumentado de py-1 a py-2 -->
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
import { ref, reactive, computed, watch } from "vue";

// Props
const props = defineProps<{
  tenant: {
    id: string;
    nombre: string;
    logo: string;
    subdominio: string;
    correo: string;
    fechaCreacion: string;
    plan: string;
    numVoluntarios: number;
    activo: boolean;
    colorPrimario: string;
  };
  open: boolean;
  saving?: boolean;
}>();

// Emits
const emit = defineEmits<{
  (e: "update:open", open: boolean): void;
  (
    e: "update",
    tenant: {
      id: string;
      nombre: string;
      logo: string;
      subdominio: string;
      correo: string;
      fechaCreacion: string;
      plan: string;
      numVoluntarios: number;
      activo: boolean;
      colorPrimario: string;
    }
  ): void;
}>();

// Estado del modal
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit("update:open", value),
});

// Estado del formulario
const form = reactive({
  ...props.tenant,
});

// Resetear el formulario cuando cambie el tenant
watch(
  () => props.tenant,
  (newTenant) => {
    Object.assign(form, newTenant);
  },
  { immediate: true }
);

// Estado para errores
const errors = reactive({
  nombre: "",
  subdominio: "",
  correo: "",
});

// Estado del color picker
const colorPickerOpen = ref(false);

// Opciones para el selector de planes
const planOptions = [
  { label: "Gratuito", value: "Gratuito" },
  { label: "Pro", value: "Pro" },
  { label: "Premium", value: "Premium" },
];

// Lista de colores predefinidos
const predefinedColors = [
  "#0D9488",
  "#0ea5e9",
  "#8b5cf6",
  "#ec4899",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#84cc16",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
  "#a855f7",
  "#d946ef",
  "#f43f5e",
  "#10b981",
];

// Comprobar si el formulario es válido
const isFormValid = computed(() => {
  return (
    form.nombre.trim() !== "" &&
    form.subdominio.trim() !== "" &&
    form.correo.trim() !== "" &&
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
    .replace(/[^a-z0-9-]/g, "") // Eliminar caracteres no permitidos
    .replace(/--+/g, "-"); // Reemplazar múltiples guiones por uno solo
}

// Validar un campo específico
function validateField(field: "nombre" | "subdominio" | "correo") {
  errors[field] = "";

  switch (field) {
    case "nombre":
      if (!form.nombre.trim()) {
        errors.nombre = "El nombre es obligatorio";
      } else if (form.nombre.length < 3) {
        errors.nombre = "El nombre debe tener al menos 3 caracteres";
      }
      break;

    case "subdominio":
      if (!form.subdominio.trim()) {
        errors.subdominio = "El subdominio es obligatorio";
      } else if (form.subdominio.length < 3) {
        errors.subdominio = "El subdominio debe tener al menos 3 caracteres";
      } else if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(form.subdominio)) {
        errors.subdominio =
          "El subdominio solo puede contener letras minúsculas, números y guiones internos";
      } else if (form.subdominio !== props.tenant.subdominio) {
        // Aquí se podría añadir verificación de disponibilidad del subdominio
      }
      break;

    case "correo":
      if (!form.correo.trim()) {
        errors.correo = "El correo es obligatorio";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
        errors.correo = "Introduce un correo electrónico válido";
      }
      break;
  }
}

// Validar todos los campos
function validateForm() {
  validateField("nombre");
  validateField("subdominio");
  validateField("correo");

  return !errors.nombre && !errors.subdominio && !errors.correo;
}

// Enviar el formulario
function submit() {
  if (!validateForm()) return;

  // Actualizar tenant
  emit("update", {
    ...props.tenant,
    nombre: form.nombre,
    subdominio: form.subdominio,
    correo: form.correo,
    plan: form.plan,
    activo: form.activo,
    colorPrimario: form.colorPrimario,
  });
}

// Formatear fecha
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
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
