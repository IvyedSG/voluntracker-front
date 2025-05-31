<template>
  <div class="space-y-4">
    <!-- Header con acciones -->
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-bold text-gray-900">Documentos de la ONG</h2>
      <button
        @click="abrirDialogoSubida"
        class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Subir documento</span>
      </button>
    </div>

    <!-- Lista de documentos -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <!-- Loading state -->
      <div v-if="loading" class="flex items-center justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>

      <!-- Empty state -->
      <div v-else-if="documentos.length === 0" class="flex flex-col items-center justify-center py-10 px-4">
        <div class="bg-blue-50 rounded-full p-3 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-base font-medium text-gray-900 mb-1">No hay documentos</h3>
        <p class="text-sm text-gray-500 text-center max-w-sm">
          Sube documentos importantes de tu organización para facilitar la gestión y el acceso a tu equipo.
        </p>
        <button 
          @click="abrirDialogoSubida" 
          class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Subir primer documento
        </button>
      </div>

      <!-- Listado de documentos -->
      <ul v-else class="divide-y divide-gray-200">
        <li 
          v-for="documento in documentos" 
          :key="documento.id"
          class="hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between p-4">
            <div class="flex items-center space-x-3">
              <!-- Icono según tipo de documento -->
              <div class="flex-shrink-0">
                <div :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  getTipoDocumentoClase(documento.tipo)
                ]">
                  <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path 
                      v-if="documento.tipo === 'pdf'" 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                    />
                    <path 
                      v-else-if="documento.tipo === 'image'" 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                    <path 
                      v-else-if="documento.tipo === 'excel'" 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                    <path 
                      v-else 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                </div>
              </div>
              
              <!-- Información del documento -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ documento.nombre }}</p>
                <div class="flex items-center text-xs text-gray-500 space-x-2">
                  <span>{{ formatearTamaño(documento.tamaño) }}</span>
                  <span>•</span>
                  <span>{{ formatearFecha(documento.fechaSubida) }}</span>
                </div>
              </div>
            </div>

            <!-- Acciones -->
            <div class="flex items-center space-x-2">
              <button 
                @click="descargarDocumento(documento)" 
                class="text-gray-500 hover:text-blue-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button 
                @click="eliminarDocumento(documento.id)" 
                class="text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal de subida de documento -->
    <Dialog 
      v-model="mostrarDialogo" 
      title="Subir documento" 
      class="max-w-lg"
    >
      <form @submit.prevent="subirDocumento" class="space-y-4">
        <!-- Arrastrar y soltar archivo -->
        <div 
          class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
          @click="$refs.fileInput.click()"
          @dragover.prevent="dragover = true"
          @dragleave.prevent="dragover = false"
          @drop.prevent="handleFileDrop($event)"
          :class="{'border-blue-500 bg-blue-50': dragover}"
        >
          <input 
            type="file" 
            ref="fileInput" 
            @change="handleFileChange" 
            class="hidden" 
          />
          <div class="space-y-2">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p class="text-sm text-gray-600">
              <span class="font-medium text-blue-600">Haz clic para subir</span> o arrastra y suelta
            </p>
            <p class="text-xs text-gray-500">
              PDF, Imágenes, Excel, Word (Máximo 10MB)
            </p>
          </div>
          <div v-if="archivoSeleccionado" class="mt-4 flex items-center justify-center">
            <div class="bg-blue-100 text-blue-800 text-sm py-1 px-3 rounded-full flex items-center">
              <span class="truncate max-w-xs">{{ archivoSeleccionado.name }}</span>
              <button 
                type="button"
                @click.stop="resetearArchivo" 
                class="ml-2 text-blue-700 hover:text-blue-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Nombre del documento -->
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">
            Nombre del documento
          </label>
          <input 
            type="text"
            id="nombre"
            v-model="nuevoDocumento.nombre"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Estatutos de la organización"
            required
          />
        </div>

        <!-- Descripción -->
        <div>
          <label for="descripcion" class="block text-sm font-medium text-gray-700 mb-1">
            Descripción (opcional)
          </label>
          <textarea
            id="descripcion"
            v-model="nuevoDocumento.descripcion"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Breve descripción del documento..."
          ></textarea>
        </div>

        <!-- Botones de acción -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="cerrarDialogoSubida"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="!archivoSeleccionado || subiendo"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="subiendo">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subiendo...
            </span>
            <span v-else>Subir documento</span>
          </button>
        </div>
      </form>
    </Dialog>
    
    <!-- Modal de confirmación de eliminación -->
    <Dialog 
      v-model="mostrarConfirmacion" 
      title="¿Eliminar documento?" 
      class="max-w-md"
    >
      <div class="space-y-4">
        <p class="text-gray-600">
          ¿Estás seguro de que quieres eliminar este documento? Esta acción no se puede deshacer.
        </p>
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="mostrarConfirmacion = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="button"
            @click="confirmarEliminacion"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Eliminar
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Documento } from '~/types/perfil'
import { useDocumentosStore } from '~/stores/documentosStore'
import Dialog from '~/components/ui/Dialog.vue'

// Estados
const loading = ref(false)
const mostrarDialogo = ref(false)
const mostrarConfirmacion = ref(false)
const dragover = ref(false)
const archivoSeleccionado = ref<File | null>(null)
const subiendo = ref(false)
const documentoIdAEliminar = ref<string | null>(null)

// Store
const documentosStore = useDocumentosStore()
const { documentos, agregarDocumento, eliminarDocumento: eliminarDocumentoStore } = documentosStore

// Nuevo documento
const nuevoDocumento = reactive({
  nombre: '',
  descripcion: ''
})

// Abrir diálogo de subida
const abrirDialogoSubida = () => {
  mostrarDialogo.value = true
  resetearFormulario()
}

// Cerrar diálogo de subida
const cerrarDialogoSubida = () => {
  mostrarDialogo.value = false
  resetearFormulario()
}

// Manejar cambio de archivo
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    archivoSeleccionado.value = input.files[0]
    // Auto-completar nombre si está vacío
    if (!nuevoDocumento.nombre) {
      nuevoDocumento.nombre = archivoSeleccionado.value.name.split('.')[0]
    }
  }
}

// Manejar drag & drop
const handleFileDrop = (event: DragEvent) => {
  dragover.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    archivoSeleccionado.value = event.dataTransfer.files[0]
    // Auto-completar nombre si está vacío
    if (!nuevoDocumento.nombre) {
      nuevoDocumento.nombre = archivoSeleccionado.value.name.split('.')[0]
    }
  }
}

// Resetear archivo seleccionado
const resetearArchivo = () => {
  archivoSeleccionado.value = null
}

// Resetear formulario
const resetearFormulario = () => {
  nuevoDocumento.nombre = ''
  nuevoDocumento.descripcion = ''
  archivoSeleccionado.value = null
  dragover.value = false
}

// Subir documento
const subirDocumento = async () => {
  if (!archivoSeleccionado.value) return
  
  try {
    subiendo.value = true
    
    // Simulación de subida de archivo
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Determinar tipo de documento
    const extension = archivoSeleccionado.value.name.split('.').pop()?.toLowerCase() || ''
    let tipo = 'other'
    
    if (['pdf'].includes(extension)) tipo = 'pdf'
    else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) tipo = 'image'
    else if (['xls', 'xlsx', 'csv'].includes(extension)) tipo = 'excel'
    else if (['doc', 'docx'].includes(extension)) tipo = 'word'
    
    // Crear documento
    const nuevoDoc = {
      id: `doc-${Date.now()}`,
      nombre: nuevoDocumento.nombre,
      descripcion: nuevoDocumento.descripcion,
      tamaño: archivoSeleccionado.value.size,
      tipo,
      url: URL.createObjectURL(archivoSeleccionado.value),
      fechaSubida: new Date().toISOString()
    }
    
    // Agregar al store
    agregarDocumento(nuevoDoc)
    
    // Cerrar diálogo
    mostrarDialogo.value = false
    resetearFormulario()
    
  } catch (error) {
    console.error('Error al subir documento:', error)
  } finally {
    subiendo.value = false
  }
}

// Eliminar documento
const eliminarDocumento = (id: string) => {
  documentoIdAEliminar.value = id
  mostrarConfirmacion.value = true
}

// Confirmar eliminación
const confirmarEliminacion = () => {
  if (documentoIdAEliminar.value) {
    eliminarDocumentoStore(documentoIdAEliminar.value)
    mostrarConfirmacion.value = false
    documentoIdAEliminar.value = null
  }
}

// Descargar documento
const descargarDocumento = (documento: Documento) => {
  const a = document.createElement('a')
  a.href = documento.url
  a.download = documento.nombre
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// Utils
const formatearTamaño = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  else return `${(bytes / 1048576).toFixed(1)} MB`
}

const formatearFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getTipoDocumentoClase = (tipo: string) => {
  const clases = {
    pdf: 'bg-red-500',
    image: 'bg-blue-500',
    excel: 'bg-green-500',
    word: 'bg-indigo-500',
    other: 'bg-gray-500',
  }
  
  return clases[tipo as keyof typeof clases] || clases.other
}
</script>