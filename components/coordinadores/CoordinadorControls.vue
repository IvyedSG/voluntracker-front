<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\coordinadores\CoordinadorControls.vue -->
<template>
  <div
    class="mb-6 flex flex-col md:flex-row justify-between gap-5 items-start md:items-center"
  >
    <!-- Búsqueda y visualización -->
    <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3">
      <UInput
        v-model="searchModel"
        icon="i-heroicons-magnifying-glass"
        placeholder="Buscar coordinador..."
        class="w-full md:w-80 shadow-md backdrop-blur-lg"
        size="lg"
        color="primary"
      />
      <UButtonGroup
        class="hidden sm:flex bg-gray-800/40 backdrop-blur-md p-1 rounded-xl shadow-md"
      >
        <UButton
          :color="viewModel === 'table' ? 'success' : 'neutral'"
          :variant="viewModel === 'table' ? 'solid' : 'ghost'"
          :icon="
            viewModel === 'table'
              ? 'i-heroicons-table-cells-solid'
              : 'i-heroicons-table-cells'
          "
          size="lg"
          class="px-4"
          @click="viewModel = 'table'"
        />
        <UButton
          :color="viewModel === 'grid' ? 'success' : 'neutral'"
          :variant="viewModel === 'grid' ? 'solid' : 'ghost'"
          :icon="
            viewModel === 'grid'
              ? 'i-heroicons-squares-2x2-solid'
              : 'i-heroicons-squares-2x2'
          "
          size="lg"
          class="px-4"
          @click="viewModel = 'grid'"
        />
      </UButtonGroup>
    </div>

    <!-- Filtros y acciones -->
    <div class="flex flex-wrap gap-4 w-full sm:w-auto">
      <!-- Selector de estado - MÁS ANCHO -->
      <USelect
        v-model="estadoModel"
        :items="estadoItems"
        placeholder="Estado"
        icon="i-heroicons-flag"
        size="lg"
        class="w-full sm:w-56 shadow-md backdrop-blur-lg"
        color="primary"
      >
        <template #item="{ item }">
          <div class="flex items-center gap-2">
            <UIcon :name="item.icon" :class="item.iconClass" />
            <span>{{ item.label }}</span>
          </div>
        </template>
      </USelect>

      <!-- Selector de rol - MÁS ANCHO -->
      <USelect
        v-model="rolModel"
        :items="rolItems"
        placeholder="Rol"
        icon="i-heroicons-briefcase"
        size="lg"
        class="w-full sm:w-52 shadow-md backdrop-blur-lg"
        color="primary"
      />

      <UButton
        v-if="hasActiveFilters"
        color="success"
        variant="soft"
        icon="i-heroicons-funnel"
        size="lg"
        class="shadow-md backdrop-blur-lg"
        @click="resetAllFilters"
      >
        Limpiar
      </UButton>
      <UButton
        color="success"
        variant="solid"
        icon="i-heroicons-user-plus"
        size="lg"
        class="shadow-md backdrop-blur-lg"
        @click="emit('add')"
      >
        Añadir
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Interfaces para tipado
interface ControlsState {
  search: string;
  estado: string | null;
  rol: string | null;
  viewMode: "table" | "grid";
}

interface SelectOption {
  label: string;
  value: string;
  icon?: string;
  iconClass?: string;
}

// Props
const props = defineProps<{
  modelValue: ControlsState;
  estadoOptions: SelectOption[];
  rolOptions: SelectOption[];
}>();

// Emits
const emit = defineEmits<{
  "update:modelValue": [value: ControlsState];
  add: [];
  reset: [];
}>();

// Función para actualizar el modelValue
function updateModelValue(newValues: Partial<ControlsState>) {
  emit("update:modelValue", {
    ...props.modelValue,
    ...newValues,
  });
}

// Modelos computados bidireccionales
const searchModel = computed({
  get: () => props.modelValue.search || "",
  set: (value: string) => updateModelValue({ search: value }),
});

const estadoModel = computed({
  get: () => props.modelValue.estado || "all",
  set: (value: string) => {
    const estado = value === "all" ? null : value;
    updateModelValue({ estado });
  },
});

const rolModel = computed({
  get: () => props.modelValue.rol || "all",
  set: (value: string) => {
    const rol = value === "all" ? null : value;
    updateModelValue({ rol });
  },
});

const viewModel = computed({
  get: () => props.modelValue.viewMode || "table",
  set: (value: "table" | "grid") => updateModelValue({ viewMode: value }),
});

// Verificar si hay filtros activos
const hasActiveFilters = computed(() => {
  return !!(
    props.modelValue.search ||
    props.modelValue.estado !== null ||
    props.modelValue.rol !== null
  );
});

// Items para el selector de estado
const estadoItems = computed(() => {
  const defaultItem = {
    label: "Todos los estados",
    value: "all",
    icon: "i-heroicons-adjustments-horizontal",
    iconClass: "text-gray-400",
  };

  const mappedOptions = props.estadoOptions.map((option) => {
    let icon = "i-heroicons-clock";
    let iconClass = "text-blue-500";

    switch (option.value) {
      case "activo":
        icon = "i-heroicons-check-circle";
        iconClass = "text-green-500";
        break;
      case "inactivo":
        icon = "i-heroicons-pause-circle";
        iconClass = "text-orange-500"; // Cambio de 'yellow' a 'orange'
        break;
      case "pendiente":
        icon = "i-heroicons-clock";
        iconClass = "text-blue-500";
        break;
      default:
        icon = "i-heroicons-question-mark-circle";
        iconClass = "text-gray-500";
    }

    return {
      label: option.label,
      value: option.value,
      icon,
      iconClass,
    };
  });

  return [defaultItem, ...mappedOptions];
});

// Items para el selector de rol
const rolItems = computed(() => {
  const defaultItem = {
    label: "Todos los roles",
    value: "all",
  };

  const mappedOptions = props.rolOptions.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  return [defaultItem, ...mappedOptions];
});

// Resetear todos los filtros
function resetAllFilters() {
  updateModelValue({
    search: "",
    estado: null,
    rol: null,
  });
  emit("reset");
}

// Exponer métodos para control desde el componente padre
defineExpose({
  resetFilters: resetAllFilters,
});
</script>
