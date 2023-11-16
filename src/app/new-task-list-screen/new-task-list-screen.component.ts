import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TaskService } from '../services/task.service';
import TaskListModel from '../models/taskListModel';

@Component({
  selector: 'app-new-task-list-screen',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    TranslateModule,
  ],
  templateUrl: './new-task-list-screen.component.html',
  styleUrl: './new-task-list-screen.component.scss'
})
export class NewTaskListScreenComponent implements OnInit {

  lang: string = '';

  constructor(
    private router: Router,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
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
