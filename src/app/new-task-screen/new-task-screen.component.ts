import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink, RouterOutlet } from '@angular/router';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-new-task-screen',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './new-task-screen.component.html',
  styleUrl: './new-task-screen.component.scss'
})
export class NewTaskScreenComponent implements OnInit {

  taskListId: string = '';

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(
      (params: Params) => this.taskListId = params['taskListId']
    );
  }

  ngOnInit(): void {

  }

  addNewTask(title: string) {
    this.taskService.createATaskForATaskList(this.taskListId, title)
      .subscribe(
        () => this.router.navigate(['../'], { relativeTo: this.activatedRoute })
      );
  }
}
