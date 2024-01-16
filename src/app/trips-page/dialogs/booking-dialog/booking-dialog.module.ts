import {BookingDialogComponent} from './booking-dialog.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {NgxMaskDirective} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [BookingDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaskDirective,
    ReactiveFormsModule
  ]
})
export class BookingDialogModule {
}
