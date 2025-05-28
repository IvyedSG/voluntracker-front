<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\coordinadores\CoordinadorAddModal.vue -->
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('cancel')">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
    />

    <!-- Modal container - MÁS COMPACTO -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-gray-900 border border-gray-800 shadow-xl transition-all"
        @click.stop
      >
        <div class="p-6">
          <!-- Header compacto -->
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3"
            >
              <UIcon
                name="i-heroicons-user-plus"
                class="h-5 w-5 text-green-400"
              />
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-semibold text-white">
                Añadir coordinador
              </h2>
              <p class="text-gray-400 text-xs">
                Complete la información básica
              </p>
            </div>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark"
              size="sm"
              @click="$emit('cancel')"
            />
          </div>

          <!-- Formulario compacto -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Información personal -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nombre -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Nombre completo *
                </label>
                <UInput
                  v-model="form.nombre"
                  placeholder="Ej: Juan Pérez"
                  size="md"
                  icon="i-heroicons-user"
                  :color="errors.nombre ? 'red' : 'white'"
                  @blur="validateField('nombre')"
                  @input="clearError('nombre')"
                />
                <p v-if="errors.nombre" class="text-red-400 text-xs mt-1">
                  {{ errors.nombre }}
                </p>
              </div>

              <!-- Correo -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Correo electrónico *
                </label>
                <UInput
                  v-model="form.correo"
                  type="email"
                  placeholder="ejemplo@org.com"
                  size="md"
                  icon="i-heroicons-envelope"
                  :color="errors.correo ? 'red' : 'white'"
                  @blur="validateField('correo')"
                  @input="clearError('correo')"
                />
                <p v-if="errors.correo" class="text-red-400 text-xs mt-1">
                  {{ errors.correo }}
                </p>
              </div>
            </div>

            <!-- Configuración -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Rol -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Rol *
                </label>
                <USelect
                  v-model="form.rol"
                  :options="rolOptions"
                  placeholder="Seleccionar rol"
                  size="md"
                  :color="errors.rol ? 'red' : 'white'"
                  @change="validateField('rol')"
                />
                <p v-if="errors.rol" class="text-red-400 text-xs mt-1">
                  {{ errors.rol }}
                </p>
              </div>

              <!-- Nivel -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">
                  Nivel de acceso *
                </label>
                <USelect
                  v-model="form.nivelAcceso"
                  :options="nivelOptions"
                  placeholder="Seleccionar nivel"
                  size="md"
                  @change="validateField('nivelAcceso')"
                />
              </div>
            </div>

            <!-- Áreas (opcional) -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                Áreas de trabajo (opcional)
              </label>
              <USelectMenu
                v-model="form.areasAsignadas"
                :options="areasSimples"
                multiple
                placeholder="Seleccionar áreas"
                size="md"
              />
              <div
                v-if="form.areasAsignadas.length"
                class="flex flex-wrap gap-1 mt-2"
              >
                <UBadge
                  v-for="area in form.areasAsignadas"
                  :key="area"
                  color="blue"
                  variant="subtle"
                  size="sm"
                  class="flex items-center gap-1"
                >
                  <UIcon name="i-heroicons-square-3-stack-3d" class="h-3 w-3" />
                  {{ area }}
                </UBadge>
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex justify-end gap-4 pt-4 border-t border-gray-800">
              <UButton
                type="button"
                color="gray"
                variant="ghost"
                size="md"
                :disabled="isSubmitting"
                @click="$emit('cancel')"
              >
                Cancelar
              </UButton>
              <UButton
                type="submit"
                color="green"
                size="md"
                :loading="isSubmitting"
                :disabled="isSubmitting || !isFormValid"
              >
                <UIcon name="i-heroicons-user-plus" class="mr-2" />
                {{
                  isSubmitting ? "Creando coordinador..." : "Crear coordinador"
                }}
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useCoordinadoresStore } from "~/stores/coordinadoresStore";

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["update:modelValue", "submit", "cancel"]);

// ✅ USAR EL STORE PARA OBTENER DATOS REALES
const store = useCoordinadoresStore();

// ✅ OPCIONES DE ROL DESDE EL COMPOSABLE (para consistencia)
const rolOptions = [
  { label: "Administrador", value: "administrador" },
  { label: "Líder", value: "lider" },
  { label: "Coordinador", value: "coordinador" },
];

const nivelOptions = [
  { label: "Básico", value: "basico" },
  { label: "Avanzado", value: "avanzado" },
];

// ✅ CARGAR ÁREAS DESDE EL STORE
const areasDisponibles = ref([]);

// Cargar áreas al montar el componente
onMounted(async () => {
  await store.fetchAreas();
  areasDisponibles.value = store.areas.map((area) => area.nombre);
});

// (Eliminado areasOptionsFormatted porque no se usa)

// Estado del formulario
const form = ref({
  nombre: "",
  correo: "",
  rol: "",
  nivelAcceso: "basico",
  areasAsignadas: [],
  estado: "pendiente",
});

// Estado de errores del formulario
const errors = ref({
  nombre: "",
  correo: "",
  rol: "",
  nivelAcceso: "",
});

// Estado de envío del formulario
const isSubmitting = ref(false);

// Validación de email mejorada
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Computed para verificar si el formulario es válido
const isFormValid = computed(() => {
  return (
    form.value.nombre.trim() !== "" &&
    form.value.correo.trim() !== "" &&
    form.value.rol !== "" &&
    form.value.nivelAcceso !== "" &&
    Object.values(errors.value).every((error) => error === "") &&
    isValidEmail(form.value.correo)
  );
});

// (Eliminadas las propiedades y funciones no utilizadas para evitar errores de variables no usadas)

// Limpiar error específico
const clearError = (field) => {
  if (errors.value[field]) {
    errors.value[field] = "";
  }
};

// Validar campos individuales
const validateField = (field) => {
  errors.value[field] = "";

  if (field === "nombre") {
    if (!form.value.nombre.trim()) {
      errors.value.nombre = "El nombre es obligatorio";
    } else if (form.value.nombre.length < 3) {
      errors.value.nombre = "El nombre debe tener al menos 3 caracteres";
    }
  }

  if (field === "correo") {
    if (!form.value.correo.trim()) {
      errors.value.correo = "El correo es obligatorio";
    } else if (!isValidEmail(form.value.correo)) {
      errors.value.correo = "El formato del correo no es válido";
    }
  }

  if (field === "rol" && !form.value.rol) {
    errors.value.rol = "Debes seleccionar un rol";
  }

  if (field === "nivelAcceso" && !form.value.nivelAcceso) {
    errors.value.nivelAcceso = "Debes seleccionar un nivel de acceso";
  }
};

// Validar todo el formulario
const validateForm = () => {
  validateField("nombre");
  validateField("correo");
  validateField("rol");
  validateField("nivelAcceso");

  return Object.values(errors.value).every((error) => error === "");
};

// ✅ CORREGIR: Manejar el envío del formulario usando el store
const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    // ✅ CREAR OBJETO CON FORMATO CORRECTO PARA EL STORE
    const formData = {
      nombre: form.value.nombre.trim(),
      correo: form.value.correo.trim().toLowerCase(),
      rol: form.value.rol,
      nivelAcceso: form.value.nivelAcceso,
      // ✅ FORMATO CORRECTO PARA ÁREAS (como en los mocks)
      areasAsignadas: form.value.areasAsignadas.map((nombreArea) => {
        const area = store.areas.find((a) => a.nombre === nombreArea);
        return area || { id: crypto.randomUUID(), nombre: nombreArea };
      }),
      estado: "pendiente",
      ultimoAcceso: null,
      verificacion2FA: false,
      dispositivosConectados: 0,
      voluntariosAsignados: 0,
    };

    console.log("Enviando datos del formulario:", formData);

    // ✅ EMITIR AL COMPONENTE PADRE QUE MANEJA EL STORE
    emit("submit", formData);
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
  } finally {
    isSubmitting.value = false;
  }
};

// Resetear el formulario
const resetForm = () => {
  form.value = {
    nombre: "",
    correo: "",
    rol: "",
    nivelAcceso: "basico",
    areasAsignadas: [],
    estado: "pendiente",
  };
  errors.value = {
    nombre: "",
    correo: "",
    rol: "",
    nivelAcceso: "",
  };
};

// Bloquear scroll del body cuando el modal está abierto
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      resetForm();
      // ✅ RECARGAR ÁREAS CUANDO SE ABRE EL MODAL
      if (areasDisponibles.value.length === 0) {
        store.fetchAreas().then(() => {
          areasDisponibles.value = store.areas.map((area) => area.nombre);
        });
      }
    } else {
      document.body.style.overflow = "";
    }
  }
);

// Manejar tecla Escape
const handleKeydown = (event) => {
  if (event.key === "Escape") {
    emit("cancel");
  }
};

// Añadir/remover event listener para Escape
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
    } else {
      document.removeEventListener("keydown", handleKeydown);
    }
  }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
