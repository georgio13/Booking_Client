import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from './session-storage.service';
import {environment} from '../../../environments/environment';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly baseURL: string;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private sessionStorageService: SessionStorageService) {
    this.baseURL = `${environment.apiURL}/api`;
  }

  public async deleteRequest(url: string): Promise<any> {
    try {
      return await firstValueFrom(this.httpClient.delete(`${this.baseURL}/${url}`));
    } catch (error) {
      await this.logout(error);
    }
  }

  public formatURL(query: any, url: string): string {
    return `${url}?${new URLSearchParams(query).toString()}`;
  }

  public async getRequest(url: string): Promise<any> {
    try {
      return await firstValueFrom(this.httpClient.get(`${this.baseURL}/${url}`));
    } catch (error) {
      await this.logout(error);
    }
  }

  private async logout(error: any): Promise<any> {
    if (error.status === 401 || error.status === 403) {
      this.sessionStorageService.clear();
      await this.router.navigate(['login']);
    } else {
      throw error;
    }
  }

  public async patchRequest(object: any, url: string): Promise<any> {
    try {
      return await firstValueFrom(this.httpClient.patch(`${this.baseURL}/${url}`, object));
    } catch (error) {
      await this.logout(error);
    }
  }

  public async postRequest(object: any, url: string): Promise<any> {
    try {
      return await firstValueFrom(this.httpClient.post(`${this.baseURL}/${url}`, object));
    } catch (error) {
      await this.logout(error);
    }
  }

  public async putRequest(object: any, url: string): Promise<any> {
    try {
      return await firstValueFrom(this.httpClient.put(`${this.baseURL}/${url}`, object));
    } catch (error) {
      await this.logout(error);
    }
  }
}
