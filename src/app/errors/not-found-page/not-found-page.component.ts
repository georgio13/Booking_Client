import {Component} from '@angular/core';
import {LoadingService} from '../../shared/services/loading.service';
import {Router} from '@angular/router';

@Component({
  styleUrls: ['./not-found-page.component.scss'],
  templateUrl: './not-found-page.component.html'
})
export class NotFoundPageComponent {
  constructor(private loadingService: LoadingService,
              private router: Router) {
    this.loadingService.hide();
  }

  public async goHome(): Promise<any> {

  }
}
