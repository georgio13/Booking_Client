import * as dayjs from 'dayjs';
import {BookingDialogComponent} from './dialogs/booking-dialog/booking-dialog.component';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoadingService} from '../shared/services/loading.service';
import {LogoutDialogComponent} from './dialogs/logout-dialog/logout-dialog.component';
import {MatDialog} from '@angular/material/dialog';
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
      'depLocation',
      'destLocation',
      'startDate',
      'endDate',
      'availableSeats'
    ];
    this.formGroup = new FormGroup({
      depLoc: new FormControl(''),
      destLoc: new FormControl(''),
      enddt: new FormControl(''),
      startdt: new FormControl('')
    });
    this.formGroup.get('enddt').valueChanges.subscribe((value) => {
      setTimeout(() => {
        this.maximumDate = new Date(dayjs(value).subtract(1, 'day').format('YYYY-MM-DD'));
      }, 0);
    });
    this.formGroup.get('startdt').valueChanges.subscribe((value) => {
      this.minimumDate = new Date(dayjs(value).add(1, 'day').format('YYYY-MM-DD'));
    });
  }

  public async ngOnInit(): Promise<any> {
    this.user = await this.userService.getMe();
    if (this.showColumn('citizen')) {
      this.displayedColumns.push('travelAgency', 'actions');
    } else if (this.showColumn('travel_agency')) {
      this.displayedColumns.push('bookedSeats', 'maxNumOfParticipants');
    }
    await this.updateTrips();
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
    if (this.showColumn('citizen')) {
      this.trips = await this.tripService.getTrips();
    } else {
      this.trips = await this.tripService.getTravelAgencyTrips();
    }
    this.loadingService.hide();
  }
}
