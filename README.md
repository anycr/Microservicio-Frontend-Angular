# Gestión de Tareas con Angular:
  Una API centralizada y eficiente para gestionar todas tus tareas. Permite crear, organizar, asignar y dar seguimiento a tus pendientes de forma sencilla a través de cualquier aplicación conectada. Es la base para construir potentes herramientas de productividad, con la posibilidad de añadir seguridad avanzada y notificaciones en el futuro.

  Microservicio Spring Boot que implementa una API REST para la entidad "Task". Utiliza Spring Data JPA para la persistencia de datos con PostgreSQL, Spring Web para los controladores REST y, opcionalmente, Spring Security para la protección de endpoints (con posible integración JWT) (https://github.com/anycr/Microservicio-BackendJava-SpringBoot). La API sigue convenciones REST estándar y devuelve respuestas JSON. Está preparado para ser consumido por aplicaciones cliente como un frontend Angular, gestionando las operaciones básicas de un sistema de tareas y permitiendo futuras ampliaciones.
### 

📌 ️ Tecnologías Utilizadas:
```
Angular 11.2.0,
TypeScript,
Componentes Standalone,
Plantillas HTML,
Servicios,
HttpClientModule y HttpClient,
Enrutamiento,
CSS
```

### 📌 Estructura del Proyecto:
```
 📂 MICROSERVICIO-FRONTEND-ANGULAR
 ┣ 📂 frontend-task-service  # Carpeta para la aplicación Angular
 ┃ ┣ 📂 images
 ┃ ┃ ┗ 📄 fondo-Login.jpg
 ┃ ┣ 📂 src ( Código fuente de Angula)
 ┃ ┃ ┣ 📂 app
 ┃ ┃ ┃ ┣ 📂 components 
 ┃ ┃ ┃ ┃ ┣ 📂 login (Componente para logearse o iniciar sesión)
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 login.component.css 
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 login.component.html  
 ┃ ┃ ┃ ┃ ┃ ┗ 📄 login.component.ts  
 ┃ ┃ ┃ ┃ ┣ 📂 register (Componente para el registro de usuarios)
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 register.component.css 
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 register.component.html 
 ┃ ┃ ┃ ┃ ┃ ┗ 📄 register.component.ts 
 ┃ ┃ ┃ ┃ ┗ 📂 task-list  (Componente para Gestionar las Tareas)
 ┃ ┃ ┃ ┃   ┣ 📄 task-list.component.css 
 ┃ ┃ ┃ ┃   ┣ 📄 task-list.component.html 
 ┃ ┃ ┃ ┃   ┗ 📄 task-list.component.ts   
 ┃ ┃ ┃ ┣ 📂 guards (Evitar que un usuario no autenticado pueda acceder a la lista de tareas)
 ┃ ┃ ┃ ┃ ┗ 📄 user.model.ts  
 ┃ ┃ ┃ ┣ 📂 models 
 ┃ ┃ ┃ ┃ ┣ 📄 task-status.enum.ts  (Estados de la tarea)
 ┃ ┃ ┃ ┃ ┣ 📄 task.model.ts  (Define la estructura de datos de una tarea )
 ┃ ┃ ┃ ┃ ┗ 📄 user.model.ts  (Define la estructura de datos de un usuario )
 ┃ ┃ ┃ ┣ 📂 services (servicios para manejar la lógica de negocio y la comunicación con las APIs)
 ┃ ┃ ┃ ┃ ┣ 📄 auth.service.ts (Servicio de Autenticación: Este servicio se encargará de la lógica de registro, inicio de sesión y manejo del token.)
 ┃ ┃ ┃ ┃ ┗ 📄 task.service.ts (Encapsula la lógica para comunicarse con API de tareas)
 ┃ ┃ ┃ ┣ 📄 app.component.css
 ┃ ┃ ┃ ┣ 📄 app.component.html 
 ┃ ┃ ┃ ┣ 📄 app.component.ts  (Usar el servicio en un componente)
 ┃ ┃ ┃ ┣ 📄 app.config.server.ts 
 ┃ ┃ ┃ ┣ 📄 app.config.ts 
 ┃ ┃ ┃ ┣ 📄 app.routes.server.ts 
 ┃ ┃ ┃ ┗ 📄 app.routes.ts  
 ┃ ┃ ┣ 📂 environments (archivo de entorno)
 ┃ ┃ ┣ 📄 index.html  
 ┃ ┃ ┣ 📄 main.server.ts 
 ┃ ┃ ┣ 📄 main.ts 
 ┃ ┃ ┣ 📄 server.ts
 ┃ ┃ ┗ 📄 styles.css
 ┃ ┣ 📄 angular.json (Configuración del framework)
 ┃ ┣ 📄 package-lock.json
 ┃ ┣ 📄 package.json (Configuración del proyecto)
 ┃ ┣ 📄 proxy.conf.json  (Configurar para evitar problemas con CORS)
 ┃ ┣ 📄 tsconfig.json
 ┃ ┣ 📄 tsconfig.app.json
 ┃ ┣ 📄 tsconfig.spec.json 
 ┃ ┗ 📄 .gitignore
 ┗ 📄 README.md
```
### 📌 Desplegar el Proyecto:
✅ 1. Desplegar el servicio "https://github.com/anycr/Microservicio-BackendJava-SpringBoot", Nota: seguir el README de este repositorio

✅ 2. Descargar este proyecto

✅ 3. Abre la terminal y ve a la carpeta del proyecto:
```
cd /ruta/del/proyecto
```
✅ 4. Levantar el frontend:
```
npm start
```
