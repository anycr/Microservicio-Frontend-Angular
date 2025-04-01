import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,           // ¡Standalone!
  imports: [CommonModule, FormsModule, RouterModule ] // ¡Importa módulos!
})
export class RegisterComponent {

  newUser: User = { // Objeto para el formulario
    username: '',
    password: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(form: NgForm): void {
    this.errorMessage = ''; // Limpia errores previos
    this.successMessage = ''; // Limpia mensajes de éxito previos

    if (form.valid) {
      this.authService.register(this.newUser).subscribe({
        next: (response) => {
          console.log("✅ Usuario registrado:", response);
          this.successMessage = '¡Usuario registrado con éxito! Ahora puedes iniciar sesión.';
          // Opcional: Redirigir automáticamente al login después de unos segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000); // Redirige después de 3 segundos
        },
        error: (error: HttpErrorResponse) => {
          console.error("❌ Error en el registro:", error);
          if (error.status === 400 && error.error?.message) {
            // Si el backend devuelve un mensaje específico para el 400 (ej: usuario ya existe)
            this.errorMessage = `⚠️ ${error.error.message}`;
          } else if (error.error && typeof error.error === 'string') {
             // A veces el error 400/500 puede venir como texto plano
             this.errorMessage = `⚠️ ${error.error}`;
          }
           else {
            // Mensaje genérico
            this.errorMessage = '⚠️ Error en el registro. Verifica los datos o intenta con otro usuario.';
          }
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
    }
  }
}