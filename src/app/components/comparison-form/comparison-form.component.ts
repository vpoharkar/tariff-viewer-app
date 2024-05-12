import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Region, country } from 'src/app/models/tariff.model';
import { ApiService } from 'src/app/services/api.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

interface DataError {
  country: boolean;
  city: boolean;
}

export function createCityValueValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    const supportedCities: string[] = ['heidelberg, Mannheim'];
    const isInDatabase = supportedCities.map((city) => {
      const match = city.match(value);
      return match && city === value;
    });

    const cityValid = isInDatabase;

    return !cityValid ? { validCity: true } : null;
  };
}

@Component({
  selector: 'app-comparison-form',
  templateUrl: './comparison-form.component.html',
  styleUrls: ['./comparison-form.component.scss'],
})
export class ComparisonFormComponent implements OnInit {

  /**
   *
   * Public members
   */
  public $countries!: Observable<country[]>;
  public $regions!: Observable<Region[]>;
  public dataError!: DataError;
  public showResultTable: boolean = false;
  public selectedRegion: Region | undefined;
  public countryFormControl = new FormControl('', [Validators.required]);
  public cityFormControl = new FormControl('', [Validators.required]);
  public matcher = new MyErrorStateMatcher();

  constructor(
    private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.$countries = this.apiService.getCountries();
    this.$regions = this.apiService.getRegionDetails();
    this.dataError = { country: false, city: false };
  }

  /**
   * get regional data from user and shows tariff list with those as inputs
   *
   * @param {Region[]} regions
   * @memberof ComparisonFormComponent
   */
  public showResults(regions: Region[]): void {
    const country = this.countryFormControl.value?.toLocaleLowerCase() ?? '';
    const city = this.cityFormControl.value?.toLocaleLowerCase() ?? '';
    if (country !== '' && city !== '') {
      this.dataError = this.checkdataValidation(country, city);

      if (!this.dataError.city && !this.dataError.country) {
        if (regions.findIndex((r) => r.city === city) !== -1) {
          const region = regions.find((r) => r.city === city);
          if (region) {
            // could also store data in localstorage and access in seprate component via routes
            // localStorage.setItem('city', region.city ?? '');
            // localStorage.setItem(
            //   'maxUpSpeedLimit',
            //   region.maxUpSpeedLimit.toString()
            // );
            // localStorage.setItem(
            //   'maxDownSpeedLimit',
            //   region.maxDownSpeedLimit.toString()
            // );
            this.selectedRegion = region;
            this.showResultTable = true;
            this.dataError = { country: false, city: false };
          }
        }
      }
    }
  }

  /**
   * At the moment only following adat is supported
   * country => Germany
   * city => Heidelberg, Mannheim
   * following methods checks the data valiation for above criteria
   * 
   * @private
   * @param {string} country
   * @param {string} city
   * @return {*}  {DataError}
   * @memberof ComparisonFormComponent
   */
  private checkdataValidation(country: string, city: string): DataError {
    return {
      country: !['germany'].includes(country.toLocaleLowerCase()),
      city: !['heidelberg', 'mannheim'].includes(city.toLocaleLowerCase()),
    } as DataError;
  }

  public clearSelection(): void {
    this.cityFormControl.setValue('');
    this.countryFormControl.setValue('');
    this.selectedRegion = undefined;
    this.dataError = { country: false, city: false };
  }
}
