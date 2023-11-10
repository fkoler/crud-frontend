import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  getAllTaskLists() {
    return this.apiConfigService.get('tasklist');
  }

  createTaskList(title: string) {
    let data = { 'title': title };
    return this.apiConfigService.post('tasklists', data);
  }

  getAllTasksForATaskList(taskListId: string) {
    return this.apiConfigService.get(`tasklists/${taskListId}/tasks`);
  }

  createTaskForATaskList(taskListId: string, title: string) {
    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`, { title });
  }
}
