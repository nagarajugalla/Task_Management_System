import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  addTask(task: Task) {
    this.tasks.push(task);
  }

  updateTaskStatus(taskId: number, completed: boolean) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = completed;
    }
  }
  getTasks(filterCompleted: boolean): Task[] {
    if (filterCompleted === undefined) {
      return this.tasks;
    } else {
      return this.tasks.filter(task => task.status === filterCompleted);
    }
  }
}
