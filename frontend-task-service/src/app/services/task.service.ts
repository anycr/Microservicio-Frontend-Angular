import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment'; //VERIFICA

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private apiUrl = environment.apiUrl + '/api/tasks';
    private token = '';

    constructor(private http: HttpClient) { }

    setToken(token: string): void {
        this.token = token;
    }

   getAllTasks(): Observable<Task[]> {
        const headers = this.getHeaders();
        return this.http.get<Task[]>(this.apiUrl, { headers });
    }

    getTaskById(id: number): Observable<Task> {
        const headers = this.getHeaders();
        return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers });
    }

     createTask(task: any): Observable<Task> { //Recibe any.
        const headers = this.getHeaders();
        return this.http.post<Task>(this.apiUrl, task, { headers });
    }

    updateTask(id: number, task: Task): Observable<Task> {
        const headers = this.getHeaders();
        console.log("🔍 Actualizando con ID:", id, " y datos:", task); // Verifica en consola
        return this.http.put<Task>(`${this.apiUrl}/${id}`, task, { headers });
    }
    

    deleteTask(id: number): Observable<void> {
        const headers = this.getHeaders();
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }

    assignTask(id: number, username: string): Observable<Task> {
        const headers = this.getHeaders();
         return this.http.post<Task>(`${this.apiUrl}/${id}/assign?username=${username}`, {}, { headers });
    }

    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.error("❌ No hay token guardado en localStorage");
        } else {
            console.log("✅ Token enviado:", token); // 🔹 Verifica que el token se está enviando
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
    
        return headers.set('Content-Type', 'application/json');
    }
    
    
}