import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiConfigService } from './api-config.service';
import TaskModel from '../models/taskModel';
import TaskListModel from '../models/taskListModel';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  getAllTaskLists(): Observable<TaskListModel[]> {
    return this.apiConfigService.getTaskLists('tasklists');
  }

  getAllTasks(taskListId: string): Observable<TaskModel[]> {
    return this.apiConfigService.getTasks(`tasklists/${taskListId}`);
  }

  createATaskList(title: string) {
    let data = { 'title': title };
    return this.apiConfigService.post('tasklists', data);
  }

  getAllTasksForATaskList(taskListId: string) {
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  createATaskForATaskList(taskListId: string, title: string) {
    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`, { title });
  }

  deleteATaskList(taskListId: string) {
    return this.apiConfigService.delete(`tasklists/${taskListId}`);
  }

  deleteATaskForATaskList(taskListId: string, taskId: string) {
    return this.apiConfigService.delete(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  updateTaskStatus(taskListId: string, taskObject: TaskModel) {
    let updateData = { 'completed': !taskObject.completed };
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`, updateData);
  }
}