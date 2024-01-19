import {BookingService} from '../../services/booking.service';
import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../../shared/services/form.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  templateUrl: './booking-dialog.component.html'
})
export class BookingDialogComponent {
  public formGroup: FormGroup;
  public trip: any;

  constructor(private bookingService: BookingService,
              public formService: FormService,
              private loadingService: LoadingService,
              private matDialogRef: MatDialogRef<BookingDialogComponent>,
              private snackbarService: SnackbarService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.trip = this.data.trip;
    this.formGroup = new FormGroup({
      seats: new FormControl('', [
        Validators.required,
        Validators.max(this.trip.availableSeats),
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
    booking.tripID = this.trip.id;
    await this.bookingService.insertBooking(booking);
    this.loadingService.hide();
    this.snackbarService.showSnackbar('Η κράτηση ολοκληρώθηκε με επιτυχία!');
    this.matDialogRef.close('success');
  }
}
