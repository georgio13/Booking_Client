import {NgModule} from '@angular/core';
import {NotFoundPageComponent} from './errors/not-found-page/not-found-page.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule),
    path: 'login'
  },
  {
    loadChildren: () => import('./trips-page/trips-page.module').then(mod => mod.TripsPageModule),
    path: 'trips'
  },
  {
    component: NotFoundPageComponent,
    path: '**'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {useHash: true})]
})
export class AppRoutingModule {
}
