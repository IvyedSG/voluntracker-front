import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  // Registrar componentes de configuración con kebab-case en el template
  const componentes = import.meta.glob('../components/configuracion/*.vue', { eager: true });
  
  for (const path in componentes) {
    const componentName = path.split('/').pop()?.replace('.vue', '');
    if (componentName) {
      // @ts-ignore - Necesario porque el tipo del módulo puede variar
      nuxtApp.vueApp.component(componentName, componentes[path].default);
    }
  }
});