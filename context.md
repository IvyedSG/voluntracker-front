# 📘 VolunTracker - Frontend Context (Nuxt3 + Tailwind + NuxtUI)

## 🧠 Descripción General

*VolunTracker* es una *webapp SaaS multi-tenant* para ONGs. Cada ONG accede a un entorno aislado con su propio subdominio, datos, configuración y branding. El sistema es gestionado por coordinadores con distintos roles.

---

## 🔐 Autenticación

•⁠  ⁠Login único (multi-tenant): permite ingresar a cualquier ONG usando correo y clave.
•⁠  ⁠Una vez logueado, se redirige al subdominio o espacio de la ONG correspondiente del coordinador.

---

## 🧩 Vistas del Sistema (Frontend)

### 1. *Login General*

•⁠  ⁠Formulario de acceso universal
•⁠  ⁠Redirección dinámica al tenant correspondiente
•⁠  ⁠Estilos personalizados según la ONG (branding, logo, colores)

---

### 2. *Dashboard (Inicio)*

•⁠  ⁠Vista tras login
•⁠  ⁠Datos clave:

- KPIs: participación, asistencia, retención, abandono
- Próximos eventos
- Últimas actividades del sistema
- Voluntarios activos/inactivos
- Gráficos de impacto y métricas

---

### 3. *Voluntarios*

•⁠  ⁠CRUD de voluntarios
•⁠  ⁠Datos por voluntario:

- Nombre completo, DNI, correo, teléfono
- Área de participación
- Estado (activo/inactivo)
- Fecha de registro
- Historial de eventos, horas, certificados

---

### 4. *Coordinadores*

•⁠  ⁠CRUD con control de roles
•⁠  ⁠Datos por coordinador:

- Nombre, correo electrónico
- Rol asignado
- ONG a la que pertenece
- Estado activo/inactivo
- Historial de acciones

---

### 5. *Gestión de Roles y Permisos*

•⁠  ⁠Sección dentro de *Coordinadores > Configuración*
•⁠  ⁠Permite:

- Ver y editar roles
- Asignar módulos y permisos por rol
- Control dinámico de acceso a vistas y acciones

---

### 6. *Eventos y Actividades*

•⁠  ⁠CRUD con calendario integrado
•⁠  ⁠Datos por evento:

- Título, descripción, fecha, hora, ubicación
- Coordinador responsable
- Capacidad máxima
- Voluntarios registrados
- Confirmación de asistencia
- Feedback y reporte automático

---

### 7. *Reportes y Análisis*

•⁠  ⁠Vista analítica
•⁠  ⁠Métricas clave:

- Participación por evento
- Horas acumuladas por persona
- Ranking de voluntarios (activos/inactivos)
- Predicción de deserción (IA)
- Exportación a PDF / Excel

---

### 8. *Documentos y Certificados*

•⁠  ⁠Visualización y descarga
•⁠  ⁠Datos:

- Certificados por evento
- Contratos firmados/enviados
- Plantillas con logo y nombre de ONG
- Fecha de emisión y firma

---

### 9. *Notificaciones y Mensajes*

•⁠  ⁠Configuración y log de envíos
•⁠  ⁠Elementos:

- Plantillas de correos y mensajes
- Envíos realizados (fecha, destinatario, estado)
- Integración futura con WhatsApp

---

### 10. *Configuración de la ONG*

•⁠  ⁠Datos configurables:

- Nombre y logo de ONG
- Subdominio o URL personalizada
- Información de contacto
- Branding (colores, fuentes)
- Límites del plan (voluntarios, eventos)
- Facturación y suscripción (Stripe)

---

### 11. *Panel de Tenants (Vista de Administradores Globales)*

•⁠  ⁠Datos por tenant (ONG):

- Nombre de la organización
- Logo y branding
- Subdominio asociado
- Estado del tenant (activo/inactivo)
- Fecha de creación
- Plan contratado (Gratuito, Pro, Premium)
- Número de voluntarios registrados
- Botón para ingresar directamente al tenant (modo superadmin)
- Acciones: editar info, suspender, cambiar plan

---

## 🛠️ Consideraciones Técnicas

•⁠  ⁠Framework: *Nuxt3*
•⁠  ⁠Estilos: *TailwindCSS + Nuxt UI*
•⁠  ⁠Componentes deben ser *responsivos,**accesibles* y con diseño coherente al branding
•⁠  ⁠Soporte multilinguaje planificado
•⁠  ⁠Toda la lógica de acceso basada en roles y permisos
•⁠  ⁠Dashboard y listas cargan vía API (paginar + filtrar)
