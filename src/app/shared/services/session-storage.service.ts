import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private sessionStorage: Storage;

  constructor() {
    this.sessionStorage = window.sessionStorage;
  }

  public clear(): any {
    this.sessionStorage.clear();
  }

  public getObject(key: string): any {
    const value = this.sessionStorage.getItem(key);
    return JSON.parse(value);
  }

  public setObject(key: string, value: any): void {
    this.sessionStorage.setItem(key, JSON.stringify(value));
  }
}
