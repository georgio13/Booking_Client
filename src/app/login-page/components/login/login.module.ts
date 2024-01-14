import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class LoginModule {
}
