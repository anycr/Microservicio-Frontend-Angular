// src/app/models/user.model.ts
export interface User {
    id?: number; // El id puede ser opcional al crear un usuario
    username: string;
    password?: string; // La contraseña puede ser opcional en el frontend, NUNCA la envíes al frontend
  }