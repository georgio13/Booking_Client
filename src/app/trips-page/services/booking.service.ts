import {DatabaseService} from '../../shared/services/database.service';
import {Injectable} from '@angular/core';
import {UserService} from '../../shared/services/user.service';

@Injectable()
export class BookingService {
  private readonly serviceModel: string;

  constructor(private databaseService: DatabaseService,
              private userService: UserService) {
    this.serviceModel = 'booking';
  }

  public async insertBooking(booking: any): Promise<any> {
    try {
      const user = await this.userService.getMe();
      const url = this.databaseService.formatURL(booking, `${this.serviceModel}/${user.afm}`);
      return await this.databaseService.postRequest({}, url);
    } catch (error) {
      throw error;
    }
  }
}
