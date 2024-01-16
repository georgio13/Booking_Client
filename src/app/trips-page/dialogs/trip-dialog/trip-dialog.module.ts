import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CommonModule} from '@angular/common';
import {FormService} from '../../services/form.service';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {NgxMaskDirective} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';
import {SnackbarService} from '../../services/snackbar.service';
import {TripDialogComponent} from './trip-dialog.component';
import {TripService} from '../../services/trip.service';

@NgModule({
  declarations: [TripDialogComponent],
  imports: [
    CKEditorModule,
    CommonModule,
    MaterialModule,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  providers: [
    FormService,
    SnackbarService,
    TripService
  ]
})
export class TripDialogModule {
}
