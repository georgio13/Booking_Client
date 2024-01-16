import {DatabaseService} from '../../shared/services/database.service';
import {Injectable} from '@angular/core';
import {SessionStorageService} from '../../shared/services/session-storage.service';

@Injectable()
export class TripService {
  private readonly serviceModel: string;

  constructor(private databaseService: DatabaseService,
              private sessionStorageService: SessionStorageService) {
    // this.serviceModel = 'user';
    this.serviceModel = '';
  }

  public async getTravelAgencyTrips(): Promise<any> {
    try {
      const user = JSON.parse(this.sessionStorageService.getObject('token'));
      return await this.databaseService.getRequest(`${this.serviceModel}${user.afm}/mytravelAgencyTrips`);
    } catch (error) {
      throw error;
    }
  }

  public async getTrips(): Promise<any> {
    try {
      return await this.databaseService.getRequest(`${this.serviceModel}trips`);
    } catch (error) {
      throw error;
    }
  }

  public async insertTrip(trip: any): Promise<any> {
    try {
      const user = JSON.parse(this.sessionStorageService.getObject('token'));
      trip.travelAgency = user;
      return await this.databaseService.postRequest(trip, `${this.serviceModel}${user.afm}/addTrip`);
    } catch (error) {
      throw error;
    }
  }

  public async searchTrips(query: any): Promise<any> {
    try {
      const user = JSON.parse(this.sessionStorageService.getObject('token'));
      for (const key in query) {
        if (query[key] === '') {
          delete query[key];
        }
      }
      const url = this.databaseService.formatURL(query, `${this.serviceModel}${user.afm}/search`);
      return await this.databaseService.getRequest(url);
    } catch (error) {
      throw error;
    }
  }
}
