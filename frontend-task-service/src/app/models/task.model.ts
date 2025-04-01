import { TaskStatus } from './task-status.enum';

export interface Task {
    id: number; //  ¡Sin el signo de interrogación!  Obligatorio.
    title: string;
    description: string;
    status: TaskStatus;
    dueDate?: Date;
    assignedTo: string;
}