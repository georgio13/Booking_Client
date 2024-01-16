import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {SessionStorageService} from '../../../shared/services/session-storage.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  templateUrl: './logout-dialog.component.html'
})
export class LogoutDialogComponent {
  public formGroup: FormGroup;

  constructor(private matDialogRef: MatDialogRef<LogoutDialogComponent>,
              private router: Router,
              private sessionStorageService: SessionStorageService,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formGroup = new FormGroup({
      numOfPeopleBooked: new FormControl('', [
        Validators.required,
        Validators.max(2147483647),
        Validators.min(0)
      ])
    });
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  public async logout(): Promise<any> {
    await this.userService.logout();
    this.sessionStorageService.clear();
    this.matDialogRef.close();
    await this.router.navigate(['login']);
  }
}
