import * as dayjs from 'dayjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../../shared/services/form.service';
import {LoadingService} from '../../../shared/services/loading.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../services/snackbar.service';
import {TripService} from '../../services/trip.service';

@Component({
  styleUrls: ['./trip-dialog.component.scss'],
  templateUrl: './trip-dialog.component.html'
})
export class TripDialogComponent {
  public formGroup: FormGroup;
  public editor: any;
  public maximumDate: Date;
  public minimumEndDate: Date;
  public minimumStartDate: Date;

  constructor(public formService: FormService,
              private loadingService: LoadingService,
              private matDialogRef: MatDialogRef<TripDialogComponent>,
              private snackbarService: SnackbarService,
              private tripService: TripService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editor = ClassicEditor;
    this.formGroup = new FormGroup({
      depLocation: new FormControl('', Validators.required),
      destLocation: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      maxNumOfParticipants: new FormControl('', [
        Validators.required,
        Validators.max(2147483647),
        Validators.min(0)
      ]),
      schedule: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required)
    });
    this.formGroup.get('endDate').valueChanges.subscribe((value) => {
      setTimeout(() => {
        this.maximumDate = new Date(dayjs(value).subtract(1, 'day').format('YYYY-MM-DD'));
      }, 0);
    });
    this.formGroup.get('startDate').valueChanges.subscribe((value) => {
      this.minimumEndDate = new Date(dayjs(value).add(1, 'day').format('YYYY-MM-DD'));
    });
    this.minimumStartDate = new Date(dayjs().add(1, 'day').format('YYYY-MM-DD'));
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  public isFormInvalid(): boolean {
    return this.formGroup.invalid;
  }

  public async submitTrip(): Promise<any> {
    this.loadingService.show();
    await this.tripService.insertTrip(this.formGroup.value);
    this.loadingService.hide();
    this.snackbarService.showSnackbar('Η εκδρομή καταχωρήθηκε με επιτυχία!');
    this.matDialogRef.close('success');
  }
}
