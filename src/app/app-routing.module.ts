import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskScreenComponent } from './task-screen/task-screen.component';
import { NewTaskListScreenComponent } from './new-task-list-screen/new-task-list-screen.component';
import { NewTaskScreenComponent } from './new-task-screen/new-task-screen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'task-lists',
    pathMatch: 'full',
  },
  { path: 'task-lists', component: TaskScreenComponent },
  { path: 'task-lists/:taskListId', component: TaskScreenComponent },
  { path: 'new-task-list', component: NewTaskListScreenComponent },
  { path: 'task-lists/:taskListId/new-task', component: NewTaskScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
