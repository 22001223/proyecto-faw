import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TaskService } from '../../shared/services/task.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html'
})
export class CreateComponent {
  
  formTask: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private taskService: TaskService,
    private router: Router,
    private datePipe: DatePipe) {
      this.formTask = this.formBuilder.group({
        creationUser: new FormControl(this.userService.getLoggedUser()),
        title: new FormControl(''),
        priority: new FormControl(''),
        description: new FormControl(''),
        status: new FormControl('Active'),
        creationDate: new FormControl(this.datePipe.transform(new Date(), 'MM/dd/yyyy HH:mm:ss'))
      });
    }

  onSubmit() {
    this.taskService.addTask(this.formTask.value)
      .then(_ => this.router.navigate(['']))
      .catch(console.error);
  }
}
