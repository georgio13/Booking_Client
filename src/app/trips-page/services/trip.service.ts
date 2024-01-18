import * as dayjs from 'dayjs';
import {DatabaseService} from '../../shared/services/database.service';
import {Injectable} from '@angular/core';

@Injectable()
export class TripService {
  private readonly serviceModel: string;

  constructor(private databaseService: DatabaseService) {
    this.serviceModel = 'trip';
  }

  public async getTravelAgencyTrips(): Promise<any> {
    try {
      return await this.databaseService.getRequest(`${this.serviceModel}/travelAgencyTrips`);
    } catch (error) {
      throw error;
    }
  }

  public async getTrips(): Promise<any> {
    try {
      return await this.databaseService.getRequest(`${this.serviceModel}/trips`);
    } catch (error) {
      throw error;
    }
  }

  public async insertTrip(trip: any): Promise<any> {
    try {
      trip.endDate = dayjs(trip.endDate).format('YYYY-MM-DD');
      trip.startDate = dayjs(trip.startDate).format('YYYY-MM-DD');
      return await this.databaseService.postRequest(trip, `${this.serviceModel}/addTrip`);
    } catch (error) {
      throw error;
    }
  }

  public async searchTrips(query: any): Promise<any> {
    try {
      for (const key in query) {
        if (query[key] === '') {
          delete query[key];
        }
      }
      const url = this.databaseService.formatURL(query, `${this.serviceModel}/search`);
      return await this.databaseService.getRequest(url);
    } catch (error) {
      throw error;
    }
  }
}
