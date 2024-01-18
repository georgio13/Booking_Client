import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../../trips-page/services/form.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {UserService} from '../../../shared/services/user.service';
import {VatNumberValidators} from '../../../shared/services/vat-number.validators';

@Component({
  selector: 'app-travel-agency',
  templateUrl: './travel-agency.component.html'
})
export class TravelAgencyComponent {
  public hidePassword: boolean;
  public formGroup: FormGroup;

  constructor(public formService: FormService,
              private loadingService: LoadingService,
              private userService: UserService,
              private vatNumberValidators: VatNumberValidators) {
    this.hidePassword = true;
    this.formGroup = new FormGroup({
      afm: new FormControl('', [
        Validators.minLength(9),
        Validators.required,
        this.vatNumberValidators.invalidVatNumber
      ], this.vatNumberValidators.uniqueVatNumber()),
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
