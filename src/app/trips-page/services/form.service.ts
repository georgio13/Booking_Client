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
        if (errors.required) {
          return 'Υποχρεωτικό πεδίο.';
        }
        if (errors.email) {
          return 'Λάθος τύπος email.';
        }
        break;
      case 'integer':
        if (errors.required) {
          return 'Υποχρεωτικό πεδίο.';
        }
        if (errors.max) {
          return 'Πρέπει να είναι μικρότερο από 2.147.483.647.';
        }
        if (errors.min) {
          return 'Πρέπει να είναι μεγαλύτερο από 0.';
        }
        break;
      case 'vatNumber':
        if (errors.required) {
          return 'Υποχρεωτικό πεδίο.';
        }
        if (errors.minlength) {
          return 'Συμπληρώστε 9 ψηφία.';
        }
        if (errors.invalidVatNumber) {
          return 'Λάθος μορφή Α.Φ.Μ..';
        }
        if (errors.uniqueVatNumber) {
          return 'Υπάρχει εταιρεία με το ίδιο Α.Φ.Μ..';
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
