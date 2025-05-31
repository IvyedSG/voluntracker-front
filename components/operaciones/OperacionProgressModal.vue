<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionProgressModal.vue -->
<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="$emit('cancel')"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
    />

    <!-- Modal container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-gray-900 border border-gray-800 shadow-xl transition-all"
        @click.stop
      >
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-start mb-6">
            <div
              class="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mr-4 mt-1"
            >
              <UIcon
                name="i-heroicons-chart-bar"
                class="h-6 w-6 text-blue-400"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white mb-1">
                Actualizar Progreso
              </h3>
              <p class="text-sm text-gray-400">
                Actualiza el progreso y las horas trabajadas de la operación
              </p>
            </div>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark"
              @click="$emit('cancel')"
            />
          </div>

          <!-- Información de la operación -->
          <div v-if="operacion" class="mb-6 p-4 bg-gray-800/50 rounded-lg">
            <h4 class="font-medium text-white mb-2">
              {{ operacion.nombreActividad }}
            </h4>
            <div
              class="flex items-center justify-between text-sm text-gray-400"
            >
              <span>Progreso actual: {{ operacion.progreso }}%</span>
              <span
                >Horas trabajadas: {{ operacion.horasReales || 0 }}/{{
                  operacion.horasEstimadas
                }}h</span
              >
            </div>
          </div>

          <!-- Formulario -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Progreso -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-3">
                Progreso: {{ form.progreso }}%
              </label>

              <!-- Slider personalizado -->
              <div class="relative">
                <input
                  v-model="form.progreso"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  @input="validateProgress"
                />
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              <!-- Barra de progreso visual -->
              <div class="mt-3 w-full bg-gray-700 rounded-full h-3">
                <div
                  class="h-3 rounded-full transition-all duration-300"
                  :class="{
                    'bg-red-600': form.progreso < 25,
                    'bg-yellow-600': form.progreso >= 25 && form.progreso < 50,
                    'bg-blue-600': form.progreso >= 50 && form.progreso < 75,
                    'bg-green-600': form.progreso >= 75,
                  }"
                  :style="{ width: `${form.progreso}%` }"
                ></div>
              </div>

              <p v-if="errors.progreso" class="text-red-400 text-xs mt-1">
                {{ errors.progreso }}
              </p>
            </div>

            <!-- Horas trabajadas -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Horas trabajadas *
              </label>
              <UInput
                v-model="form.horasReales"
                type="number"
                step="0.5"
                min="0"
                placeholder="Ej: 8.5"
                size="md"
                :color="errors.horasReales ? 'red' : 'white'"
                @blur="validateHours"
              />
              <p v-if="errors.horasReales" class="text-red-400 text-xs mt-1">
                {{ errors.horasReales }}
              </p>
              <p class="text-gray-500 text-xs mt-1">
                Horas estimadas: {{ operacion?.horasEstimadas || 0 }}h
              </p>
            </div>

            <!-- Comentario -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Comentario sobre el progreso
              </label>
              <UTextarea
                v-model="form.comentario"
                placeholder="Describe el trabajo realizado, obstáculos encontrados, próximos pasos..."
                rows="3"
                maxlength="500"
                resize
              />
              <p class="text-gray-500 text-xs mt-1">
                {{ form.comentario?.length || 0 }}/500 caracteres
              </p>
            </div>

            <!-- Estado automático -->
            <div
              v-if="nuevoEstado"
              class="p-3 bg-blue-900/20 rounded-lg border border-blue-800"
            >
              <div class="flex items-center">
                <UIcon
                  name="i-heroicons-information-circle"
                  class="h-5 w-5 text-blue-400 mr-2"
                />
                <span class="text-sm text-blue-300">
                  El estado cambiará automáticamente a:
                  <strong>{{ getEstadoLabel(nuevoEstado) }}</strong>
                </span>
              </div>
            </div>

            <!-- Resumen de cambios -->
            <div class="p-4 bg-gray-800/30 rounded-lg">
              <h5 class="text-sm font-medium text-gray-300 mb-2">
                Resumen de cambios:
              </h5>
              <div class="space-y-1 text-xs text-gray-400">
                <div class="flex justify-between">
                  <span>Progreso:</span>
                  <span
                    >{{ operacion?.progreso || 0 }}% →
                    {{ form.progreso }}%</span
                  >
                </div>
                <div class="flex justify-between">
                  <span>Horas:</span>
                  <span
                    >{{ operacion?.horasReales || 0 }}h →
                    {{ form.horasReales || 0 }}h</span
                  >
                </div>
                <div v-if="nuevoEstado" class="flex justify-between">
                  <span>Estado:</span>
                  <span
                    >{{ getEstadoLabel(operacion?.estado) }} →
                    {{ getEstadoLabel(nuevoEstado) }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Botones -->
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
                color="blue"
                :loading="isSubmitting"
                :disabled="isSubmitting || !isFormValid"
              >
                <UIcon name="i-heroicons-check-circle" class="mr-1" />
                Actualizar progreso
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  operacion: {
    type: Object,
    default: null,
  },
});

// Emits
const emit = defineEmits(["update:modelValue", "submit", "cancel"]);

// Estado del formulario
const form = ref({
  progreso: 0,
  horasReales: 0,
  comentario: "",
});

// Estado de errores
const errors = ref({
  progreso: "",
  horasReales: "",
});

// Estado de envío
const isSubmitting = ref(false);

// Computed
const isFormValid = computed(() => {
  return (
    form.value.horasReales > 0 &&
    Object.values(errors.value).every((error) => error === "")
  );
});

const nuevoEstado = computed(() => {
  if (!props.operacion) return null;

  const progreso = form.value.progreso;
  const estadoActual = props.operacion.estado;

  if (progreso === 100 && estadoActual !== "completada") {
    return "completada";
  } else if (progreso > 0 && progreso < 100 && estadoActual === "pendiente") {
    return "en_progreso";
  }

  return null;
});

// Watchers
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && props.operacion) {
      resetForm();
    }
  }
);

watch(
  () => props.operacion,
  (newOperacion) => {
    if (newOperacion && props.modelValue) {
      resetForm();
    }
  }
);

// Métodos
const resetForm = () => {
  nextTick(() => {
    form.value = {
      progreso: props.operacion?.progreso || 0,
      horasReales: props.operacion?.horasReales || 0,
      comentario: "",
    };
    errors.value = {
      progreso: "",
      horasReales: "",
    };
  });
};

const validateProgress = () => {
  const progreso = parseInt(form.value.progreso);

  if (props.operacion && progreso < props.operacion.progreso) {
    errors.value.progreso = "El progreso no puede ser menor al actual";
  } else {
    errors.value.progreso = "";
  }
};

const validateHours = () => {
  const horas = parseFloat(form.value.horasReales);

  if (isNaN(horas) || horas < 0) {
    errors.value.horasReales = "Debe ser un número válido mayor o igual a 0";
  } else if (props.operacion && horas < (props.operacion.horasReales || 0)) {
    errors.value.horasReales =
      "Las horas no pueden ser menores a las ya registradas";
  } else {
    errors.value.horasReales = "";
  }
};

const handleSubmit = async () => {
  validateProgress();
  validateHours();

  if (!isFormValid.value) return;

  isSubmitting.value = true;

  try {
    const data = {
      progreso: parseInt(form.value.progreso),
      horasReales: parseFloat(form.value.horasReales),
      comentario: form.value.comentario?.trim(),
    };

    if (nuevoEstado.value) {
      data.estado = nuevoEstado.value;
    }

    emit("submit", data);
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const getEstadoLabel = (estado) => {
  const labels = {
    pendiente: "Pendiente",
    en_progreso: "En Progreso",
    completada: "Completada",
    cancelada: "Cancelada",
  };
  return labels[estado] || estado;
};
</script>

<style scoped>
/* Estilo personalizado para el slider */
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #1f2937;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-webkit-slider-thumb:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #1f2937;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.slider:focus {
  outline: none;
}
</style>
