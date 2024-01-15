import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  styleUrls: ['./trip-dialog.component.scss'],
  templateUrl: './trip-dialog.component.html'
})
export class TripDialogComponent {
  public formGroup: FormGroup;

  constructor(private matDialogRef: MatDialogRef<TripDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formGroup = new FormGroup({
      depLocation: new FormControl('', Validators.required),
      destLocation: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      maxNumOfParticipants: new FormControl('', Validators.required),
      schedule: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      travelAgency: new FormControl('', Validators.required)
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
