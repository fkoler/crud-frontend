import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskListScreenComponent } from './new-task-list-screen.component';

describe('NewTaskListScreenComponent', () => {
  let component: NewTaskListScreenComponent;
  let fixture: ComponentFixture<NewTaskListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskListScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTaskListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
