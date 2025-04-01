// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Ajusta la ruta
import { User } from '../models/user.model'; //Importa el modelo, si lo usas.

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth'; // URL base para la autenticación

  constructor(private http: HttpClient) { }

  login(credentials: User): Observable<any> { //Si usas el modelo, pon el tipo.
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(user: User): Observable<any> { //Si usas el modelo, pon el tipo.
    console.log("Enviando datos de registro:", user); 
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Método para guardar el token en localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
    console.log("Token guardado en localStorage:", token); // ¡AGREGA ESTE LOG!
  }

  // Método para obtener el token de localStorage
  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log("Token recuperado de localStorage:", token); // ¡AGREGA ESTE LOG!
    return token;
  }

  // Método para eliminar el token de localStorage (cerrar sesión)
  removeToken(): void {
    localStorage.removeItem('token');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si hay un token, false si no
  }
}