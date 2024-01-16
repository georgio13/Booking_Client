import {BookingDialogModule} from './dialogs/booking-dialog/booking-dialog.module';
import {CommonModule} from '@angular/common';
import {LayoutGuard} from '../guards/layout.guard';
import {MaterialModule} from '../shared/material.module';
import {NgModule} from '@angular/core';
import {TripDialogModule} from './dialogs/trip-dialog/trip-dialog.module';
import {TripsPageComponent} from './trips-page.component';
import {TripsPageRoutingModule} from './trips-page-routing.module';

@NgModule({
  declarations: [TripsPageComponent],
  imports: [
    BookingDialogModule,
    CommonModule,
    MaterialModule,
    TripDialogModule,
    TripsPageRoutingModule
  ],
  providers: [LayoutGuard]
})
export class TripsPageModule {
}
