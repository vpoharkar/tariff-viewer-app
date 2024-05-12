import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule,
    MatProgressBarModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    LayoutModule,
    MatListModule,
  ],
  exports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule,
    MatProgressBarModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    LayoutModule,
    MatListModule,
  ],
  declarations: [],
  providers: [],
})
export class MaterialModule {}
