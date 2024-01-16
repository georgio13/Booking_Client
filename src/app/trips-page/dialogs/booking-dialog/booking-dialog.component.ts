import {BookingService} from '../../services/booking.service';
import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../services/form.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './booking-dialog.component.html'
})
export class BookingDialogComponent {
  public formGroup: FormGroup;

  constructor(private bookingService: BookingService,
              public formService: FormService,
              private loadingService: LoadingService,
              private matDialogRef: MatDialogRef<BookingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formGroup = new FormGroup({
      numOfPeopleBooked: new FormControl('', [
        Validators.required,
        Validators.max(2147483647),
        Validators.min(0)
      ])
    });
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  public isFormInvalid(): boolean {
    return this.formGroup.invalid;
  }

  public async submitBooking(): Promise<any> {
    this.loadingService.show();
    let booking = this.formGroup.value;
    booking.tripID = this.data.trip.id;
    await this.bookingService.insertBooking(booking);
    this.loadingService.hide();
    this.matDialogRef.close('success');
  }
}
