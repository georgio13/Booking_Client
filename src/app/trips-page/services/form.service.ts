import {FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable()
export class FormService {
  public passwordPattern: string;

  constructor() {
    this.passwordPattern = '^(?=.*[0-9])(?!.* )(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*.]{7,}';
  }

  public isFormFieldValid(formField: string, formGroup: FormGroup): boolean {
    return formGroup.get(formField).touched && formGroup.get(formField).invalid;
  }

  public setErrorMessage(formField: string, formGroup: FormGroup, type?: string): string {
    const errors = formGroup.get(formField).errors;
    switch (type) {
      case 'email':
        if (formGroup.get(formField).errors.required) {
          return 'Υποχρεωτικό πεδίο.';
        }
        if (formGroup.get(formField).errors.email) {
          return 'Λάθος τύπος email.';
        }
        break;
      default:
        if (errors.required) {
          return 'Υποχρεωτικό πεδίο.';
        }
        break;
    }
  }
}
