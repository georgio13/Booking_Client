import {CommonModule} from '@angular/common';
import {FormService} from '../../../trips-page/services/form.service';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TravelAgencyComponent} from './travel-agency.component';

@NgModule({
  declarations: [TravelAgencyComponent],
  exports: [TravelAgencyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [FormService]
})
export class TravelAgencyModule {
}
