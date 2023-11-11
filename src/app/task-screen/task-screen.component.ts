import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import TaskListModel from '../models/taskListModel';
import TaskModel from '../models/taskModel';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-screen.component.html',
  styleUrl: './task-screen.component.scss'
})

export class TaskScreenComponent implements OnInit {

  taskLists: TaskListModel[] = [];
  tasks: TaskModel[] = [];
  taskListId: string = '';

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.taskService.getAllTaskLists()
      .subscribe(allTaskLists => {
        this.taskLists = allTaskLists;
        this.router.navigate(['task-lists', this.taskLists[0]['_id']]);
      });

    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.taskListId = params['taskListId'];

        if (this.taskListId) {
          this.taskService.getAllTasksForATaskList(this.taskListId).subscribe(
            (tasks: TaskModel[]) => this.tasks = tasks
          );
        }
      });
  }

  taskClicked(task: TaskModel) {
    this.taskService.updateTaskStatus(this.taskListId, task).subscribe(
      () => task.completed = !task.completed
    );
  }
}
