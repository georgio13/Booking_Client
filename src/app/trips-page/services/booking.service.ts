import {DatabaseService} from '../../shared/services/database.service';
import {Injectable} from '@angular/core';
import {SessionStorageService} from '../../shared/services/session-storage.service';

@Injectable()
export class BookingService {
  private readonly serviceModel: string;

  constructor(private databaseService: DatabaseService,
              private sessionStorageService: SessionStorageService) {
    // this.serviceModel = 'user';
    this.serviceModel = '';
  }

  public async insertBooking(booking: any): Promise<any> {
    try {
      const user = JSON.parse(this.sessionStorageService.getObject('token'));
      const url = this.databaseService.formatURL(booking, `${this.serviceModel}${user.afm}/booking`);
      return await this.databaseService.postRequest({}, url);
    } catch (error) {
      throw error;
    }
  }
}
