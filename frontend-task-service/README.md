# Gestión de Tareas con Angular:
Este microservicio de gestión de tareas consume una API REST funcional que permite manejar tareas fácilmente. Puedes extenderlo con autenticación, mensajería y más.

### 📌 ️ Tecnologías Utilizadas:
```
Java 21
Spring Boot 3
Spring Data JPA (para la interacción con PostgreSQL)
Spring Web (para la API REST)
Docker (para contenerizar la aplicación y la base de datos)
JWT  para autenticación
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
 ┃ ┣ 📄 .gitignore
 ┃ ┗ 📄 README.md
```