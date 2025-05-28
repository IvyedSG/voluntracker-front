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
                <UIcon name="i-heroicons-building-office" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Datos de la Organización</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Información básica y contacto de tu organización</p>
          </div>
        </div>

        <form @submit.prevent="guardarCambios" class="space-y-8">
          <!-- Logo de la organización con efecto hover y más espacio -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="flex items-center text-sm font-medium text-gray-200 mb-4">
              <UIcon name="i-heroicons-photo" class="mr-2 h-4 w-4 text-green-400" />
              Logo de la organización
            </label>
            <div class="flex items-center space-x-8">
              <div class="w-28 h-28 bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 rounded-lg flex items-center justify-center overflow-hidden group shadow-md hover:shadow-green-500/20 transition-all transform hover:scale-105 duration-300">
                <img v-if="formulario.logo" :src="formulario.logo" alt="Logo" class="w-full h-full object-cover" />
                <UIcon v-else name="i-heroicons-building-office" class="h-10 w-10 text-green-300/50 group-hover:text-green-300 transition-colors" />
              </div>
              <div>
                <UButton 
                  size="sm"
                  class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-md hover:shadow-xl transition-all"
                  @click="seleccionarLogo"
                >
                  <UIcon name="i-heroicons-arrow-up-tray" class="h-4 w-4 mr-1" />
                  Cambiar logo
                </UButton>
                <p class="text-xs text-green-300/70 mt-3 flex items-center">
                  <UIcon name="i-heroicons-information-circle" class="h-3.5 w-3.5 mr-1" />
                  JPG, PNG hasta 2MB. Tamaño recomendado: 200x200px
                </p>
              </div>
            </div>
          </div>

          <!-- Información básica con gradientes verdes y más espaciado -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50">
            <label class="flex items-center text-sm font-medium mb-5">
              <span class="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-semibold">Información básica</span>
            </label>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="group">
                <label class="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <UIcon name="i-heroicons-identification" class="h-4 w-4 mr-2 text-green-400" />
                  Nombre de la organización <span class="text-green-400 ml-1">*</span>
                </label>
                <UInput
                  v-model="formulario.nombre"
                  placeholder="Ej: Fundación Solidaria"
                  required
                  class="w-full bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                  @input="$emit('cambios')"
                />
              </div>

              <div class="group">
                <label class="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <UIcon name="i-heroicons-envelope" class="h-4 w-4 mr-2 text-green-400" />
                  Email de contacto <span class="text-green-400 ml-1">*</span>
                </label>
                <UInput
                  v-model="formulario.email"
                  type="email"
                  placeholder="contacto@organizacion.org"
                  required
                  class="w-full bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                  @input="$emit('cambios')"
                />
              </div>

              <div class="group">
                <label class="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <UIcon name="i-heroicons-phone" class="h-4 w-4 mr-2 text-green-400" />
                  Teléfono
                </label>
                <UInput
                  v-model="formulario.telefono"
                  placeholder="+34 123 456 789"
                  class="w-full bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                  @input="$emit('cambios')"
                />
              </div>

              <div class="group">
                <label class="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <UIcon name="i-heroicons-globe-alt" class="h-4 w-4 mr-2 text-green-400" />
                  Sitio web
                </label>
                <UInput
                  v-model="formulario.sitioWeb"
                  placeholder="https://www.organizacion.org"
                  class="w-full bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                  @input="$emit('cambios')"
                />
              </div>
            </div>
          </div>

          <!-- Descripción con tonos verdes y más espacio de padding -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="block text-sm font-medium text-gray-300 mb-3 flex items-center">
              <UIcon name="i-heroicons-document-text" class="h-4 w-4 mr-2 text-green-400" />
              Descripción
            </label>
            <UTextarea
              v-model="formulario.descripcion"
              placeholder="Describe la misión y visión de tu organización..."
              rows="4"
              class="w-full bg-gray-700/70 border-gray-600/70 text-gray-200 resize-none ring-green-400 focus:border-green-400 transition-all py-3 px-4"
              @input="$emit('cambios')"
            />
          </div>

          <!-- Dirección -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="block text-sm font-medium text-gray-300 mb-3 flex items-center">
              <UIcon name="i-heroicons-map" class="h-4 w-4 mr-2 text-green-400" />
              Dirección
            </label>
            <UTextarea
              v-model="formulario.direccion"
              placeholder="Calle, número, ciudad, código postal, país"
              rows="2"
              class="w-full bg-gray-700/70 border-gray-600/70 text-gray-200 resize-none ring-green-400 focus:border-green-400 transition-all py-3 px-4"
              @input="$emit('cambios')"
            />
          </div>

          <!-- Redes sociales con iconos coloridos -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50">
            <label class="block text-sm font-medium mb-5">
              <span class="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-semibold flex items-center">
                <UIcon name="i-heroicons-share" class="h-4 w-4 mr-2 text-green-400" />
                Redes sociales
              </span>
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs text-gray-400 mb-2 flex items-center">
                  <div class="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                    <UIcon name="i-simple-icons-facebook" class="h-3 w-3 text-white" />
                  </div>
                  Facebook
                </label>
                <UInput
                  v-model="formulario.redesSociales.facebook"
                  placeholder="https://facebook.com/organizacion"
                  class="w-full bg-gray-700/70 border-gray-600/70 text-gray-200 group-focus:ring-2 h-12 px-4"
                  @input="$emit('cambios')"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-2 flex items-center">
                  <div class="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center mr-2">
                    <UIcon name="i-simple-icons-twitter" class="h-3 w-3 text-white" />
                  </div>
                  Twitter
                </label>
                <UInput
                  v-model="formulario.redesSociales.twitter"
                  placeholder="https://twitter.com/organizacion"
                  class="w-full bg-gray-700/70 border-gray-600/70 text-gray-200 h-12 px-4"
                  @input="$emit('cambios')"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-2 flex items-center">
                  <div class="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center mr-2">
                    <UIcon name="i-simple-icons-instagram" class="h-3 w-3 text-white" />
                  </div>
                  Instagram
                </label>
                <UInput
                  v-model="formulario.redesSociales.instagram"
                  placeholder="https://instagram.com/organizacion"
                  class="w-full bg-gray-700/70 border-gray-600/70 text-gray-200 h-12 px-4"
                  @input="$emit('cambios')"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-2 flex items-center">
                  <div class="w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center mr-2">
                    <UIcon name="i-simple-icons-linkedin" class="h-3 w-3 text-white" />
                  </div>
                  LinkedIn
                </label>
                <UInput
                  v-model="formulario.redesSociales.linkedin"
                  placeholder="https://linkedin.com/company/organizacion"
                  class="w-full bg-gray-700/70 border-gray-600/70 text-gray-200 h-12 px-4"
                  @input="$emit('cambios')"
                />
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
              Cancelar
            </UButton>
            <UButton 
              type="submit"
              class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-md hover:shadow-xl transition-all h-11"
              :class="{'opacity-70 cursor-not-allowed': !hayDatosMinimoNecesarios || cargando}"
              :loading="cargando"
              :disabled="!hayDatosMinimoNecesarios || cargando"
            >
              <UIcon name="i-heroicons-check-circle" class="h-4 w-4 mr-1" v-if="!cargando" />
              Guardar cambios
            </UButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import type { DatosOrganizacion } from '~/types/configuraciones';

const props = defineProps<{
  datos?: DatosOrganizacion | null;
  cargando: boolean;
}>();

const emit = defineEmits<{
  actualizar: [datos: Partial<DatosOrganizacion>];
  cambios: [];
}>();

// Estado del formulario
const formulario = ref<Partial<DatosOrganizacion>>({
  nombre: '',
  descripcion: '',
  email: '',
  telefono: '',
  direccion: '',
  sitioWeb: '',
  redesSociales: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  }
});

// Verificación de campos obligatorios
const hayDatosMinimoNecesarios = computed(() => {
  return formulario.value.nombre?.trim() && 
         formulario.value.email?.trim() && 
         formulario.value.email?.includes('@');
});

// Watchers
watch(() => props.datos, (nuevos) => {
  if (nuevos) {
    // Asegurarse de que redesSociales siempre exista
    formulario.value = { 
      ...nuevos,
      redesSociales: {
        facebook: '',
        twitter: '', 
        instagram: '',
        linkedin: '',
        ...nuevos.redesSociales
      }
    };
  }
}, { immediate: true });

// Métodos
const guardarCambios = async () => {
  // Validación básica del formulario
  if (!formulario.value.nombre?.trim()) {
    // Usar alguna notificación o sistema de alertas
    console.error('El nombre de la organización es obligatorio');
    return;
  }

  if (!formulario.value.email?.trim()) {
    console.error('El email de contacto es obligatorio');
    return;
  }

  emit('actualizar', formulario.value);
};

const resetearFormulario = () => {
  if (props.datos) {
    formulario.value = { 
      ...props.datos,
      redesSociales: {
        facebook: '',
        twitter: '', 
        instagram: '',
        linkedin: '',
        ...props.datos.redesSociales
      }
    };
  }
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
        // Usar alguna notificación o sistema de alertas
        console.error('El archivo es demasiado grande. Máximo 2MB.');
        return;
      }
      
      formulario.value.logo = URL.createObjectURL(file);
      emit('cambios');
    }
  };
  input.click();
};

onMounted(() => {
  if (props.datos) {
    formulario.value = { 
      ...props.datos,
      redesSociales: {
        facebook: '',
        twitter: '', 
        instagram: '',
        linkedin: '',
        ...props.datos.redesSociales
      }
    };
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