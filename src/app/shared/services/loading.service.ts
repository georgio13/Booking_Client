import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private spinnerEvents: BehaviorSubject<string>;

  constructor() {
    this.spinnerEvents = new BehaviorSubject<string>('hide');
  }

  get events(): Observable<string> {
    return this.spinnerEvents.asObservable();
  }

  public hide(): void {
    this.spinnerEvents.next('hide');
  }

  public show(): void {
    this.spinnerEvents.next('show');
  }
}
