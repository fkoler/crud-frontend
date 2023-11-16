import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-new-task-screen',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    TranslateModule,
  ],
  templateUrl: './new-task-screen.component.html',
  styleUrl: './new-task-screen.component.scss'
})
export class NewTaskScreenComponent implements OnInit {

  taskListId: string = '';

  lang: string = '';

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
    this.lang = localStorage.getItem('lang') || 'en';
  }

  addNewTask(title: string) {
    if (title) {
      this.taskService.createATaskForATaskList(this.taskListId, title)
        .subscribe(
          () => this.router.navigate(['../'], { relativeTo: this.activatedRoute })
        );
    } else {
      if (this.lang == 'en') {
        alert('Title cannot be empty');
      } else if (this.lang == 'de') {
        alert('Der Titel darf nicht leer sein');
      } else {
        alert('Naslov ne može biti prazan');
      }
      return;
    }
  }
}
