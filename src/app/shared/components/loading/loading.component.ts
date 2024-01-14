import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading',
  styleUrls: ['./loading.component.scss'],
  templateUrl: 'loading.component.html'
})
export class LoadingComponent {
  @Input() show: boolean;

  constructor() {
  }
}
