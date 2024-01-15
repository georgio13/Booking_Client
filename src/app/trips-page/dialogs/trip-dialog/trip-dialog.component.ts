import * as dayjs from 'dayjs';
import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../services/form.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './trip-dialog.component.html'
})
export class TripDialogComponent {
  public formGroup: FormGroup;
  public maximumDate: Date;
  public minimumDate: Date;

  constructor(public formService: FormService,
              private matDialogRef: MatDialogRef<TripDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formGroup = new FormGroup({
      depLocation: new FormControl('', Validators.required),
      destLocation: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      maxNumOfParticipants: new FormControl('', [
        Validators.required,
        Validators.max(2147483647),
        Validators.min(0)
      ]),
      // schedule: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      // travelAgency: new FormControl('', Validators.required)
    });
    this.formGroup.get('endDate').valueChanges.subscribe((value) => {
      this.maximumDate = new Date(dayjs(value).subtract(1, 'day').format('YYYY-MM-DD'));
    });
    this.formGroup.get('startDate').valueChanges.subscribe((value) => {
      this.minimumDate = new Date(dayjs(value).add(1, 'day').format('YYYY-MM-DD'));
    });
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  public isFormInvalid(): boolean {
    return this.formGroup.invalid;
  }

  public submitTrip(): void {
    this.matDialogRef.close(this.formGroup.value);
  }
}
