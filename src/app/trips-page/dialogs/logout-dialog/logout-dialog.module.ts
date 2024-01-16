import {CommonModule} from '@angular/common';
import {LogoutDialogComponent} from './logout-dialog.component';
import {MaterialModule} from '../../../shared/material.module';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [LogoutDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class LogoutDialogModule {
}
