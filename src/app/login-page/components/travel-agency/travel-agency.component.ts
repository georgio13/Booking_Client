import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../../../shared/services/loading.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-travel-agency',
  templateUrl: './travel-agency.component.html'
})
export class TravelAgencyComponent {
  public hidePassword: boolean;
  public formGroup: FormGroup;

  constructor(private loadingService: LoadingService,
              private userService: UserService) {
    this.hidePassword = true;
    this.formGroup = new FormGroup({
      afm: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      owner: new FormControl('', Validators.required),
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
    await this.userService.registerTravelAgency(this.formGroup.value);
    this.loadingService.hide();
  }

  public toggleVisibility($event: MouseEvent): void {
    if ($event.button === 0) {
      this.hidePassword = !this.hidePassword;
    }
  }
}
