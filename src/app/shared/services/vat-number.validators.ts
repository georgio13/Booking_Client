import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

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

  public uniqueVatNumber(vatNumber?: string): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.httpClient.get(`company/vat_number/${control.value}`).toPromise()
            .then((companies: any) => {
              if (vatNumber) {
                if ((companies.length === 1 && companies[0].vat_number === vatNumber) || companies.length === 0) {
                  resolve(null);
                } else {
                  resolve({uniqueVatNumber: true});
                }
              } else if (companies.length > 0) {
                resolve({uniqueVatNumber: true});
              } else {
                resolve(null);
              }
            });
        }, 1000);
      });
    };
  }
}
