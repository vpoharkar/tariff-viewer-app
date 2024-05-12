import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { TariffListViewComponent } from './components/tariff-list-view/tariff-list-view.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComparisonFormComponent } from './components/comparison-form/comparison-form.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    TariffListViewComponent,
    ComparisonFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    NoopAnimationsModule,
  ],
  exports: [RouterOutlet, RouterModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
