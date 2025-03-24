import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // ¡Redirige a /login por defecto!
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] }, // Protege la lista de tareas
  // { path: 'register', component: RegisterComponent }, // Descomenta esto cuando tengas el componente de registro
];