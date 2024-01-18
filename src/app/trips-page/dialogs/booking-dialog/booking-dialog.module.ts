import {BookingDialogComponent} from './booking-dialog.component';
import {BookingService} from '../../services/booking.service';
import {CommonModule} from '@angular/common';
import {FormService} from '../../../shared/services/form.service';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {NgxMaskDirective} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';
import {SnackbarService} from '../../services/snackbar.service';

@NgModule({
  declarations: [BookingDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  providers: [
    BookingService,
    FormService,
    SnackbarService
  ]
})
export class BookingDialogModule {
}
