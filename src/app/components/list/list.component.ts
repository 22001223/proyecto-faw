import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../../shared/models/task.model';
import { TaskService } from '../../shared/services/task.service';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { UserService } from '../../shared/services/user.service';
import { SearchParams } from '../../shared/models/search-params.model';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SearchComponent, TimeAgoPipe],
  templateUrl: './list.component.html'
})
export class ListComponent {
  @Input({required: true}) searchParams!: SearchParams;
  tasks = <Task[]>([]);
  activeImage = 'url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E")';
  finalizedImage = 'url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E")';

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.checkLoggedUser();
    this.getTasks();
  }

  ngOnChanges() { 
    this.userService.checkLoggedUser();
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks( this.userService.getLoggedUser(), this.searchParams )
      .subscribe((tasks) => this.tasks = tasks);
  }

  onSearchParamsChange(newSearchParams: SearchParams) {
    this.searchParams = newSearchParams;
    this.getTasks();
  }

  changeStatus(task: Task) {
    task.status = task.status === 'Active' ? 'Finalized' : 'Active';
    this.taskService.updateStatusTask({...task})
      .then(_ => this.router.navigate(['']))
      .catch(console.error);
  }

}
