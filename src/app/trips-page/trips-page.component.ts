import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../shared/services/loading.service';
import {MatDialog} from '@angular/material/dialog';
import {SessionStorageService} from '../shared/services/session-storage.service';
import {TripDialogComponent} from './dialogs/trip-dialog/trip-dialog.component';
import {TripService} from './services/trip.service';

@Component({
  styleUrls: ['./trips-page.component.scss'],
  templateUrl: './trips-page.component.html'
})
export class TripsPageComponent implements OnInit {
  public displayedColumns: string[];
  public trips: any[];
  private user: any;

  constructor(private loadingService: LoadingService,
              private matDialog: MatDialog,
              private sessionStorageService: SessionStorageService,
              private tripService: TripService) {
    this.displayedColumns = [
      'depLocation',
      'destLocation',
      'startDate',
      'endDate',
      'availableSeats'
    ];
    this.user = JSON.parse(this.sessionStorageService.getObject('token'));
    if (this.showColumn('citizen')) {
      this.displayedColumns.push('travelAgency', 'actions');
    } else if (this.showColumn('travel_agency')) {
      this.displayedColumns.push('bookedSeats', 'maxNumOfParticipants');
    }
  }

  public async ngOnInit(): Promise<any> {
    await this.updateTrips();
  }

  public openBookingDialog(trip: any): void {
    const dialogReference = this.matDialog.open(TripDialogComponent, {
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

  public openTripDialog(): void {
    const dialogReference = this.matDialog.open(TripDialogComponent);
    dialogReference.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.updateTrips();
      }
    });
  }

  public showColumn(role: string): boolean {
    return this.user.role === role;
  }

  private async updateTrips(): Promise<any> {
    this.loadingService.show();
    this.trips = await this.tripService.getTrips();
    this.loadingService.hide();
  }
}
