import {DatabaseService} from '../../shared/services/database.service';
import {Injectable} from '@angular/core';

@Injectable()
export class BookingService {
  private readonly serviceModel: string;

  constructor(private databaseService: DatabaseService) {
    this.serviceModel = 'booking';
  }

  public async getBookings(): Promise<any> {
    try {
      return await this.databaseService.getRequest(this.serviceModel);
    } catch (error) {
      throw error;
    }
  }

  public async insertBooking(booking: any): Promise<any> {
    try {
      return await this.databaseService.postRequest(booking, this.serviceModel);
    } catch (error) {
      throw error;
    }
  }
}
