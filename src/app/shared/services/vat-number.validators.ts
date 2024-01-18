import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {firstValueFrom} from 'rxjs';

@Injectable()
export class VatNumberValidators {
  constructor(private httpClient: HttpClient) {
  }

  public invalidVatNumber(control: AbstractControl): ValidationErrors | null {
    let multiplier = 2;
    let sum = 0;
    const vatNumber = control.value;
    for (let i = vatNumber.length - 2; i > -1; i--) {
      sum += +vatNumber[i] * multiplier;
      multiplier *= 2;
    }
    const modulo = sum % 11;
    if ((modulo === 10 && vatNumber[vatNumber.length - 1] === '0') ||
      (modulo !== 10 && modulo === +vatNumber[vatNumber.length - 1])) {
      return null;
    } else {
      return {invalidVatNumber: true};
    }
  }

  public uniqueVatNumber(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise(async (resolve) => {
        try {
          await firstValueFrom(this.httpClient.get(`${environment.apiURL}/api/user/${control.value}`));
          resolve({uniqueVatNumber: true});
        } catch (error) {
          resolve(null);
        }
      });
    };
  }
}
