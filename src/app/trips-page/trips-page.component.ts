import * as dayjs from 'dayjs';
import {BookingDialogComponent} from './dialogs/booking-dialog/booking-dialog.component';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoadingService} from '../shared/services/loading.service';
import {LogoutDialogComponent} from './dialogs/logout-dialog/logout-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ScheduleDialogComponent} from './dialogs/schedule-dialog/schedule-dialog.component';
import {TripDialogComponent} from './dialogs/trip-dialog/trip-dialog.component';
import {TripService} from './services/trip.service';
import {UserService} from '../shared/services/user.service';

@Component({
  styleUrls: ['./trips-page.component.scss'],
  templateUrl: './trips-page.component.html'
})
export class TripsPageComponent implements OnInit {
  public displayedColumns: string[];
  public formGroup: FormGroup;
  public maximumDate: Date;
  public minimumDate: Date;
  public trips: any[];
  public user: any;

  constructor(private loadingService: LoadingService,
              private matDialog: MatDialog,
              private tripService: TripService,
              private userService: UserService) {
    this.displayedColumns = [
      'departureLocation',
      'destinationLocation',
      'startDate',
      'endDate',
      'availableSeats'
    ];
    this.formGroup = new FormGroup({
      departureLocation: new FormControl(''),
      destinationLocation: new FormControl(''),
      endDate: new FormControl(''),
      startDate: new FormControl('')
    });
    this.formGroup.get('endDate').valueChanges.subscribe((value) => {
      setTimeout(() => {
        this.maximumDate = new Date(dayjs(value).subtract(1, 'day').format('YYYY-MM-DD'));
      }, 0);
    });
    this.formGroup.get('startDate').valueChanges.subscribe((value) => {
      this.minimumDate = new Date(dayjs(value).add(1, 'day').format('YYYY-MM-DD'));
    });
  }

  public async ngOnInit(): Promise<any> {
    this.user = await this.userService.getMe();
    if (this.showColumn('citizen')) {
      this.displayedColumns.push('travelAgency', 'actions');
    } else if (this.showColumn('travel_agency')) {
      this.displayedColumns.push('bookedSeats', 'maximumSeats');
    }
    await this.updateTrips();
  }

  public disableBookingButton(trip: any): boolean {
    return trip.availableSeats === 0 || dayjs(trip.startDate).isBefore(dayjs());
  }

  public openBookingDialog(trip: any): void {
    const dialogReference = this.matDialog.open(BookingDialogComponent, {
      data: {
        trip
      }
    });
    dialogReference.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.updateTrips();
      }
    });
  }

  public async openLogoutDialog(): Promise<any> {
    this.matDialog.open(LogoutDialogComponent);
  }

  public openScheduleDialog(trip: any): void {
    this.matDialog.open(ScheduleDialogComponent, {
      data: {
        trip
      }
    });
  }

  public openTripDialog(): void {
    const dialogReference = this.matDialog.open(TripDialogComponent);
    dialogReference.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.updateTrips();
      }
    });
  }

  public async searchTrips(): Promise<any> {
    this.loadingService.show();
    this.trips = await this.tripService.searchTrips(this.formGroup.value);
    this.loadingService.hide();
  }

  public showColumn(role: string): boolean {
    return this.user?.userType === role;
  }

  private async updateTrips(): Promise<any> {
    this.loadingService.show();
    this.trips = await this.tripService.getTrips();
    this.loadingService.hide();
  }
}
