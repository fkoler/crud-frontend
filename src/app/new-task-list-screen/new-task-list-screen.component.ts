import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { TaskService } from '../services/task.service';
import TaskListModel from '../models/taskListModel';

@Component({
  selector: 'app-new-task-list-screen',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './new-task-list-screen.component.html',
  styleUrl: './new-task-list-screen.component.scss'
})
export class NewTaskListScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {

  }

  addNewTaskList(title: string) {
    if (title) {
      this.taskService.createATaskList(title)
        .subscribe(
          (newTaskList: TaskListModel) => {
            this.router.navigate(['task-lists', newTaskList._id]);
          }
        );
    } else {
      alert('Title cannot be empty');
      return;
    }
  }
}
