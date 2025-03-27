import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/task-status.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class TaskListComponent implements OnInit {

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
    statusFilter: string = '';
    successMessage: string = '';    // ✅ Mensaje de éxito
    errorMessageCrear: string = '';      // ✅ Mensaje de error Crear
    errorMessageEditar: string = '';      // ✅ Mensaje de error Editar
    errorMessageID: string = '';      // ✅ Mensaje de error ID
    


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
                this.tasks = tasks;
            },
            error: (error: any) => {
                console.error('❌ Error al cargar tareas:', error);
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
                this.tasks.push(newTask);
                this.newTask = { id: 0, title: '', description: '', status: TaskStatus.PENDIENTE, dueDate: new Date(), assignedTo: '' };
                
                this.successMessage = '✅ ¡La tarea se creó exitosamente!';
                this.errorMessageCrear = ''; // ✅ Limpia el error si había uno
                setTimeout(() => this.clearSuccessMessage(), 4000); // ✅ Limpia el mensaje después de 4s
            },
            error: (error: any) => {
                console.error("❌ Error al crear la tarea:", error);
                this.errorMessageCrear = '⚠️ No se pudo crear la tarea. Inténtalo de nuevo.';
            }

        });
    }
    
    // Método para limpiar el mensaje de éxito manualmente
    clearSuccessMessage() {
        this.successMessage = '';
    }
    
    
    editTask(task: Task) {
        this.editingTask = { ...task, dueDate: task.dueDate ? new Date(task.dueDate) : undefined }; 
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
                    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
                    if (index !== -1) {
                        this.tasks[index] = { ...updatedTask };
                        this.errorMessageEditar = ''; // ✅ Limpia el mensaje de error si se actualiza
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
        this.errorMessageID = '';
    }
 
    //cancelar la edición
    cancelEdit() {
        this.editingTask = null; // Oculta el formulario y limpia el estado
    }

    //Eliminar la tarea
    deleteTask(id: number) { //Ya es number
        this.taskService.deleteTask(id).subscribe({
            next: () => {
                this.tasks = this.tasks.filter(task => task.id !== id);
            },
            error: (error: any) => console.error('❌ Error:', error)
        });
    }

    //Asignar la tarea
    assignTask(taskId: number, username: string): void { //Ya es number
        this.taskService.assignTask(taskId, username).subscribe({
            next: (updatedTask: Task) => {
                const index = this.tasks.findIndex(t => t.id === updatedTask.id);
                 if (index > -1) {
                    this.tasks[index] = {
                      ...updatedTask,
                      dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate) : undefined
                    };
                }
            },
            error: (error: any) => console.error('❌ Error assigning task:', error)
        });
    }

    // Obtener tarea por ID
    getTaskById(id: number, inputElement: HTMLInputElement) {
        if (isNaN(id) || id <= 0) {
            this.errorMessageID = '⚠️ Ingresa un ID válido.';
            this.selectedTask = null;
            setTimeout(() => this.clearErrorMessage(), 4000);
            return;
        }
    
        this.taskService.getTaskById(id).subscribe({
            next: (task) => {
                this.selectedTask = task;
                console.log('Tarea obtenida:', task);
            },
            error: (error) => {
                console.error('❌ Error al obtener la tarea:', error);
                this.errorMessageID = '⚠️ No se encontró la tarea con el ID proporcionado.';
                this.selectedTask = null;
                setTimeout(() => this.clearErrorMessage(), 4000);
            },
            complete: () => {
                inputElement.value = ''; // ✅ Limpia el input después de la búsqueda
            }
        });
    }

    //cancelar la edición
    clearTaskByID() {
        this.selectedTask = null; // Oculta el formulario y limpia el estado
    }

    // Consultar tareas por status
    getTasksByStatus(status: string) {
        this.taskService.getTasksByStatus(status).subscribe({
            next: (tasks) => {
                console.log(`🟢 Tareas con estado ${status}:`, tasks);
                this.tasks = tasks;
            },
            error: (error) => {
                console.error(`🔴 Error al filtrar por ${status}:`, error);
            }
        });
    }

    filterTasks() {
        if (this.statusFilter) {
            const normalizedStatus = this.statusFilter.toLowerCase(); // O ajusta según sea necesario
            this.getTasksByStatus(normalizedStatus);
        } else {
            this.loadTasks();
        }
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

    showForm: boolean = false;

    toggleForm() {
        this.showForm = !this.showForm;
    }

    
}