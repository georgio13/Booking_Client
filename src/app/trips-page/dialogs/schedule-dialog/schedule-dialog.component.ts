import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {scheduleArray} from 'rxjs/internal/scheduled/scheduleArray';

@Component({
  templateUrl: './schedule-dialog.component.html'
})
export class ScheduleDialogComponent {

  constructor(private matDialogRef: MatDialogRef<ScheduleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  protected readonly scheduleArray = scheduleArray;
}
