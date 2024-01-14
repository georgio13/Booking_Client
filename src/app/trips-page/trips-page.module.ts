import {CommonModule} from '@angular/common';
import {LayoutGuard} from '../guards/layout.guard';
import {MaterialModule} from '../shared/material.module';
import {NgModule} from '@angular/core';
import {TripsPageComponent} from './trips-page.component';
import {TripsPageRoutingModule} from './trips-page-routing.module';

@NgModule({
  declarations: [TripsPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TripsPageRoutingModule
  ],
  providers: [LayoutGuard]
})
export class TripsPageModule {
}
