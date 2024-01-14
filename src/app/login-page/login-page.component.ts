import {Component} from '@angular/core';
import {LoadingService} from '../shared/services/loading.service';

@Component({
  styleUrls: ['./login-page.component.scss'],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  private section: string;
  public userType: string;

  constructor(private loadingService: LoadingService) {
    this.section = 'login';
    this.loadingService.hide();
  }

  public changeSection(mode: string): void {
    this.section = mode;
  }

  public setButtonColor(section: string): string {
    return this.showSection(section) ? 'var(--swatch3)' : '';
  }

  public showSection(section: string): boolean {
    return this.section === section;
  }

  public showUserType(userType: string): boolean {
    return this.userType === userType;
  }
}
