import {LoginPageComponent} from './login-page.component';
import {LoginPageGuard} from '../guards/login-page.guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    canActivate: [LoginPageGuard],
    component: LoginPageComponent,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class LoginPageRoutingModule {
}
