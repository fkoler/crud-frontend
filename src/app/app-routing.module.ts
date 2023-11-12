import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskScreenComponent } from './task-screen/task-screen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'task-lists',
    pathMatch: 'full',
  },
  { path: 'task-lists', component: TaskScreenComponent },
  { path: 'task-lists/:taskListId', component: TaskScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
