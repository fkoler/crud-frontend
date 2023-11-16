import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import TaskListModel from '../models/taskListModel';
import TaskModel from '../models/taskModel';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-screen',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    TranslateModule,
  ],
  templateUrl: './task-screen.component.html',
  styleUrl: './task-screen.component.scss'
})

export class TaskScreenComponent implements OnInit {

  taskLists: TaskListModel[] = [];
  tasks: TaskModel[] = [];
  taskListId: string = '';

  lang: string = '';

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.taskService.getAllTaskLists()
      .subscribe(allTaskLists => {
        this.taskLists = allTaskLists;
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

    this.lang = localStorage.getItem('lang') || 'en';
  }

  taskClicked(task: TaskModel) {
    this.taskService.updateTaskStatus(this.taskListId, task).subscribe(
      () => task.completed = !task.completed
    );
  }

  deleteTask(task: TaskModel) {
    this.taskService.deleteATaskForATaskList(this.taskListId, task._id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(
          tsk => tsk._id != task._id
        )
      });
  }

  deleteTaskList(taskListClicked: TaskListModel) {
    this.taskService.deleteATaskList(taskListClicked._id)
      .subscribe(() => {
        this.taskLists = this.taskLists.filter(
          tskLst => tskLst._id != taskListClicked._id
        );
        this.router.navigate(['/task-lists']);
      });
  }

  addNewTask() {
    if (this.taskListId) {
      this.router.navigate(['./new-task'], { relativeTo: this.activatedRoute })
    } else {
      if (this.lang == 'en') {
        alert('Please select a Task List or create a New Task List');
      } else if (this.lang == 'de') {
        alert('Bitte wählen Sie eine Aufgabenliste aus oder erstellen Sie eine neue Aufgabenliste');
      } else {
        alert('Izaberite listu zadataka ili kreirajte novu listu zadataka');
      }
      return;
    }
  }

  changeLang(lang: any) {
    this.lang = lang.target.value;

    localStorage.setItem('lang', this.lang);

    this.translateService.use(this.lang);
  }
}
