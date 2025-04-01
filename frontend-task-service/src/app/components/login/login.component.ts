import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule, RouterModule]
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(form: NgForm) {
    if(form.valid){
        this.authService.login(this.credentials).subscribe({
          next: (response) => {
            console.log("Respuesta del login:", response); // ¡AGREGA ESTE LOG!
            // Verifica que la respuesta contiene el token
            if (response && response.token) { // ¡IMPORTANTE: Verifica que response.token exista!
                this.authService.setToken(response.token);
                this.router.navigate(['/tasks']); //  Redirige a /tasks (la ruta protegida)
            } else {
                this.errorMessage = 'La respuesta del servidor no contiene un token.';
                console.error('La respuesta del servidor no contiene un token.');
            }
          },
          error: (error) => {
            this.errorMessage = 'Credenciales inválidas.'; // Muestra un mensaje de error
            console.error("Error en el login:", error);
          }
        });
    } else {
        this.errorMessage = 'Por favor, introduce usuario y contraseña.';
    }
  }
}