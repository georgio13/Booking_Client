import {Component, Inject, OnInit} from '@angular/core';
import {LoadingService} from '../../shared/services/loading.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent implements OnInit {
  public message: string;

  constructor(private loadingService: LoadingService,
              private matDialogRef: MatDialogRef<ErrorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = this.data?.message ? this.data?.message : 'Παρουσιάστηκε σφάλμα κατά την εκτέλεση της ενέργειας.';
    this.loadingService.hide();
  }

  public ngOnInit(): void {
    this.matDialogRef.disableClose = true;
  }

  public closeDialog(): void {
    this.matDialogRef.close('success');
  }
}
