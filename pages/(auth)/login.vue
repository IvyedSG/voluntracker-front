<template>
  <!-- Layout integrado directamente en la página -->
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-950 to-gray-900 p-4">
    <div class="w-full max-w-md">
      <!-- Contenido del formulario de login -->
      <AuthCard>
        <AuthHeader
          title="Bienvenido a VolunTracker"
          subtitle="Inicia sesión para continuar"
        />

        <!-- Alert para mensajes de error o éxito -->
        <UAlert
          v-if="alertInfo.show"
          :title="alertInfo.title"
          :description="alertInfo.description"
          :color="alertInfo.color"
          class="mb-4"
          variant="soft"
        />

        <form @submit.prevent="onSubmit">
          <!-- Email field -->
          <AuthFormInput
            id="email"
            v-model="form.correo"
            label="Correo electrónico"
            input-type="email"
            placeholder="user@org.com"
            autocomplete="email"
            required
            icon
            has-right-icon
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </template>
          </AuthFormInput>

          <!-- Password field -->
          <AuthFormInput
            id="password"
            v-model="form.contrasena"
            label="Contraseña"
            :input-type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            autocomplete="current-password"
            required
            icon
            has-right-icon
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </template>
            <template #rightIcon>
              <button
                type="button"
                class="text-gray-400 hover:text-gray-200 focus:outline-none"
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </template>
          </AuthFormInput>

          <!-- Submit button -->
          <AuthSubmitButton 
            :loading="loading"
            text="Iniciar sesión"
          />
        </form>

        <!-- Info message at bottom -->
        <AuthInfoMessage message="Al iniciar sesión, serás redirigido al espacio de tu organización" />
      </AuthCard>
      
      <!-- Footer -->
      <div class="text-center mt-6 text-sm text-gray-400">
        <p>© {{ new Date().getFullYear() }} VolunTracker - Todos los derechos reservados</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginCredentials } from '~/types/auth'

const auth = useAuth()
const loading = ref(false)
const showPassword = ref(false)
const form = reactive<LoginCredentials>({
  correo: '',
  contrasena: '',
})

// Definir el tipo para el color del alert
type AlertColor = 'error' | 'success' | 'warning' | 'primary' | 'secondary' | 'info' | 'neutral'

// Estado para el alert con tipo correcto
const alertInfo = reactive({
  show: false,
  title: '',
  description: '',
  color: 'primary' as AlertColor, // Tipo correcto con valor predeterminado
  icon: ''
})

// Función para mostrar el alert con tipo correcto
function showAlert(title: string, description: string, color: AlertColor) {
  alertInfo.title = title
  alertInfo.description = description
  alertInfo.color = color
  alertInfo.show = true
}

// Función para ocultar el alert
function hideAlert() {
  alertInfo.show = false
}

async function onSubmit() {
  // Ocultar alertas previas
  hideAlert()
  loading.value = true
  
  try {
    const result = await auth.login(form)
    
    // Mostrar alerta de éxito (usando valor permitido)
    showAlert(
      'Inicio de sesión exitoso', 
      'Redirigiendo al panel de control...', 
      'success',
    )
    
    // Esperar 500ms para mostrar el mensaje de éxito antes de redirigir
    setTimeout(() => {
      // Determinar ruta de redirección según tipo de usuario
      const redirectPath = result.user.userType === 'admin_plataforma' ? '/tenants' : '/dashboard'
      
      // Redirección con reemplazo en el historial
      window.location.href = redirectPath
    }, 500)
    
  } catch (error: unknown) {
    console.error('Error de autenticación:', error)
    
    // Determinar el tipo de error para mostrar un mensaje apropiado
    let errorMessage = 'Error al iniciar sesión. Por favor intenta más tarde.'
    let errorTitle = 'Error de autenticación'
    
    if (error instanceof Error) {
      errorMessage = error.message
      
      // Mostrar mensajes específicos según el tipo de error
      if (errorMessage.includes('Credenciales incorrectas')) {
        errorTitle = 'Credenciales inválidas'
      } else if (errorMessage.includes('Demasiados intentos')) {
        errorTitle = 'Acceso bloqueado'
      } else if (errorMessage.includes('red') || errorMessage.includes('network')) {
        errorTitle = 'Error de conexión'
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
      }
    }
    
    // Mostrar alerta de error (usando valor permitido)
    showAlert(
      errorTitle,
      errorMessage,
      'error',
    )
    
  } finally {
    loading.value = false
  }
}
</script>