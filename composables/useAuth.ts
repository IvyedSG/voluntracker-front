import type { LoginCredentials, User } from '~/types/auth'

// Add this to your type definitions
interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  status?: string;
}

interface AuthResponse {
  status: string;
  data: {
    token: string;
    refreshToken: string;
    user: User;
  }
}

export function useAuth() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  
  // Configuración de cookies optimizada
  const cookieOptions = {
    maxAge: 60 * 60 * 24, // 24 horas
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict" as const,
    path: '/',
    httpOnly: false // Necesario false para poder acceder desde el cliente
  }
  
  // Cookies para almacenar la información de autenticación
  const authToken = useCookie('auth_token', cookieOptions)
  
  const refreshToken = useCookie('refresh_token', { 
    ...cookieOptions,
    sameSite: 'strict', // Ensure sameSite is of the correct type
    maxAge: 60 * 60 * 24 * 7 // 7 días para el refresh token
  })
  
  const userData = useCookie('user_data', cookieOptions)
  
  // Verificar autenticación
  const isAuthenticated = computed(() => !!authToken.value && !!userData.value)
  
  // Obtener usuario actual
  const user = computed(() => {
    if (!userData.value) return null
    try {
      return typeof userData.value === 'string' 
        ? JSON.parse(userData.value) 
        : userData.value
    } catch (e) {
      console.error('Error parsing user data:', e)
      return null
    }
  })
  
  // Validar token (verificar si ha expirado)
  function isTokenValid() {
    if (!authToken.value) return false
    
    try {
      // Podríamos agregar lógica para validar token JWT si lo necesitas
      // Por ahora, simplemente verificamos que exista
      return true
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  }
  
  // Refrescar token
  async function refreshAuthToken() {
    if (!refreshToken.value) {
      throw new Error('No hay token de actualización disponible')
    }
    
    try {
      const response = await $fetch<RefreshTokenResponse>(`${apiBase}/auth/refresh`, {
        method: 'POST',
        body: { refreshToken: refreshToken.value },
        headers: {
          'Content-Type': 'application/json'
        },
        retry: 0 // Evitar reintentos automáticos
      })
      
      if (!response.token || !response.refreshToken) {
        throw new Error('Respuesta de token inválida')
      }
      
      // Actualizar tokens
      authToken.value = response.token
      refreshToken.value = response.refreshToken
      
      return true
    } catch (error) {
      console.error('Error al refrescar token:', error)
      return false
    }
  }
  
  // Iniciar sesión
  async function login(credentials: LoginCredentials) {
    try {
      const response = await $fetch<AuthResponse>(`${apiBase}/auth/login`, {
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json'
        },
        retry: 1 // Permitir un reintento por si hay un problema de red
      })
      
      if (response.status === 'success' && response.data) {
        // Verificar que existan los datos necesarios antes de guardar
        if (!response.data.token || !response.data.refreshToken || !response.data.user) {
          throw new Error('Datos de autenticación incompletos')
        }
        
        // Guardar tokens y datos de usuario
        authToken.value = response.data.token
        refreshToken.value = response.data.refreshToken
        userData.value = JSON.stringify(response.data.user)
        
        return response.data
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error: unknown) {
      // Type guard to check if error is a FetchError
      if (error && typeof error === 'object' && 'response' in error) {
        const fetchError = error as { response?: { status?: number } };
        
        if (fetchError.response?.status === 401) {
          throw new Error('Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.')
        } else if (fetchError.response?.status === 429) {
          throw new Error('Demasiados intentos fallidos. Por favor, inténtalo más tarde.')
        }
      }
      
      // Re-throw the error if it doesn't match our specific conditions
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
  
  function logout() {
    console.log('Iniciando logout')
    authToken.value = null
    refreshToken.value = null
    userData.value = null
    if (import.meta.client) {
      window.location.replace('/login')
    }
  }

  
  // Verificar autenticación al cargar
  function checkAuth() {
    // Verificar si hay token y es válido
    if (!authToken.value || !isTokenValid()) {
      // Intentar refrescar token solo si hay un refresh token disponible
      if (refreshToken.value) {
        return refreshAuthToken()
          .catch(() => {
            // Si falla el refresh, eliminar todas las cookies y redirigir
            logout()
            return false
          })
      } else {
        // Si no hay refresh token, simplemente cerrar sesión
        logout()
        return false
      }
    }
    
    // Si todo está bien, devolver true
    return true
  }
  
  return {
    login,
    logout,
    checkAuth,
    isAuthenticated,
    user,
    refreshAuthToken
  }
}