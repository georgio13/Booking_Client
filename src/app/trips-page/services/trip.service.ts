import {DatabaseService} from '../../shared/services/database.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from '../../shared/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private readonly serviceModel: string;
  private user: any;

  constructor(private databaseService: DatabaseService,
              private router: Router,
              private sessionStorageService: SessionStorageService) {
    // this.serviceModel = 'user';
    this.serviceModel = '';
  }

  public async getTrips(): Promise<any> {
    try {
      const user = JSON.parse(this.sessionStorageService.getObject('token'));
      return await this.databaseService.getRequest(`${this.serviceModel}${user.afm}/mytravelAgencyTrips`);
    } catch (error) {
      throw error;
    }
  }
}
