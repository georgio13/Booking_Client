import {DatabaseService} from './database.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly serviceModel: string;

  constructor(private databaseService: DatabaseService) {
    this.serviceModel = 'user';
  }

  public async login(user: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(user, `${this.serviceModel}/login`);
    } catch (error) {
      throw error;
    }
  }

  public async registerCitizen(user: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(user, `${this.serviceModel}/register/citizen`);
    } catch (error) {
      throw error;
    }
  }

  public async registerTravelAgency(user: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(user, `${this.serviceModel}/register/travel-agency`);
    } catch (error) {
      throw error;
    }
  }
}
