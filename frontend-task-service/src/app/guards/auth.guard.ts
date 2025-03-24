import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'; //Usaremos inyección
import { AuthService } from '../services/auth.service'; //Importa AuthService

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); //Inyecta el servicio
  const router = inject(Router);

  if (authService.isAuthenticated()) { //Verifica si está autenticado
    return true; // Si está autenticado, permite el acceso
  } else {
    // Si no está autenticado, redirige a la página de login
    router.navigate(['/login']);
    return false; // Y deniega el acceso
  }
};