import {DatabaseService} from './database.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly serviceModel: string;
  private user: any;

  constructor(private databaseService: DatabaseService,
              private router: Router,
              private sessionStorageService: SessionStorageService) {
    this.serviceModel = 'user';
  }

  public async getMe(reload?: boolean): Promise<any> {
    try {
      if (this.user && !reload) {
        return this.user;
      }
      this.user = await this.databaseService.getRequest(`${this.serviceModel}/me`);
      return this.user;
    } catch (error) {
      await this.logoutFunction();
    }
  }

  public async login(user: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(user, `${this.serviceModel}/login`);
    } catch (error) {
      throw error;
    }
  }

  public async logoutFunction(): Promise<any> {
    this.user = null;
    this.sessionStorageService.clear();
    await this.router.navigate(['login']);
  }

  public async registerCitizen(user: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(user, `${this.serviceModel}/registerCitizen`);
    } catch (error) {
      throw error;
    }
  }

  public async registerTravelAgency(user: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(user, `${this.serviceModel}/registerTravelAgency`);
    } catch (error) {
      throw error;
    }
  }
}
