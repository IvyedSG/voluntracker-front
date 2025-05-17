import type { LoginCredentials, User, ProfileResponse } from '~/types/auth'

interface RefreshTokenResponse {
  status: string;
  data: {
    token: string;
    refreshToken: string;
  }
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
  
  // Validar token
  function isTokenValid() {
    if (!authToken.value) return false
    
    try {
      // Podríamos implementar verificación JWT 
      // Por ahora solo verificamos existencia
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
          'Authorization': `Bearer ${authToken.value}`,
          'Content-Type': 'application/json'
        },
        retry: 0
      })
      
      if (response.status === 'success' && response.data) {
        if (!response.data.token || !response.data.refreshToken) {
          throw new Error('Respuesta de token inválida')
        }
        
        authToken.value = response.data.token
        refreshToken.value = response.data.refreshToken
        
        return true
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error) {
      console.error('Error al refrescar token:', error)
      
      // Limpiar tokens en caso de error
      clearAuthData()
      return false
    }
  }
  
  // Obtener el perfil del usuario
  async function getProfile() {
    if (!authToken.value) {
      throw new Error('No hay token de autenticación disponible')
    }
    
    try {
      const response = await $fetch<ProfileResponse>(`${apiBase}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken.value}`,
          'Content-Type': 'application/json'
        },
        retry: 1
      })
      
      if (response.status === 'success' && response.data) {
        userData.value = JSON.stringify(response.data)
        return response.data
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const fetchError = error as { response?: { status?: number } };
        
        if (fetchError.response?.status === 401) {
          console.warn('Token de autenticación inválido, intentando renovar...')
          const refreshSuccess = await refreshAuthToken().catch(() => false)
          if (refreshSuccess) {
            return getProfile()
          } else {
            throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.')
          }
        } else if (fetchError.response?.status === 404) {
          throw new Error('No se encontró la información del usuario.')
        }
      }
      
      throw error instanceof Error ? error : new Error(String(error));
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
        retry: 1
      })
      
      if (response.status === 'success' && response.data) {
        if (!response.data.token || !response.data.refreshToken || !response.data.user) {
          throw new Error('Datos de autenticación incompletos')
        }
        
        authToken.value = response.data.token
        refreshToken.value = response.data.refreshToken
        userData.value = JSON.stringify(response.data.user)
        
        return response.data
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const fetchError = error as { response?: { status?: number } };
        
        if (fetchError.response?.status === 401) {
          throw new Error('Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.')
        } else if (fetchError.response?.status === 429) {
          throw new Error('Demasiados intentos fallidos. Por favor, inténtalo más tarde.')
        }
      }
      
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
  
  // Limpiar datos de autenticación (sin redirección)
  function clearAuthData() {
    authToken.value = null
    refreshToken.value = null
    userData.value = null
  }
  
  // Cerrar sesión (con redirección)
  function logout(redirect = true) {
    clearAuthData()
    if (redirect && import.meta.client) {
      return navigateTo('/login', { replace: true })
    }
  }
  
  // Verificar autenticación
  async function checkAuth() {
    if (!authToken.value || !isTokenValid()) {
      if (refreshToken.value) {
        return refreshAuthToken()
          .catch(() => {
            clearAuthData()
            return false
          })
      } else {
        clearAuthData()
        return false
      }
    }
    return true
  }
  
  return {
    login,
    logout,
    clearAuthData,
    checkAuth,
    isAuthenticated,
    user,
    refreshAuthToken,
    getProfile
  }
}