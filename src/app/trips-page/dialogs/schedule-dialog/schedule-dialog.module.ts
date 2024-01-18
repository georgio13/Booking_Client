import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';
import {ScheduleDialogComponent} from './schedule-dialog.component';

@NgModule({
  declarations: [ScheduleDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ScheduleDialogModule {
}
