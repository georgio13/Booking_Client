import {TripDialogComponent} from './trip-dialog.component';
import {CommonModule} from '@angular/common';
import {FormService} from '../../../shared/services/form.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {NgxMaskDirective} from 'ngx-mask';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [TripDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    TranslateModule
  ],
  providers: [FormService]
})
export class TripDialogModule {
}
