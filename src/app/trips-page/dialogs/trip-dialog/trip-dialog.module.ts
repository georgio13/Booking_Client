import {CommonModule} from '@angular/common';
import {FormService} from '../../services/form.service';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TripDialogComponent} from './trip-dialog.component';

@NgModule({
  declarations: [TripDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [FormService]
})
export class TripDialogModule {
}
