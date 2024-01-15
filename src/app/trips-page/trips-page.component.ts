import {Component, OnInit} from '@angular/core';
import {TripService} from './services/trip.service';
import {MatDialog} from '@angular/material/dialog';
import {TripDialogComponent} from './dialogs/trip-dialog/trip-dialog.component';

@Component({
  templateUrl: './trips-page.component.html'
})
export class TripsPageComponent implements OnInit {
  public displayedColumns: string[];
  public trips: any[];

  constructor(private matDialog: MatDialog,
              private tripService: TripService) {
    this.displayedColumns = [
      'availableSeats',
      'bookedSeats',
      'depLocation',
      'destLocation',
      'endDate',
      'maxNumOfParticipants',
      'startDate',
      'travelAgency'
    ];
  }

  public async ngOnInit(): Promise<any> {
    this.trips = await this.tripService.getTrips();
  }

  public openTripDialog(): void {
    const dialogReference = this.matDialog.open(TripDialogComponent);
    dialogReference.afterOpened().subscribe(async (result: any): Promise<any> => {
      if (result) {
        this.trips = await this.tripService.getTrips();
      }
    });
  }
}
