import {CitizenComponent} from './citizen.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CitizenComponent],
  exports: [
    CitizenComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CitizenModule {
}
