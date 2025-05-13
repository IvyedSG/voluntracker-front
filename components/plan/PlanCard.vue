<template>
  <div class="card-container">
    <div 
      class="plan-card"
      :class="{ 'is-flipped': isFlipped }"
      @click="cardClicked"
    >
      <!-- Card Front -->
      <div class="card-face card-front">
        <!-- Fondo con gradiente elegante -->
        <div class="card-bg" :style="{
          background: `linear-gradient(165deg, rgba(22, 30, 35, 0.95) 0%, rgba(17, 24, 28, 0.98) 100%)`,
          borderColor: plan.color
        }">
          <!-- Badge Popular -->
          <div v-if="isPlanPopular" class="popular-badge">
            <div class="flex items-center gap-1">
              <UIcon name="i-heroicons-fire" class="text-amber-100" />
              <span>Popular</span>
            </div>
          </div>
          
          <!-- Top color bar -->
          <div class="card-color-bar" :style="{ backgroundColor: plan.color }"></div>
          
          <!-- Card content -->
          <div class="card-content">
            <!-- Cabecera -->
            <div class="card-header">
              <!-- Icon circle -->
              <div class="card-icon" :style="{ 
                backgroundColor: `${plan.color}20`,
                boxShadow: `0 0 15px ${plan.color}30`
              }">
                <UIcon
                  :name="plan.icono"
                  class="text-2xl"
                  :style="{ color: plan.color }"
                />
              </div>
              
              <!-- Plan name -->
              <h3 class="card-title">{{ plan.nombre }}</h3>
              
              <!-- Description -->
              <p class="card-description">{{ plan.descripcion }}</p>
            </div>
            
            <!-- Precio -->
            <div class="card-price-section" :style="{
              background: `linear-gradient(to right, ${plan.color}15, transparent)`
            }">
              <div v-if="plan.precio === 0" class="card-price">Gratis</div>
              <div v-else class="flex items-baseline justify-center">
                <span class="card-price" :style="{ color: plan.color }">
                  {{ formatCurrency(plan.precio, plan.moneda) }}
                </span>
                <span class="card-price-period">/ {{ plan.periodoFacturacion === 'mensual' ? 'mes' : 'año' }}</span>
              </div>
            </div>
            
            <!-- Solo las 4 características más importantes -->
            <div class="card-features">
              <ul>
                <li v-for="(caracteristica, index) in topFeatures" :key="index">
                  <UIcon 
                    :name="caracteristica.incluido ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                    :class="caracteristica.incluido ? `feature-included` : 'feature-excluded'"
                    :style="caracteristica.incluido ? { color: plan.color } : {}"
                  />
                  <span :class="caracteristica.incluido ? 'text-gray-300' : 'text-gray-500'">
                    {{ caracteristica.texto }}
                  </span>
                </li>
              </ul>
            </div>
          
          </div>
        </div>
      </div>
      
      <!-- Card Back -->
      <div class="card-face card-back">
        <div class="card-bg" :style="{
          background: `linear-gradient(165deg, rgba(22, 30, 35, 0.95) 0%, rgba(17, 24, 28, 0.98) 100%)`,
          borderColor: plan.color
        }">
          <!-- Top color bar -->
          <div class="card-color-bar" :style="{ backgroundColor: plan.color }"></div>
          
          <!-- Back content -->
          <div class="card-content">
            <div class="card-back-header">
              <h3 class="card-back-title" :style="{ color: plan.color }">
                {{ plan.nombre }}
              </h3>
              <p class="card-back-subtitle">Acciones disponibles</p>
            </div>
            
            <!-- Acciones -->
            <div class="card-actions">
              <UButton 
                block
                color="primary" 
                variant="ghost" 
                icon="i-heroicons-information-circle" 
                @click.stop="$emit('view-details', plan)"
                class="justify-start"
              >
                Ver detalles completos
              </UButton>
              
              <UButton 
                block
                color="primary" 
                variant="ghost" 
                icon="i-heroicons-users" 
                @click.stop="$emit('view-orgs', plan)"
                class="justify-start"
              >
                Ver organizaciones ({{ plan.numOrganizaciones }})
              </UButton>
              
              <UButton 
                block
                color="warning" 
                variant="ghost" 
                icon="i-heroicons-pencil-square" 
                @click.stop="$emit('edit', plan)"
                class="justify-start"
              >
                Editar plan
              </UButton>
              
              <UButton 
                block
                color="error" 
                variant="ghost" 
                icon="i-heroicons-trash" 
                :disabled="plan.numOrganizaciones > 0"
                @click.stop="$emit('delete', plan)"
                class="justify-start"
              >
                <span v-if="plan.numOrganizaciones > 0" class="flex items-center">
                  Eliminar plan 
                  <UTooltip text="No se puede eliminar un plan con organizaciones asociadas">
                    <UIcon name="i-heroicons-information-circle" class="ml-2 text-xs" />
                  </UTooltip>
                </span>
                <span v-else>Eliminar plan</span>
              </UButton>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import type { Plan } from '~/types/plan';

// Props
const props = defineProps<{
  plan: Plan;
}>();

// Emits
const _emit = defineEmits<{
  (e: 'edit' | 'view-orgs' | 'delete' | 'view-details', plan: Plan): void;
}>();

// Estado de tarjeta
const isFlipped = ref(false);

// Obtener estadísticas de planes del store (opcional)
const plansStats = inject('plansStats', { planMasPopular: '' });

// Solo las 4 características más importantes (priorizando las incluidas)
const topFeatures = computed(() => {
  // Primero ordenamos las características: incluidas primero, luego por longitud del texto (más corto primero)
  const sortedFeatures = [...props.plan.caracteristicas].sort((a, b) => {
    if (a.incluido !== b.incluido) {
      return a.incluido ? -1 : 1; // Incluidas primero
    }
    return a.texto.length - b.texto.length; // Textos más cortos primero
  });
  
  // Devolvemos las primeras 4
  return sortedFeatures.slice(0, 4);
});


// Verificar si es el plan más popular
const isPlanPopular = computed(() => {
  return props.plan.nombre === plansStats.planMasPopular;
});

// Voltear la tarjeta al hacer clic
function cardClicked(event: Event) {
  // Solo voltear si se hace clic en la tarjeta, no en los botones
  if (!(event.target as HTMLElement).closest('button')) {
    isFlipped.value = !isFlipped.value;
  }
}

// Formatear moneda
function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
</script>

<style scoped>
/* Contenedor de la tarjeta para mantener consistencia de altura */
.card-container {
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  height: 100%;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

/* Tarjeta */
.plan-card {
  width: 100%;
  height: 550px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  will-change: transform;
}

/* Hover effect */
.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* Estado volteado */
.plan-card.is-flipped {
  transform: rotateY(180deg);
}

/* Caras de la tarjeta */
.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  overflow: hidden;
  transform-style: preserve-3d;
}

.card-front {
  z-index: 2;
}

.card-back {
  transform: rotateY(180deg);
}

/* Fondo de la tarjeta */
.card-bg {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 16px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1);
}

/* Barra de color superior */
.card-color-bar {
  height: 5px;
  width: 100%;
}

/* Contenido principal */
.card-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 2;
  position: relative;
}

/* Cabecera */
.card-header {
  padding: 1.75rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Icono */
.card-icon {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

/* Título del plan */
.card-title {
  font-size: 1.625rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

/* Descripción */
.card-description {
  font-size: 0.9375rem;
  color: #9ca3af;
  margin-top: 0.625rem;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Sección de precio */
.card-price-section {
  padding: 1.25rem 1.5rem;
  margin: 0.75rem 0;
  text-align: center;
}

.card-price {
  font-size: 2rem;
  font-weight: 700;
}

.card-price-period {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-left: 0.25rem;
}

/* Lista de características */
.card-features {
  padding: 1.25rem 1.5rem;
  flex-grow: 1;
}

.card-features ul {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.card-features li {
  display: flex;
  align-items: flex-start;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.card-features li UIcon {
  margin-right: 0.5rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.feature-included {
  color: var(--color);
}

.feature-excluded {
  color: #4b5563;
}

/* Footer */
.card-footer {
  padding: 1rem 1.25rem 1.5rem;
  border-top: 1px solid rgba(229, 231, 235, 0.1);
  margin-top: auto;
}

/* Badge de popular */
.popular-badge {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: linear-gradient(to right, #f59e0b, #d97706);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: rotate(3deg);
  z-index: 10;
}

/* Botón para voltear al anverso */
.card-flip-btn {
  transition: all 0.2s ease;
}

.card-flip-btn:hover {
  transform: translateX(4px);
}

/* Estilos para el reverso */
.card-back-header {
  text-align: center;
  padding: 2rem 1.25rem 1.5rem;
}

.card-back-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.card-back-subtitle {
  font-size: 0.875rem;
  color: #9ca3af;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  flex-grow: 1;
  justify-content: center;
}

.card-back-footer {
  text-align: center;
  padding: 1.25rem;
  margin-top: auto;
  border-top: 1px solid rgba(229, 231, 235, 0.1);
}
</style>