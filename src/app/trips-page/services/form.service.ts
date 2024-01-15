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
      case 'confirmPassword':
        if (errors.required) {
          return 'formService.required';
        }
        if (errors.pattern) {
          return 'formService.password';
        }
        if (errors.equalPassword) {
          return 'formService.equalPassword';
        }
        break;
      case 'unequalPassword':
        if (errors.required) {
          return 'formService.required';
        }
        if (errors.pattern || errors.equalPassword) {
          return 'formService.equalPassword';
        }
        break;
      case 'credits':
        if (errors.required) {
          return 'formService.required';
        }
        if (errors.max) {
          return 'formService.maxCredits';
        }
        if (errors.min) {
          return 'formService.minCredits';
        }
        break;
      case 'password':
        if (errors.required) {
          return 'formService.required';
        }
        if (errors.pattern) {
          return 'formService.password';
        }
        break;
      case 'percent':
        if (errors.required) {
          return 'formService.required';
        }
        if (errors.max) {
          return 'formService.maxParticipationPercent';
        }
        if (errors.min) {
          return 'formService.minParticipationPercent';
        }
        break;
      case 'username':
        if (errors.required) {
          return 'formService.required';
        }
        if (errors.pattern) {
          return 'formService.username';
        }
        if (errors.uniqueUsername) {
          return 'formService.uniqueUsername';
        }
        break;
      default:
        if (errors.required) {
          return 'Υποχρεωτικό πεδίο';
        }
        break;
    }
  }
}
