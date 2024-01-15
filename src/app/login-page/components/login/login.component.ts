import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingService} from '../../../shared/services/loading.service';
import {SessionStorageService} from '../../../shared/services/session-storage.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent {
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
    this.loadingService.show();
    this.errorMessage = '';
    const loginData = await this.userService.login(this.formGroup.value);
    if (loginData) {
      this.sessionStorageService.setObject('token', JSON.stringify(loginData));
      await this.router.navigate(['trips']);
    } else {
      this.errorMessage = 'Δεν υπάρχει ο χρήστης';
    }
    this.loadingService.hide();
  }

  public toggleVisibility($event: MouseEvent): void {
    if ($event.button === 0) {
      this.hidePassword = !this.hidePassword;
    }
  }
}
