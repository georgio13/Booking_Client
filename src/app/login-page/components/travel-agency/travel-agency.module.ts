import {CommonModule} from '@angular/common';
import {FormService} from '../../../trips-page/services/form.service';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {NgxMaskDirective} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';
import {TravelAgencyComponent} from './travel-agency.component';
import {VatNumberValidators} from '../../../shared/services/vat-number.validators';

@NgModule({
  declarations: [TravelAgencyComponent],
  exports: [TravelAgencyComponent],
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
export class TravelAgencyModule {
}
