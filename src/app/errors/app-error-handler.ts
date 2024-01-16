import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {LoadingService} from '../shared/services/loading.service';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  private dialogReference: any;

  constructor(private loadingService: LoadingService,
              private matDialog: MatDialog,
              private ngZone: NgZone) {
  }

  handleError(error: any): void {
    console.log(error);
    this.loadingService.hide();
    this.ngZone.run(() => {
      if (!this.dialogReference) {
        this.dialogReference = this.matDialog.open(ErrorDialogComponent);
        this.dialogReference.afterClosed().subscribe((result: any) => {
          if (result) {
            this.dialogReference = null;
          }
        });
      }
    });
  }
}
