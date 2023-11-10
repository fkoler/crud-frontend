import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-screen.component.html',
  styleUrl: './task-screen.component.scss'
})

export class TaskScreenComponent implements OnInit {

  taskLists: any[] = [];
  tasks: any[] = [];

  constructor() { }

  ngOnInit(): void {

  }
}
