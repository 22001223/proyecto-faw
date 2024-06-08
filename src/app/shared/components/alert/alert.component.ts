import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input({required: true}) title: string = 'Alert';
  @Input({required: true}) message: string = 'Message';
  @Input({required: true}) show: boolean = false;

  constructor() { }

}
