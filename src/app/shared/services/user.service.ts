import {DatabaseService} from './database.service';
import {Injectable} from '@angular/core';
import {SessionStorageService} from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly serviceModel: string;

  constructor(private databaseService: DatabaseService,
              private sessionStorageService: SessionStorageService) {
    // this.serviceModel = 'user';
    this.serviceModel = '';
  }

  public async login(user: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(user, `${this.serviceModel}login`);
    } catch (error) {
      throw error;
    }
  }

  public async logout(): Promise<any> {
    try {
      const user = JSON.parse(this.sessionStorageService.getObject('token'));
      return await this.databaseService.postRequest({}, `${this.serviceModel}${user.afm}/logout`);
    } catch (error) {
      throw error;
    }
  }

  public async registerCitizen(user: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(user, `${this.serviceModel}register/citizen`);
    } catch (error) {
      throw error;
    }
  }

  public async registerTravelAgency(user: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(user, `${this.serviceModel}register/travel-agency`);
    } catch (error) {
      throw error;
    }
  }
}
