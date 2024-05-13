import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BonusType, Tariff } from '../models/tariff.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-example-component',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss'],
})
export class DialogComponent {
  message = '';
  public dialogData: Tariff | undefined;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Tariff
  ) {
    this.dialogData = data ? data : undefined;
  }

  public getFinalPayment(): number {
    if (
      this.dialogData &&
      this.dialogData?.details.payment.paymentType === 'MONTHLY'
    ) {
      return this.dialogData?.details.payment.monthlyTariff;
    } else if (
      this.dialogData &&
      this.dialogData?.details.payment.paymentType === 'ONE_TIME'
    ) {
      return this.dialogData?.details.payment.oneTimeTariff ?? 0;
    } else if (
      this.dialogData &&
      this.dialogData?.details.payment.paymentType === 'VARIED'
    ) {
      return this.dialogData?.details.payment.monthlyTariff;
    }
    return 0;
  }
}
