<template>
  <div class="space-y-8">
    <div class="bg-gray-800 bg-opacity-80 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <!-- Decoración de fondo con círculos animados -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-green-500 bg-opacity-10 rounded-full blur-2xl animate-pulse-slow"></div>
      <div class="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-500 bg-opacity-10 rounded-full blur-3xl animate-float"></div>
      
      <div class="relative z-10">
        <!-- Header con gradiente y efectos -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center">
              <div class="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-lg mr-3 shadow-glow-green">
                <UIcon name="i-heroicons-building-office" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 text-transparent bg-clip-text">Datos de la Organización</h2>
            </div>
            <p class="text-gray-400 text-sm mt-1">Información básica y contacto de tu organización</p>
          </div>
          
          <!-- Indicador de estado -->
          <div class="hidden lg:flex items-center space-x-2 bg-gray-800 bg-opacity-40 py-1.5 px-3 rounded-full border border-gray-700">
            <div class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span class="text-xs text-gray-300">Datos actualizados</span>
          </div>
        </div>

        <!-- Contenido del formulario -->
        <form @submit.prevent="guardarCambios" class="space-y-6">
          <!-- Logo de la organización -->
          <div class="bg-gray-800 bg-opacity-50 p-5 rounded-xl border border-gray-700 hover:border-green-500 hover:border-opacity-30 transition-all group">
            <div class="flex items-center gap-2 mb-4">
              <UIcon name="i-heroicons-photo" class="h-4 w-4 text-green-400" />
              <span class="text-sm font-medium text-gray-200">Logo de la organización</span>
            </div>
            
            <div class="flex flex-wrap items-center gap-6">
              <!-- Contenedor del logo -->
              <div class="w-24 h-24 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg flex items-center justify-center overflow-hidden relative group-hover:shadow-md group-hover:shadow-green-900 transition-all">
                <img v-if="formulario.logo" :src="formulario.logo" alt="Logo" class="w-full h-full object-contain" />
                <UIcon v-else name="i-heroicons-building-office" class="h-9 w-9 text-green-300 text-opacity-50" />
                
                <!-- Botón eliminar (solo visible al hover) -->
                <div v-if="formulario.logo" class="absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <UButton 
                    size="xs" 
                    color="red"
                    icon="i-heroicons-trash" 
                    variant="soft"
                    @click.prevent="eliminarLogo"
                  />
                </div>
              </div>
              
              <!-- Controles de logo -->
              <div class="flex-1">
                <UButton 
                  size="sm"
                  class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 transition-all mb-3"
                  @click="seleccionarLogo"
                >
                  <UIcon name="i-heroicons-arrow-up-tray" class="h-4 w-4 mr-2" />
                  {{ formulario.logo ? 'Cambiar logo' : 'Subir logo' }}
                </UButton>
                
                <p class="text-xs text-gray-400">
                  Formatos: JPG, PNG. Tamaño máx: 2MB. Recomendado: 200×200px
                </p>
              </div>
            </div>
          </div>

          <!-- Información básica -->
          <div class="bg-gray-800 bg-opacity-50 p-5 rounded-xl border border-gray-700 hover:border-green-500 hover:border-opacity-30 transition-all">
            <div class="flex items-center gap-2 mb-4">
              <UIcon name="i-heroicons-identification" class="h-4 w-4 text-green-400" />
              <span class="text-sm font-medium text-gray-200">Información básica</span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Nombre y Email (campos obligatorios) -->
              <div>
                <label class="block text-sm text-gray-300 mb-1.5">
                  Nombre de la organización <span class="text-emerald-400">*</span>
                </label>
                <UInput
                  v-model="formulario.nombre"
                  placeholder="Ej: Fundación Solidaria"
                  icon="i-heroicons-building-office-2"
                  required
                  class="w-full"
                  @input="$emit('cambios')"
                />
              </div>
              
              <div>
                <label class="block text-sm text-gray-300 mb-1.5">
                  Email de contacto <span class="text-emerald-400">*</span>
                </label>
                <UInput
                  v-model="formulario.email"
                  type="email"
                  placeholder="contacto@fundacion.org"
                  icon="i-heroicons-envelope"
                  required
                  class="w-full"
                  @input="$emit('cambios')"
                />
                <p class="text-xs text-gray-400 mt-1">Correo para notificaciones del sistema</p>
              </div>
              
              <!-- Teléfono y Sitio web (campos opcionales) -->
              <div>
                <label class="block text-sm text-gray-300 mb-1.5">Teléfono</label>
                <UInput
                  v-model="formulario.telefono"
                  placeholder="+34 123 456 789" 
                  icon="i-heroicons-phone"
                  class="w-full"
                  @input="$emit('cambios')"
                />
              </div>
              
              <div>
                <label class="block text-sm text-gray-300 mb-1.5">Sitio web</label>
                <UInput
                  v-model="formulario.sitioWeb"
                  placeholder="https://www.fundacion.org"
                  icon="i-heroicons-globe-alt"
                  class="w-full"
                  @input="$emit('cambios')"
                />
              </div>
            </div>
          </div>

          <!-- Descripción -->
          <div class="bg-gray-800 bg-opacity-50 p-5 rounded-xl border border-gray-700 hover:border-green-500 hover:border-opacity-30 transition-all">
            <div class="flex items-center gap-2 mb-4">
              <UIcon name="i-heroicons-document-text" class="h-4 w-4 text-green-400" />
              <span class="text-sm font-medium text-gray-200">Descripción</span>
            </div>
            
            <div class="relative">
              <UTextarea
                v-model="formulario.descripcion"
                placeholder="Describe la misión y visión de tu organización..."
                rows="3"
                class="w-full resize-none"
                @input="$emit('cambios')"
              />
              <!-- Contador de caracteres -->
              <div class="absolute bottom-2 right-2 px-2 py-1 bg-gray-800 bg-opacity-70 rounded-md text-xs">
                <span :class="{
                  'text-green-400': (contadorCaracteres < 400),
                  'text-yellow-400': (contadorCaracteres >= 400 && contadorCaracteres < 480),
                  'text-red-400': (contadorCaracteres >= 480)
                }">
                  {{ contadorCaracteres }}
                </span>
                <span class="text-gray-400">/500</span>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2 flex items-center">
              <UIcon name="i-heroicons-information-circle" class="h-3 w-3 mr-1" />
              Esta descripción aparecerá en el perfil público de la organización
            </p>
          </div>

          <!-- Dirección -->
          <div class="bg-gray-800 bg-opacity-50 p-5 rounded-xl border border-gray-700 hover:border-green-500 hover:border-opacity-30 transition-all">
            <div class="flex items-center gap-2 mb-4">
              <UIcon name="i-heroicons-map" class="h-4 w-4 text-green-400" />
              <span class="text-sm font-medium text-gray-200">Dirección</span>
            </div>
            
            <UTextarea
              v-model="formulario.direccion"
              placeholder="Calle, número, ciudad, código postal, país"
              rows="2"
              class="w-full resize-none"
              @input="$emit('cambios')"
            />
          </div>

          <!-- Redes sociales -->
          <div class="bg-gray-800 bg-opacity-50 p-5 rounded-xl border border-gray-700 hover:border-green-500 hover:border-opacity-30 transition-all">
            <div class="flex items-center gap-2 mb-4">
              <UIcon name="i-heroicons-share" class="h-4 w-4 text-green-400" />
              <span class="text-sm font-medium text-gray-200">Redes sociales</span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Inputs de redes sociales con iconos coloridos -->
              <div class="relative">
                <UInput
                  v-model="formulario.redesSociales.facebook"
                  placeholder="URL de Facebook"
                  class="pl-10"
                  @input="$emit('cambios')"
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <UIcon name="i-simple-icons-facebook" class="h-4 w-4 text-blue-400" />
                </div>
              </div>
              
              <div class="relative">
                <UInput
                  v-model="formulario.redesSociales.twitter"
                  placeholder="URL de Twitter/X"
                  class="pl-10"
                  @input="$emit('cambios')"
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <UIcon name="i-simple-icons-x" class="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div class="relative">
                <UInput
                  v-model="formulario.redesSociales.instagram"
                  placeholder="URL de Instagram"
                  class="pl-10"
                  @input="$emit('cambios')"
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <UIcon name="i-simple-icons-instagram" class="h-4 w-4 text-pink-400" />
                </div>
              </div>
              
              <div class="relative">
                <UInput
                  v-model="formulario.redesSociales.linkedin"
                  placeholder="URL de LinkedIn"
                  class="pl-10"
                  @input="$emit('cambios')"
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <UIcon name="i-simple-icons-linkedin" class="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-700 border-opacity-40 relative">
            <div class="absolute left-0 bottom-0 w-1/3 h-px bg-gradient-to-r from-green-500 to-transparent from-opacity-40 to-opacity-0"></div>
            
            <UButton
              color="gray"
              variant="ghost"
              @click="resetearFormulario"
              :disabled="cargando"
              icon="i-heroicons-arrow-path"
            >
              Cancelar
            </UButton>
            
            <UButton
              type="submit"
              class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0"
              :loading="cargando"
              :disabled="!hayDatosMinimoNecesarios || cargando"
              icon="i-heroicons-check-circle"
            >
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

// Computed properties
const contadorCaracteres = computed(() => formulario.value.descripcion?.length || 0);

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
        console.error('El archivo es demasiado grande. Máximo 2MB.');
        return;
      }
      
      formulario.value.logo = URL.createObjectURL(file);
      emit('cambios');
    }
  };
  input.click();
};

const eliminarLogo = () => {
  formulario.value.logo = undefined;
  emit('cambios');
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
.bg-gray-750 {
  background-color: rgb(31, 41, 55);
}

.shadow-glow-green {
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Eliminar los estilos deep que usan la sintaxis de slash */
:deep(.u-input),
:deep(.u-textarea) {
  background-color: rgba(31, 41, 55, 0.9);
  border-color: rgba(75, 85, 99, 0.7);
  color: #e5e7eb;
}

:deep(.u-input:focus),
:deep(.u-textarea:focus) {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}
</style>