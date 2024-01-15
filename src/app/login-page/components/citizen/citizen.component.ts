import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../../trips-page/services/form.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-citizen',
  templateUrl: './citizen.component.html'
})
export class CitizenComponent {
  public hidePassword: boolean;
  public formGroup: FormGroup;

  constructor(public formService: FormService,
              private loadingService: LoadingService,
              private userService: UserService) {
    this.hidePassword = true;
    this.formGroup = new FormGroup({
      afm: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
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

  public async register(): Promise<any> {
    this.loadingService.show();
    await this.userService.registerCitizen(this.formGroup.value);
    this.loadingService.hide();
  }

  public toggleVisibility($event: MouseEvent): void {
    if ($event.button === 0) {
      this.hidePassword = !this.hidePassword;
    }
  }
}
