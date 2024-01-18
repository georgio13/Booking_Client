import {DatabaseService} from '../../shared/services/database.service';
import {Injectable} from '@angular/core';

@Injectable()
export class BookingService {
  private readonly serviceModel: string;

  constructor(private databaseService: DatabaseService) {
    this.serviceModel = 'booking';
  }

  public async insertBooking(booking: any): Promise<any> {
    try {
      const url = this.databaseService.formatURL(booking, this.serviceModel);
      return await this.databaseService.postRequest({}, url);
    } catch (error) {
      throw error;
    }
  }
}
