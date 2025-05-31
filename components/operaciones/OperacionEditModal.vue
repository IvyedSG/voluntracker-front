<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionEditModal.vue -->
<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="handleCancel"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
    />

    <!-- Modal container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-gray-900 border border-gray-800 shadow-xl transition-all"
        @click.stop
      >
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3"
            >
              <UIcon name="i-heroicons-pencil" class="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 class="text-lg font-semibold text-white">Editar Operación</h2>
              <p class="text-gray-400 text-sm">
                Modifica la información de la operación
              </p>
            </div>
          </div>

          <!-- Formulario simple -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1"
                >Nombre *</label
              >
              <UInput v-model="form.nombreActividad" size="md" />
            </div>

            <!-- Descripción -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1"
                >Descripción *</label
              >
              <UTextarea v-model="form.descripcion" rows="3" />
            </div>

            <!-- Estado y Prioridad -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1"
                  >Estado</label
                >
                <USelect v-model="form.estado" :options="estadoOptions" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1"
                  >Prioridad</label
                >
                <USelect v-model="form.prioridad" :options="prioridadOptions" />
              </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-end gap-3 pt-4 border-t border-gray-800">
              <UButton color="gray" variant="ghost" @click="handleCancel">
                Cancelar
              </UButton>
              <UButton type="submit" color="blue" :loading="isSubmitting">
                Guardar Cambios
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  operacion: { type: Object, default: null },
});

// CORREGIDO: Agregar emit para update:modelValue
const emit = defineEmits(["submit", "cancel", "update:modelValue"]);

const form = ref({
  nombreActividad: "",
  descripcion: "",
  estado: "pendiente",
  prioridad: "media",
});

const isSubmitting = ref(false);

const estadoOptions = [
  { label: "Pendiente", value: "pendiente" },
  { label: "En Progreso", value: "en_progreso" },
  { label: "Completada", value: "completada" },
  { label: "Cancelada", value: "cancelada" },
];

const prioridadOptions = [
  { label: "Baja", value: "baja" },
  { label: "Media", value: "media" },
  { label: "Alta", value: "alta" },
  { label: "Crítica", value: "critica" },
];

const handleSubmit = async () => {
  isSubmitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  emit("submit", form.value);
  emit("update:modelValue", false); // CORREGIDO: Cerrar modal
  isSubmitting.value = false;
};

// CORREGIDO: Función para cancelar
const handleCancel = () => {
  emit("cancel");
  emit("update:modelValue", false);
};

watch(
  () => props.operacion,
  (operacion) => {
    if (operacion) {
      form.value = {
        nombreActividad: operacion.nombreActividad || "",
        descripcion: operacion.descripcion || "",
        estado: operacion.estado || "pendiente",
        prioridad: operacion.prioridad || "media",
      };
    }
  },
  { immediate: true }
);

// CORREGIDO: Watch para manejar el cierre del modal con ESC
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>
