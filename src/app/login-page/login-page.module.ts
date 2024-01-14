import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginModule} from './components/login/login.module';
import {LoginPageComponent} from './login-page.component';
import {LoginPageGuard} from '../guards/login-page.guard';
import {LoginPageRoutingModule} from './login-page-routing.module';
import {MaterialModule} from '../shared/material.module';
import {NgModule} from '@angular/core';
import {CitizenModule} from './components/citizen/citizen.module';
import {TravelAgencyModule} from './components/travel-agency/travel-agency.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginModule,
    LoginPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CitizenModule,
    TravelAgencyModule
  ],
  providers: [LoginPageGuard]
})
export class LoginPageModule {
}
