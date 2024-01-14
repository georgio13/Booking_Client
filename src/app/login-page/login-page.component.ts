import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../shared/services/loading.service';
import {Router} from '@angular/router';
import {SessionStorageService} from '../shared/services/session-storage.service';
import {UserService} from '../shared/services/user.service';

@Component({
  styleUrls: ['./login-page.component.scss'],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  public errorMessage: string;
  public hidePassword: boolean;
  public formGroup: FormGroup;

  constructor(private loadingService: LoadingService,
              private router: Router,
              private sessionStorageService: SessionStorageService,
              private userService: UserService) {
    this.hidePassword = true;
    this.formGroup = new FormGroup({
      password: new FormControl('', Validators.required),
      afm: new FormControl('', Validators.required)
    });
    this.loadingService.hide();
  }

  public getPasswordType(): string {
    return this.hidePassword ? 'password' : 'text';
  }

  public getVisibilityIcon(): string {
    return this.hidePassword ? 'icon-visibility_off' : 'icon-visibility';
  }

  public isFormInvalid(): boolean {
    return this.formGroup.invalid;
  }

  public async login(): Promise<any> {
    try {
      this.loadingService.show();
      this.errorMessage = '';
      const loginData = await this.userService.login(this.formGroup.value);
      this.sessionStorageService.setObject('token', loginData.token);
      await this.router.navigate(['trips']);
    } catch (error) {
      this.errorMessage = error?.error?.message;
    } finally {
      this.loadingService.hide();
    }
  }

  public toggleVisibility($event: MouseEvent): void {
    if ($event.button === 0) {
      this.hidePassword = !this.hidePassword;
    }
  }
}
