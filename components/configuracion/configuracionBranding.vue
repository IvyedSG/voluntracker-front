<template>
  <div class="space-y-8">
    <div class="bg-gray-800/80 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <!-- Decoración de fondo con tonos verdes -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative z-10">
        <!-- Header con gradiente verde -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center">
              <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
                <UIcon name="i-heroicons-paint-brush" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Personalización de Marca</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Personaliza los colores y estilos de tu organización</p>
          </div>
        </div>

        <form @submit.prevent="guardarCambios" class="space-y-8">
          <!-- Paleta de colores -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="flex items-center text-sm font-medium mb-5">
              <UIcon name="i-heroicons-swatch" class="mr-2 h-4 w-4 text-green-400" />
              <span class="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-semibold">Paleta de colores</span>
            </label>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Color primario -->
              <div class="group">
                <label class="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <div class="w-4 h-4 rounded-full mr-2" :style="{ backgroundColor: formulario.colorPrimario }"></div>
                  Color primario
                </label>
                <div class="flex items-center space-x-3">
                  <div 
                    class="w-14 h-14 rounded-lg border-2 border-gray-600 cursor-pointer shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-300"
                    :style="{ backgroundColor: formulario.colorPrimario }"
                    @click="abrirSelectorColor('colorPrimario')"
                  ></div>
                  <UInput
                    v-model="formulario.colorPrimario"
                    placeholder="#10B981"
                    class="flex-1 bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                    @input="$emit('cambios')"
                  />
                </div>
                <p class="text-xs text-green-300/70 mt-2 flex items-center">
                  <UIcon name="i-heroicons-information-circle" class="h-3.5 w-3.5 mr-1" />
                  Usado para botones principales y elementos destacados
                </p>
              </div>

              <!-- Color secundario -->
              <div class="group">
                <label class="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <div class="w-4 h-4 rounded-full mr-2" :style="{ backgroundColor: formulario.colorSecundario }"></div>
                  Color secundario
                </label>
                <div class="flex items-center space-x-3">
                  <div 
                    class="w-14 h-14 rounded-lg border-2 border-gray-600 cursor-pointer shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-300"
                    :style="{ backgroundColor: formulario.colorSecundario }"
                    @click="abrirSelectorColor('colorSecundario')"
                  ></div>
                  <UInput
                    v-model="formulario.colorSecundario"
                    placeholder="#059669"
                    class="flex-1 bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                    @input="$emit('cambios')"
                  />
                </div>
                <p class="text-xs text-green-300/70 mt-2 flex items-center">
                  <UIcon name="i-heroicons-information-circle" class="h-3.5 w-3.5 mr-1" />
                  Usado para elementos de apoyo y navegación
                </p>
              </div>

              <!-- Color de acento -->
              <div class="group">
                <label class="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <div class="w-4 h-4 rounded-full mr-2" :style="{ backgroundColor: formulario.colorAccento }"></div>
                  Color de acento
                </label>
                <div class="flex items-center space-x-3">
                  <div 
                    class="w-14 h-14 rounded-lg border-2 border-gray-600 cursor-pointer shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-300"
                    :style="{ backgroundColor: formulario.colorAccento }"
                    @click="abrirSelectorColor('colorAccento')"
                  ></div>
                  <UInput
                    v-model="formulario.colorAccento"
                    placeholder="#34D399"
                    class="flex-1 bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                    @input="$emit('cambios')"
                  />
                </div>
                <p class="text-xs text-green-300/70 mt-2 flex items-center">
                  <UIcon name="i-heroicons-information-circle" class="h-3.5 w-3.5 mr-1" />
                  Usado para notificaciones de éxito y elementos positivos
                </p>
              </div>

              <!-- Color de fondo -->
              <div class="group">
                <label class="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <div class="w-4 h-4 rounded-full mr-2" :style="{ backgroundColor: formulario.colorFondo }"></div>
                  Color de fondo
                </label>
                <div class="flex items-center space-x-3">
                  <div 
                    class="w-14 h-14 rounded-lg border-2 border-gray-600 cursor-pointer shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-300"
                    :style="{ backgroundColor: formulario.colorFondo }"
                    @click="abrirSelectorColor('colorFondo')"
                  ></div>
                  <UInput
                    v-model="formulario.colorFondo"
                    placeholder="#1F2937"
                    class="flex-1 bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                    @input="$emit('cambios')"
                  />
                </div>
                <p class="text-xs text-green-300/70 mt-2 flex items-center">
                  <UIcon name="i-heroicons-information-circle" class="h-3.5 w-3.5 mr-1" />
                  Color de fondo principal de la aplicación
                </p>
              </div>
            </div>
          </div>

          <!-- Tema -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="flex items-center text-sm font-medium mb-4">
              <UIcon name="i-heroicons-computer-desktop" class="mr-2 h-4 w-4 text-green-400" />
              <span class="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-semibold">Tema de la aplicación</span>
            </label>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label 
                v-for="tema in opcionesTema" 
                :key="tema.value"
                class="relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors"
                :class="formulario.tema === tema.value 
                  ? 'border-green-500 bg-green-900/20' 
                  : 'border-gray-600 hover:border-gray-500'"
              >
                <input
                  type="radio"
                  :value="tema.value"
                  v-model="formulario.tema"
                  class="sr-only"
                  @change="$emit('cambios')"
                />
                <div class="flex items-center space-x-3">
                  <UIcon :name="tema.icono" class="h-5 w-5" :class="tema.color" />
                  <div>
                    <div class="text-sm font-medium text-white">{{ tema.label }}</div>
                    <div class="text-xs text-gray-400">{{ tema.descripcion }}</div>
                  </div>
                </div>
                <UIcon 
                  v-if="formulario.tema === tema.value"
                  name="i-heroicons-check-circle" 
                  class="h-5 w-5 text-green-400 absolute top-2 right-2" 
                />
              </label>
            </div>
          </div>

          <!-- Tipografía -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="flex items-center text-sm font-medium mb-4">
              <UIcon name="i-heroicons-document-text" class="mr-2 h-4 w-4 text-green-400" />
              <span class="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-semibold">Tipografía</span>
            </label>
            
            <USelect
              v-model="formulario.tipografia"
              :options="opcionesTipografia"
              placeholder="Selecciona una fuente"
              class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400"
              @change="$emit('cambios')"
            />
            <p class="text-xs text-green-300/70 mt-2 flex items-center">
              <UIcon name="i-heroicons-information-circle" class="h-3.5 w-3.5 mr-1" />
              Fuente principal para toda la aplicación
            </p>
          </div>

          <!-- Logo personalizado -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="flex items-center text-sm font-medium text-gray-200 mb-4">
              <UIcon name="i-heroicons-photo" class="mr-2 h-4 w-4 text-green-400" />
              Logo personalizado
            </label>
            
            <div class="flex items-center space-x-8">
              <div class="w-36 h-24 bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 rounded-lg flex items-center justify-center overflow-hidden group shadow-md hover:shadow-green-500/20 transition-all transform hover:scale-105 duration-300">
                <img v-if="formulario.logoPersonalizado" :src="formulario.logoPersonalizado" alt="Logo personalizado" class="w-full h-full object-contain" />
                <div v-else class="text-center">
                  <UIcon name="i-heroicons-photo" class="h-8 w-8 text-green-300/50 group-hover:text-green-300 transition-colors" />
                  <p class="text-xs text-gray-500 mt-1">Sin logo</p>
                </div>
              </div>
              <div>
                <UButton 
                  size="sm"
                  class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-md hover:shadow-xl transition-all"
                  @click="seleccionarLogo"
                >
                  <UIcon name="i-heroicons-arrow-up-tray" class="h-4 w-4 mr-1" />
                  Subir logo
                </UButton>
                <p class="text-xs text-green-300/70 mt-3 flex items-center">
                  <UIcon name="i-heroicons-information-circle" class="h-3.5 w-3.5 mr-1" />
                  PNG con fondo transparente recomendado
                </p>
              </div>
            </div>
          </div>

          <!-- Vista previa -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50">
            <label class="flex items-center text-sm font-medium mb-5">
              <UIcon name="i-heroicons-eye" class="mr-2 h-4 w-4 text-green-400" />
              <span class="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-semibold">Vista previa</span>
            </label>
            
            <div class="bg-gray-800/70 border border-gray-700/50 rounded-lg p-6 shadow-inner">
              <div class="space-y-6">
                <!-- Ejemplo de botón primario -->
                <div>
                  <span class="text-sm text-gray-400 mb-3 block">Botón primario:</span>
                  <button 
                    class="px-4 py-2 rounded-lg text-white font-medium transition-all transform hover:scale-105 duration-200 shadow-md"
                    :style="{ backgroundColor: formulario.colorPrimario }"
                  >
                    Ejemplo de botón
                  </button>
                </div>
                
                <!-- Ejemplo de enlace secundario -->
                <div>
                  <span class="text-sm text-gray-400 mb-3 block">Enlace secundario:</span>
                  <a href="#" class="font-medium transition-colors hover:underline" :style="{ color: formulario.colorSecundario }">
                    Enlace de ejemplo
                  </a>
                </div>
                
                <!-- Ejemplo de estado de éxito -->
                <div>
                  <span class="text-sm text-gray-400 mb-3 block">Estado de éxito:</span>
                  <div class="flex items-center space-x-2 bg-opacity-10 py-2 px-3 rounded-lg" :style="{ backgroundColor: formulario.colorAccento + '20' }">
                    <div 
                      class="w-2 h-2 rounded-full"
                      :style="{ backgroundColor: formulario.colorAccento }"
                    ></div>
                    <span :style="{ color: formulario.colorAccento }">Operación exitosa</span>
                  </div>
                </div>

                <!-- Ejemplo de fondo -->
                <div>
                  <span class="text-sm text-gray-400 mb-3 block">Fondo de aplicación:</span>
                  <div class="h-12 w-full rounded-lg border border-gray-600" :style="{ backgroundColor: formulario.colorFondo }">
                    <div class="h-full flex items-center justify-center">
                      <span class="text-xs text-white opacity-70">Vista del fondo principal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botones de acción con gradientes verdes -->
          <div class="flex items-center justify-end space-x-4 pt-7 mt-2 border-t border-gray-700/40 relative">
            <div class="absolute left-0 bottom-0 w-1/3 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
            
            <UButton 
              type="button" 
              variant="ghost"
              class="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all border border-gray-700/50 h-11"
              @click="resetearFormulario"
              :disabled="cargando"
            >
              <UIcon name="i-heroicons-arrow-path" class="h-4 w-4 mr-1" />
              Restablecer
            </UButton>
            <UButton 
              type="submit"
              class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-md hover:shadow-xl transition-all h-11"
              :loading="cargando"
            >
              <UIcon name="i-heroicons-check-circle" class="h-4 w-4 mr-1" v-if="!cargando" />
              Aplicar cambios
            </UButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { ConfiguracionBranding } from '~/types/configuraciones';

const props = defineProps<{
  configuracion?: ConfiguracionBranding | null;
  cargando: boolean;
}>();

const emit = defineEmits<{
  actualizar: [branding: Partial<ConfiguracionBranding>];
  cambios: [];
}>();

// Estado del formulario (cambiando a colores verdes para coherencia)
const formulario = ref<Partial<ConfiguracionBranding>>({
  colorPrimario: '#10B981',
  colorSecundario: '#059669',
  colorAccento: '#34D399',
  colorFondo: '#1F2937',
  tema: 'oscuro',
  tipografia: 'Inter',
  logoPersonalizado: undefined,
  faviconPersonalizado: undefined
});

// Opciones
const opcionesTema = [
  {
    value: 'claro',
    label: 'Claro',
    descripcion: 'Fondo blanco',
    icono: 'i-heroicons-sun',
    color: 'text-yellow-400'
  },
  {
    value: 'oscuro',
    label: 'Oscuro',
    descripcion: 'Fondo negro',
    icono: 'i-heroicons-moon',
    color: 'text-blue-400'
  },
  {
    value: 'auto',
    label: 'Automático',
    descripcion: 'Según el sistema',
    icono: 'i-heroicons-computer-desktop',
    color: 'text-gray-400'
  }
];

const opcionesTipografia = [
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Open Sans', value: 'Open Sans' },
  { label: 'Lato', value: 'Lato' },
  { label: 'Montserrat', value: 'Montserrat' },
  { label: 'Poppins', value: 'Poppins' }
];

// Watchers
watch(() => props.configuracion, (nueva) => {
  if (nueva) {
    formulario.value = { ...nueva };
  }
}, { immediate: true });

// Métodos
const guardarCambios = async () => {
  emit('actualizar', formulario.value);
};

const resetearFormulario = () => {
  if (props.configuracion) {
    formulario.value = { ...props.configuracion };
  }
};

const abrirSelectorColor = (campo: keyof ConfiguracionBranding) => {
  const input = document.createElement('input');
  input.type = 'color';
  input.value = formulario.value[campo] as string || '#000000';
  input.onchange = (e) => {
    formulario.value[campo] = (e.target as HTMLInputElement).value as never;
    emit('cambios');
  };
  input.click();
};

const seleccionarLogo = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      // Validar tamaño (2MB máximo)
      if (file.size > 2 * 1024 * 1024) {
        console.error('El archivo es demasiado grande. Máximo 2MB.');
        return;
      }
      
      formulario.value.logoPersonalizado = URL.createObjectURL(file);
      emit('cambios');
    }
  };
  input.click();
};

onMounted(() => {
  if (props.configuracion) {
    formulario.value = { ...props.configuracion };
  }
});
</script>

<style scoped>
/* Fondos y colores dinámicos */
.bg-gray-750\/50 {
  background-color: rgba(31, 41, 55, 0.5);
}

/* Efectos de animación */
@keyframes pulse-glow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.1); }
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

/* Mejora de elementos de UI */
:deep(.u-input) {
  border-radius: 0.5rem;
  background-color: rgba(55, 65, 81, 0.7);
  backdrop-filter: blur(4px);
  border-color: rgba(75, 85, 99, 0.7);
  color: #E5E7EB;
  transition: all 0.3s ease;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

:deep(.u-input:focus) {
  border-color: #10B981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
  background-color: rgba(55, 65, 81, 0.9);
}

:deep(.u-textarea) {
  border-radius: 0.5rem;
  background-color: rgba(55, 65, 81, 0.7);
  backdrop-filter: blur(4px);
  border-color: rgba(75, 85, 99, 0.7);
  color: #E5E7EB;
  transition: all 0.3s ease;
  padding: 1rem;
  line-height: 1.5;
}

:deep(.u-textarea:focus) {
  border-color: #10B981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
  background-color: rgba(55, 65, 81, 0.9);
}

/* Personalización del select */
:deep(.u-select) {
  height: 3rem;
  border-radius: 0.5rem;
}

:deep(.u-select__input) {
  background-color: rgba(55, 65, 81, 0.7);
  border-color: rgba(75, 85, 99, 0.7);
  color: #E5E7EB;
}

:deep(.u-select__input:focus-within) {
  border-color: #10B981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
}

/* Efectos hover en secciones */
:deep(.hover\:shadow-xl) {
  transition: all 0.3s ease;
}

/* Gradientes y glassmorphism */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>