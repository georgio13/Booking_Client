import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page.component';
import {LoginPageGuard} from '../guards/login-page.guard';
import {LoginPageRoutingModule} from './login-page-routing.module';
import {MaterialModule} from '../shared/material.module';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [LoginPageGuard]
})
export class LoginPageModule {
}
