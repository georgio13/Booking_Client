import {LayoutGuard} from '../guards/layout.guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TripsPageComponent} from './trips-page.component';

const routes: Routes = [
  {
    canActivate: [LayoutGuard],
    component: TripsPageComponent,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class TripsPageRoutingModule {
}
