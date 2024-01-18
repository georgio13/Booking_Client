import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {SessionStorageService} from '../../../shared/services/session-storage.service';

@Component({
  templateUrl: './logout-dialog.component.html'
})
export class LogoutDialogComponent {

  constructor(private matDialogRef: MatDialogRef<LogoutDialogComponent>,
              private router: Router,
              private sessionStorageService: SessionStorageService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  public async logout(): Promise<any> {
    this.sessionStorageService.clear();
    this.matDialogRef.close();
    await this.router.navigate(['login']);
  }
}
