import {Component, OnInit} from '@angular/core';
import {TripService} from './services/trip.service';

@Component({
  templateUrl: './trips-page.component.html'
})
export class TripsPageComponent implements OnInit {
  public displayedColumns: string[];
  public trips: any[];

  constructor(private tripService: TripService) {
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
}
