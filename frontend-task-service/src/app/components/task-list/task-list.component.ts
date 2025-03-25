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
            },
            error: (error: any) => {
                console.error("❌ Error al crear la tarea:", error);
            }
        });
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
                    }
                    this.editingTask = null; // Resetea el estado de edición
                },
                error: (error: any) => {
                    console.error("❌ Error al actualizar la tarea:", error);
                }
            });
        }
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
    getTaskById(id: number) {
        this.taskService.getTaskById(id).subscribe((task) => {
        this.selectedTask = task;
        console.log('Tarea obtenida:', task);
        });
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

    // task-list.component.ts
    showForm: boolean = false;

    toggleForm() {
        this.showForm = !this.showForm;
    }

    
}