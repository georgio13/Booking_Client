import {CitizenComponent} from './citizen.component';
import {CommonModule} from '@angular/common';
import {FormService} from '../../../shared/services/form.service';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {NgxMaskDirective} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';
import {VatNumberValidators} from '../../../shared/services/vat-number.validators';

@NgModule({
  declarations: [CitizenComponent],
  exports: [CitizenComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  providers: [
    FormService,
    VatNumberValidators
  ]
})
export class CitizenModule {
}
