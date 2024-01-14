import {Component, OnInit} from '@angular/core';
import {LoadingService} from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public loading: boolean;

  constructor(private loadingService: LoadingService) {
    this.loading = false;
  }

  public async ngOnInit(): Promise<any> {
    this.loadingService.events.subscribe((event: any): void => {
      setTimeout(() => {
        this.loading = (event === 'show');
      });
    });
  }
}
