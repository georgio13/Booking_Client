import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SessionStorageService} from '../shared/services/session-storage.service';

@Injectable()
export class LayoutGuard implements CanActivate {
  constructor(private router: Router,
              private sessionStorageService: SessionStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.sessionStorageService.getObject('token');
    if (token) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
