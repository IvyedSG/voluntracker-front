<template>
  <div class="space-y-8">
    <!-- Configuración de autenticación -->
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
                <UIcon name="i-heroicons-shield-check" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Seguridad y Autenticación</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Configura las políticas de seguridad de tu organización</p>
          </div>
        </div>

        <form @submit.prevent="guardarCambios" class="space-y-8">
          <!-- Autenticación multifactor -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-finger-print" class="h-4 w-4 text-green-400 mr-2" />
                  <h3 class="text-lg font-medium text-white">Autenticación Multifactor (MFA)</h3>
                </div>
                <p class="text-sm text-gray-400 mt-1 ml-6">Agrega una capa extra de seguridad</p>
              </div>
              <UToggle
                v-model="formulario.mfaHabilitado"
                @change="$emit('cambios')"
                activeColor="emerald"
                class="scale-110"
              />
            </div>
            
            <div v-if="formulario.mfaHabilitado" class="ml-6 mt-3 bg-emerald-900/20 border border-emerald-800/30 rounded-lg p-4">
              <div class="flex items-start space-x-3">
                <UIcon name="i-heroicons-information-circle" class="h-5 w-5 text-emerald-400 mt-0.5" />
                <div class="text-sm text-emerald-300">
                  <p class="font-medium">MFA habilitado para toda la organización</p>
                  <p class="mt-1">Los usuarios deberán configurar un segundo factor de autenticación en su próximo inicio de sesión.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Configuración de sesiones -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <div class="flex items-center mb-4">
              <UIcon name="i-heroicons-clock" class="h-4 w-4 text-green-400 mr-2" />
              <h3 class="text-lg font-medium text-white">Gestión de Sesiones</h3>
            </div>
            
            <div class="ml-6">
              <label class="block text-sm font-medium text-gray-300 mb-3">
                Tiempo de sesión (minutos)
              </label>
              <div class="flex items-center space-x-4">
                <UInput
                  v-model.number="formulario.tiempoSesion"
                  type="number"
                  min="30"
                  max="1440"
                  class="w-32 bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                  @input="$emit('cambios')"
                />
                <span class="text-sm text-gray-400">
                  Las sesiones expirarán después de {{ Math.floor((formulario.tiempoSesion ?? 0) / 60) }}h {{ (formulario.tiempoSesion ?? 0) % 60 }}m de inactividad
                </span>
              </div>
            </div>
          </div>

          <!-- Política de contraseñas -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <div class="flex items-center mb-5">
              <UIcon name="i-heroicons-key" class="h-4 w-4 text-green-400 mr-2" />
              <h3 class="text-lg font-medium text-white">Política de Contraseñas</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 ml-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-3">
                  Longitud mínima
                </label>
                <UInput
                  v-model.number="formulario.politicaContrasena.longitudMinima"
                  type="number"
                  min="6"
                  max="32"
                  class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                  @input="$emit('cambios')"
                />
              </div>
              
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-300 mb-3">Requisitos</label>
                
                <div class="space-y-3">
                  <label class="flex items-center space-x-3 cursor-pointer group">
                    <UCheckbox
                      v-model="formulario.politicaContrasena.requiereMayusculas"
                      @change="$emit('cambios')"
                      color="success"
                    />
                    <span class="text-sm text-gray-300 group-hover:text-emerald-300 transition-colors">Mayúsculas (A-Z)</span>
                  </label>
                  
                  <label class="flex items-center space-x-3 cursor-pointer group">
                    <UCheckbox
                      v-model="formulario.politicaContrasena.requiereMinusculas"
                      @change="$emit('cambios')"
                      color="success"
                    />
                    <span class="text-sm text-gray-300 group-hover:text-emerald-300 transition-colors">Minúsculas (a-z)</span>
                  </label>
                  
                  <label class="flex items-center space-x-3 cursor-pointer group">
                    <UCheckbox
                      v-model="formulario.politicaContrasena.requiereNumeros"
                      @change="$emit('cambios')"
                      color="success"
                    />
                    <span class="text-sm text-gray-300 group-hover:text-emerald-300 transition-colors">Números (0-9)</span>
                  </label>
                  
                  <label class="flex items-center space-x-3 cursor-pointer group">
                    <UCheckbox
                      v-model="formulario.politicaContrasena.requiereSimbolos"
                      @change="$emit('cambios')"
                      color="success"
                    />
                    <span class="text-sm text-gray-300 group-hover:text-emerald-300 transition-colors">Símbolos (!@#$%)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Protección contra ataques -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <div class="flex items-center mb-5">
              <UIcon name="i-heroicons-shield-exclamation" class="h-4 w-4 text-green-400 mr-2" />
              <h3 class="text-lg font-medium text-white">Protección contra Ataques</h3>
            </div>
            
            <div class="ml-6 space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-3">
                    Intentos máximos de inicio de sesión
                  </label>
                  <UInput
                    v-model.number="formulario.intentosMaximos"
                    type="number"
                    min="1"
                    max="10"
                    class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                    @input="$emit('cambios')"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-3">
                    Duración del bloqueo (minutos)
                  </label>
                  <UInput
                    v-model.number="formulario.duracionBloqueo"
                    type="number"
                    min="5"
                    max="1440"
                    :disabled="!formulario.bloqueoTemporal"
                    class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                    :class="{'opacity-50 cursor-not-allowed': !formulario.bloqueoTemporal}"
                    @input="$emit('cambios')"
                  />
                </div>
              </div>
              
              <label class="flex items-center space-x-3 cursor-pointer group">
                <UCheckbox
                  v-model="formulario.bloqueoTemporal"
                  @change="$emit('cambios')"
                  color="emerald"
                />
                <span class="text-sm text-gray-300 group-hover:text-emerald-300 transition-colors">Activar bloqueo temporal después de intentos fallidos</span>
              </label>
            </div>
          </div>

          <!-- Vista previa de política -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50">
            <div class="flex items-center mb-4">
              <UIcon name="i-heroicons-eye" class="mr-2 h-4 w-4 text-green-400" />
              <h4 class="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-medium">Resumen de la política de seguridad</h4>
            </div>
            <div class="ml-6 space-y-3 text-sm text-gray-300">
              <div class="flex items-center space-x-2 bg-gray-800/70 p-2.5 rounded-lg">
                <UIcon :name="formulario.mfaHabilitado ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                       :class="formulario.mfaHabilitado ? 'text-emerald-400' : 'text-red-400'" class="h-4 w-4" />
                <span>MFA {{ formulario.mfaHabilitado ? 'habilitado' : 'deshabilitado' }}</span>
              </div>
              <div class="flex items-center space-x-2 bg-gray-800/70 p-2.5 rounded-lg">
                <UIcon name="i-heroicons-clock" class="h-4 w-4 text-emerald-400" />
                <span>Sesiones expiran en {{ formulario.tiempoSesion }} minutos</span>
              </div>
              <div class="flex items-center space-x-2 bg-gray-800/70 p-2.5 rounded-lg">
                <UIcon name="i-heroicons-key" class="h-4 w-4 text-emerald-400" />
                <span>Contraseñas: mínimo {{ formulario.politicaContrasena?.longitudMinima ?? 8 }} caracteres</span>
              </div>
              <div class="flex items-center space-x-2 bg-gray-800/70 p-2.5 rounded-lg">
                <UIcon name="i-heroicons-shield-exclamation" class="h-4 w-4 text-emerald-400" />
                <span>Bloqueo después de {{ formulario.intentosMaximos }} intentos fallidos</span>
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
              :loading="cargando"
              :disabled="cargando"
            >
              <UIcon name="i-heroicons-check-circle" class="h-4 w-4 mr-1" v-if="!cargando" />
              Guardar configuración
            </UButton>
          </div>
        </form>
      </div>
    </div>

    <!-- Gestión de roles -->
    <div class="bg-gray-800/80 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <!-- Decoración de fondo con tonos verdes -->
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative z-10">
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center">
              <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
                <UIcon name="i-heroicons-user-group" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Gestión de Roles</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Administra los roles y permisos de tu organización</p>
          </div>
          <UButton 
            @click="abrirModalCrearRol" 
            class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-md hover:shadow-xl transition-all"
            size="sm"
          >
            <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
            Crear rol
          </UButton>
        </div>

        <!-- Lista de roles -->
        <div class="space-y-5">
          <div 
            v-for="rol in roles" 
            :key="rol.id"
            class="bg-gray-750/50 border border-gray-700/50 hover:border-green-500/30 rounded-lg p-5 transition-all transform hover:scale-[1.01] duration-200"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-white font-medium">{{ rol.nombre }}</h3>
                  <span v-if="!rol.esPersonalizado" class="px-2.5 py-1 text-xs bg-emerald-900/30 text-emerald-400 rounded-full border border-emerald-800/30">
                    Sistema
                  </span>
                </div>
                <p class="text-gray-400 text-sm mb-3">{{ rol.descripcion }}</p>
                <div class="flex items-center space-x-4 text-xs">
                  <span class="bg-gray-800/70 text-gray-300 px-2.5 py-1.5 rounded-md flex items-center">
                    <UIcon name="i-heroicons-users" class="h-3 w-3 mr-1.5 text-emerald-400" />
                    {{ rol.usuariosAsignados }} usuarios
                  </span>
                  <span class="bg-gray-800/70 text-gray-300 px-2.5 py-1.5 rounded-md flex items-center">
                    <UIcon name="i-heroicons-lock-closed" class="h-3 w-3 mr-1.5 text-emerald-400" />
                    {{ rol.permisos.length === 1 && rol.permisos[0] === '*' ? 'Todos los permisos' : `${rol.permisos.length} permisos` }}
                  </span>
                </div>
              </div>
              
              <div class="flex items-center space-x-2">
                <UButton 
                  size="sm" 
                  variant="ghost"
                  class="hover:bg-emerald-900/20 hover:text-emerald-400 transition-all"
                >
                  <UIcon name="i-heroicons-eye" class="h-4 w-4" />
                </UButton>
                <UButton 
                  v-if="rol.esPersonalizado" 
                  size="sm" 
                  variant="ghost"
                  class="hover:bg-emerald-900/20 hover:text-emerald-400 transition-all"
                >
                  <UIcon name="i-heroicons-pencil" class="h-4 w-4" />
                </UButton>
                <UButton 
                  v-if="rol.esPersonalizado" 
                  size="sm" 
                  variant="ghost"
                  class="hover:bg-red-900/20 hover:text-red-400 transition-all"
                >
                  <UIcon name="i-heroicons-trash" class="h-4 w-4" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para crear rol con estilo mejorado -->
    <UModal v-model="mostrarModalCrearRol">
      <div class="bg-gray-800 border border-gray-700 shadow-lg backdrop-blur-sm p-6 rounded-xl relative overflow-hidden">
        <!-- Decoración de fondo del modal -->
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl"></div>
        
        <div class="relative z-10">
          <div class="flex items-center mb-5">
            <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
              <UIcon name="i-heroicons-user-plus" class="h-5 w-5 text-white" />
            </div>
            <h3 class="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Crear nuevo rol</h3>
          </div>
          
          <form @submit.prevent="crearRol" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Nombre del rol</label>
              <UInput
                v-model="nuevoRol.nombre"
                placeholder="Ej: Supervisor"
                required
                class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
              <UTextarea
                v-model="nuevoRol.descripcion"
                placeholder="Describe las responsabilidades de este rol..."
                :rows="3"
                class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all resize-none p-4"
              />
            </div>
            
            <div>
              <label class="flex items-center text-sm font-medium text-gray-300 mb-3">
                <UIcon name="i-heroicons-lock-closed" class="h-4 w-4 text-green-400 mr-2" />
                Permisos
              </label>
              <div class="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto bg-gray-750/50 p-4 rounded-lg border border-gray-700/50">
                <label 
                  v-for="permiso in permisosDisponibles" 
                  :key="permiso.id"
                  class="flex items-center space-x-2 cursor-pointer group"
                >
                  <UCheckbox
                    :model-value="nuevoRol.permisos.includes(permiso.id)"
                    @change="togglePermiso(permiso.id)"
                    color="emerald"
                  />
                  <span class="text-sm text-gray-300 group-hover:text-emerald-300 transition-colors">{{ permiso.nombre }}</span>
                </label>
              </div>
            </div>
            
            <div class="flex items-center justify-end space-x-4 pt-5 mt-2 border-t border-gray-700/40 relative">
              <div class="absolute left-0 bottom-0 w-1/3 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
              
              <UButton 
                type="button" 
                variant="ghost"
                class="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all border border-gray-700/50"
                @click="cerrarModalCrearRol"
              >
                Cancelar
              </UButton>
              <UButton 
                type="submit"
                class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-md hover:shadow-xl transition-all"
              >
                <UIcon name="i-heroicons-plus-circle" class="h-4 w-4 mr-1" />
                Crear rol
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { ConfiguracionSeguridad, Rol } from '~/types/configuraciones';

const props = defineProps<{
  configuracion?: ConfiguracionSeguridad | null;
  roles: Rol[];
  cargando: boolean;
}>();

const emit = defineEmits<{
  actualizar: [seguridad: Partial<ConfiguracionSeguridad>];
  'crear-rol': [rol: Omit<Rol, 'id' | 'usuariosAsignados'>];
  cambios: [];
}>();

// Estado del formulario principal con objetos anidados completamente inicializados
const formulario = ref<Partial<ConfiguracionSeguridad>>({
  mfaHabilitado: true,
  tiempoSesion: 480,
  politicaContrasena: {
    longitudMinima: 8,
    requiereMayusculas: true,
    requiereMinusculas: true,
    requiereNumeros: true,
    requiereSimbolos: false
  },
  intentosMaximos: 3,
  bloqueoTemporal: true,
  duracionBloqueo: 15
});

// Estado para crear rol
const mostrarModalCrearRol = ref(false);
const nuevoRol = ref({
  nombre: '',
  descripcion: '',
  permisos: [] as string[],
  esPersonalizado: true
});

// Permisos disponibles
const permisosDisponibles = [
  { id: 'voluntarios.crear', nombre: 'Crear voluntarios' },
  { id: 'voluntarios.editar', nombre: 'Editar voluntarios' },
  { id: 'voluntarios.eliminar', nombre: 'Eliminar voluntarios' },
  { id: 'actividades.crear', nombre: 'Crear actividades' },
  { id: 'actividades.gestionar', nombre: 'Gestionar actividades' },
  { id: 'reportes.ver', nombre: 'Ver reportes' },
  { id: 'reportes.crear', nombre: 'Crear reportes' },
  { id: 'configuracion.ver', nombre: 'Ver configuración' },
  { id: 'configuracion.editar', nombre: 'Editar configuración' },
  { id: 'usuarios.gestionar', nombre: 'Gestionar usuarios' }
];

// Watchers
watch(() => props.configuracion, (nueva) => {
  if (nueva) {
    // Si el objeto que viene no tiene politicaContrasena, usamos el valor por defecto
    formulario.value = { 
      ...nueva,
      politicaContrasena: {
        longitudMinima: 8,
        requiereMayusculas: true,
        requiereMinusculas: true,
        requiereNumeros: true,
        requiereSimbolos: false,
        ...nueva.politicaContrasena // Mantiene los valores si existen
      }
    };
  }
}, { immediate: true });

// Modificar resetearFormulario para garantizar la misma estructura
const resetearFormulario = () => {
  if (props.configuracion) {
    formulario.value = { 
      ...props.configuracion,
      politicaContrasena: {
        longitudMinima: 8,
        requiereMayusculas: true,
        requiereMinusculas: true,
        requiereNumeros: true,
        requiereSimbolos: false,
        ...props.configuracion.politicaContrasena
      }
    };
  }
};

// Métodos
const guardarCambios = async () => {
  emit('actualizar', formulario.value);
};

const abrirModalCrearRol = () => {
  mostrarModalCrearRol.value = true;
  nuevoRol.value = {
    nombre: '',
    descripcion: '',
    permisos: [],
    esPersonalizado: true
  };
};

const cerrarModalCrearRol = () => {
  mostrarModalCrearRol.value = false;
};

const togglePermiso = (permisoId: string) => {
  const index = nuevoRol.value.permisos.indexOf(permisoId);
  if (index > -1) {
    nuevoRol.value.permisos.splice(index, 1);
  } else {
    nuevoRol.value.permisos.push(permisoId);
  }
};

const crearRol = () => {
  emit('crear-rol', nuevoRol.value);
  cerrarModalCrearRol();
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

/* Personalización de checkbox y toggle */
:deep(.u-checkbox__input:checked) {
  background-color: #10B981;
  border-color: #10B981;
}

:deep(.u-toggle--checked) {
  background-color: #10B981;
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