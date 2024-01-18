import {DatabaseService} from './database.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly serviceModel: string;
  private user: any;

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

  public async getMe(): Promise<any> {
    try {
      if (this.user) {
        return this.user;
      }
      this.user = await this.databaseService.getRequest(`${this.serviceModel}/me`);
      return this.user;
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

  public resetUser(): void {
    this.user = null;
  }

  public async registerTravelAgency(user: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(user, `${this.serviceModel}/register/travel-agency`);
    } catch (error) {
      throw error;
    }
  }
}
