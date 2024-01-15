import {CitizenComponent} from './citizen.component';
import {CommonModule} from '@angular/common';
import {FormService} from '../../../trips-page/services/form.service';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CitizenComponent],
  exports: [CitizenComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [FormService]
})
export class CitizenModule {
}
