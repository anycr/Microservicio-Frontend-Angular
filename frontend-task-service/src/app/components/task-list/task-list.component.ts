import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/task-status.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // ¡Añade HttpErrorResponse aquí!
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class TaskListComponent implements OnInit {

    allTasks: Task[] = []; // Almacena todas las tareas originales
    tasks: Task[] = [];
    newTask: Task = {
        id: 0,  // Valor predeterminado
        title: '',
        description: '',
        status: TaskStatus.PENDIENTE,
        dueDate: new Date(),  // Valor predeterminado
        assignedTo: ''
    };
    editingTask: Task | null = null;
    assignedUser: string = '';
    taskStatuses = Object.values(TaskStatus); // ¡Asegúrate de tener esto!
    selectedTask: Task | null = null;
    searchTerm: string = '';         // Nuevo: Término de búsqueda/filtro
    searchError: string = '';      // ✅ Mensaje de error para la búsqueda
    successMessage: string = '';    // ✅ Mensaje de éxito
    errorMessageCrear: string = '';      // ✅ Mensaje de error Crear
    errorMessageEditar: string = '';      // ✅ Mensaje de error Editar
    assignUsernames: { [taskId: number]: string } = {};
    showForm: boolean = false;        // Controla visibilidad del form de creación
    
    // Declara ViewChild para obtener la referencia al div del formulario de edición
    @ViewChild('editFormDiv') editFormElement: ElementRef | undefined; // Puede ser undefined al inicio

    constructor(private taskService: TaskService) { }

    ngOnInit(): void {
        const token = localStorage.getItem('token');
        if (token) {
            this.taskService.setToken(token);
        }
        this.loadTasks();
    }

    //Obtener todas las tareas
    loadTasks() {
        this.taskService.getAllTasks().subscribe({
            next: (tasks: Task[]) => {
                console.log("📥 Tareas recibidas:", tasks); // Verifica si llega assignedTo
                this.allTasks = tasks; // Guarda la lista completa
                this.tasks = [...this.allTasks]; // Muestra todas inicialmente
                this.selectedTask = null; // Limpia la selección por ID
                this.searchError = '';    // Limpia error de búsqueda
            },
            error: (error: any) => {
                console.error('❌ Error al cargar tareas:', error);
                this.searchError = 'Error al cargar las tareas.';
            }
        });
    }
    
    //Crear tarea
    createTask() {
        if (this.newTask.title.trim() === '') {
            this.errorMessageCrear = '⚠️ El título de la tarea es obligatorio.';
            return;
        }

        const taskToSend = {
            title: this.newTask.title,
            description: this.newTask.description,
            status: this.newTask.status,
            dueDate: this.newTask.dueDate ? this.newTask.dueDate.toISOString() : undefined,
            assignedTo: this.newTask.assignedTo
        };
    
        console.log("🛑 JSON que se envía:", JSON.stringify(taskToSend, null, 2));
    
        this.taskService.createTask(taskToSend).subscribe({
            next: (newTask: Task) => {
                console.log("✅ Tarea creada:", newTask);
                this.allTasks.push(newTask); // Añade a la lista completa
                this.resetSearch(); // Muestra todas (incluyendo la nueva)
                this.newTask = { id: 0, title: '', description: '', status: TaskStatus.PENDIENTE, dueDate: new Date(), assignedTo: '' };
                
                this.successMessage = '✅ ¡La tarea se creó exitosamente!';
                this.errorMessageCrear = ''; // ✅ Limpia el error si había uno
                setTimeout(() => this.clearSuccessMessage(), 4000); // ✅ Limpia el mensaje después de 4s
            },
            error: (error: any) => { // Manejo de errores mejorado
                console.error("❌ Error al crear la tarea:", error);
                if (error.status === 400 && error.error?.message) {
                    // Muestra el mensaje específico del backend para errores 400
                    this.errorMessageCrear = `⚠️ ${error.error.message}`;
                } else {
                    // Mensaje genérico para otros errores
                    this.errorMessageCrear = '⚠️ No se pudo crear la tarea. Inténtalo de nuevo.';
                }
            }

        });
    }
    
    // Método para limpiar el mensaje de éxito manualmente
    clearSuccessMessage() {
        this.successMessage = '';
    }
    
    
    editTask(task: Task) {
        this.editingTask = { ...task, dueDate: task.dueDate ? new Date(task.dueDate) : undefined }; 
        // 2. Espera un instante para que Angular renderice el div y luego haz scroll
        setTimeout(() => {
            if (this.editFormElement) { // Verifica si el elemento ya existe en el DOM
                this.editFormElement.nativeElement.scrollIntoView({
                    behavior: 'smooth', // Scroll suave
                    block: 'start'      // Alinea la parte superior del div con la parte superior de la vista
                });
            }
        }, 0); // Timeout 0 ejecuta el código después del ciclo de detección de cambios actual
    }
   
    //Actualizar la tarea
    updateTask() {
        if (this.editingTask) {
            const taskToUpdate: Task = { // 👈 Explicitamente del tipo 'Task'
                id: this.editingTask.id,
                title: this.editingTask.title,
                description: this.editingTask.description,
                status: this.editingTask.status,
                dueDate: this.editingTask.dueDate, // 👈 Mantener como Date | undefined
                assignedTo: this.editingTask.assignedTo
            };
    
            console.log("📤 Actualizando tarea:", JSON.stringify(taskToUpdate, null, 2));
    
            this.taskService.updateTask(this.editingTask.id, taskToUpdate).subscribe({
                next: (updatedTask: Task) => {
                    console.log("✅ Tarea actualizada:", updatedTask);
                    const index = this.allTasks.findIndex(t => t.id === updatedTask.id);
                    if (index !== -1) {
                        this.allTasks[index] = updatedTask; // Actualiza en la lista completa
                        // Si se estaba mostrando solo una tarea (por ID), actualízala también
                        if (this.selectedTask && this.selectedTask.id === updatedTask.id) {
                            this.selectedTask = updatedTask;
                        } else {
                             this.searchOrFilter(); // Vuelve a aplicar filtro/búsqueda actual
                        }
                    }
                    this.editingTask = null; // Resetea el estado de edición
                },
                error: (error: any) => {
                    console.error("❌ Error al actualizar la tarea:", error);
                     // ✅ Si el backend devuelve un mensaje específico, úsalo
                     if (error?.error?.message) {
                        this.errorMessageEditar = `⚠️ ${error.error.message}`;
                    } else {
                        // ✅ Mensaje genérico si no hay detalles
                        this.errorMessageEditar = '⚠️ No se pudo actualizar la tarea. Verifica el estado.';
                    }
                }
            });
        }
    } 

    // Método para limpiar el mensaje manualmente si es necesario
    clearErrorMessage() {
        this.errorMessageEditar = '';
        this.errorMessageCrear = '';
        this.searchError = '';
    }
 
    //cancelar la edición
    cancelEdit() {
        this.editingTask = null; // Oculta el formulario y limpia el estado
    }

    //Eliminar la tarea
    deleteTask(id: number) { //Ya es number
        this.taskService.deleteTask(id).subscribe({
            next: () => {
                this.allTasks = this.allTasks.filter(task => task.id !== id); // Elimina de la lista completa
                if (this.selectedTask && this.selectedTask.id === id) {
                    this.selectedTask = null; // Limpia si se borró la tarea seleccionada
                }
                this.resetSearch(); // Muestra la lista actualizada
            },
            error: (error: any) => console.error('❌ Error:', error)
        });
    }

    //Asignar la tarea
    assignTask(taskId: number, username: string): void { //Ya es number
        this.taskService.assignTask(taskId, username).subscribe({
            next: (updatedTask: Task) => {
                const index = this.allTasks.findIndex(t => t.id === updatedTask.id);
                if (index > -1) {
                    this.allTasks[index] = updatedTask; // Actualiza en la lista completa
                     if (this.selectedTask && this.selectedTask.id === updatedTask.id) {
                            this.selectedTask = updatedTask;
                        } else {
                             this.searchOrFilter(); // Vuelve a aplicar filtro/búsqueda actual
                        }
                    this.assignUsernames[taskId] = '';
                }
            },
            error: (error: any) => console.error('❌ Error assigning task:', error)
        });
    }

    searchOrFilter() {
        this.selectedTask = null; // Limpia selección previa
        this.searchError = '';    // Limpia error previo
        const term = this.searchTerm.trim();

        if (!term) {
            this.resetSearch(); // Si no hay término, muestra todo
            return;
        }

        // Intenta buscar por ID (si es un número)
        const potentialId = Number(term);
        if (!isNaN(potentialId) && potentialId > 0) {
             console.log(`🔎 Buscando por ID: ${potentialId}`);
             this.taskService.getTaskById(potentialId).subscribe({
                 next: (task) => {
                     console.log('✅ Tarea encontrada por ID:', task);
                     this.selectedTask = task; // Muestra solo esta tarea
                     this.tasks = []; // Oculta la lista principal
                 },
                 error: (error: HttpErrorResponse) => { // Tipado opcional
                    console.error('❌ Error al buscar por ID:', error);
                    if (error.status === 404) {
                         this.searchError = `❌ No se encontró tarea con ID ${potentialId}.`;
                    } else {
                        this.searchError = '❌ Error al buscar la tarea por ID.';
                    }
                    this.tasks = [...this.allTasks]; // Muestra todas si hay error
                 }
             });
        } else {
            // Intenta filtrar por Estado (comparación insensible a mayúsculas)
            const upperTerm = term.toUpperCase();
            const isValidStatus = this.taskStatuses.includes(upperTerm as TaskStatus);

            if (isValidStatus) {
                 console.log(`🔎 Filtrando por Estado: ${upperTerm}`);
                 this.tasks = this.allTasks.filter(task => task.status.toUpperCase() === upperTerm);
                 if (this.tasks.length === 0) {
                     this.searchError = `No hay tareas con el estado "${term}".`;
                 }
            } else {
                // Ni ID válido ni Estado válido
                console.log(`⚠️ Término no reconocido: ${term}`);
                this.searchError = `"${term}" no es un ID válido ni un estado reconocido.`;
                this.tasks = [...this.allTasks]; // Muestra todas
            }
        }
    }

     // Nuevo: Método para mostrar todas las tareas
    resetSearch() {
        this.searchTerm = '';
        this.selectedTask = null;
        this.searchError = '';
        this.tasks = [...this.allTasks]; // Restaura la lista completa
         console.log("🔄 Búsqueda reseteada. Mostrando todas las tareas.");
    }


    // Métodos para manejar el cambio de fecha (¡MUY IMPORTANTE!)
    onDueDateChange(event: any): void {
        this.newTask.dueDate = event ? new Date(event) : new Date();
    }

    onEditDateChange(event: any): void {
        if (this.editingTask) {
            this.editingTask.dueDate = event ? new Date(event) : new Date();
        }
    }

    toggleForm() {
        this.showForm = !this.showForm;
    }

    
}