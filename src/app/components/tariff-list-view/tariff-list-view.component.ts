import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  catchError,
  map,
  merge,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import {
  Region,
  RegionalTariff,
  Tariff,
  tariffFilter,
} from 'src/app/models/tariff.model';
import { ApiService } from 'src/app/services/api.service';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatCellDef,
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog-component.component';

@Component({
  selector: 'app-tariff-list-view',
  templateUrl: './tariff-list-view.component.html',
  styleUrls: ['./tariff-list-view.component.scss'],
})
export class TariffListViewComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() region?: Region;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   *
   * Public members
   */
  public displayedColumns: string[] = [
    'name',
    'upSpeed',
    'downSpeed',
    'benefits',
    'tariffValue',
    'monthlyCancellable',
    'goTariff',
  ];
  public dataSource!: MatTableDataSource<Tariff, MatTableDataSourcePaginator>;
  public isLoadingResults: boolean = true;
  public resultsLength: number = 0;
  public showProgressBars: boolean = true;
  public nameFilter = new FormControl('');
  public upSpeedFilter = new FormControl('');
  public downSpeedFilter = new FormControl('');
  public tariffValueFilter = new FormControl('');

  /**
   *
   * private members
   */
  private tariffSubscription!: Subscription;
  private screenSizeSubscription!: Subscription;
  private sortingSubscription!: Subscription;
  private filterValues: tariffFilter = {
    name: '',
    upSpeed: 0,
    downSpeed: 0,
    tariffValue: 0,
  };

  /**
   *
   * Observable declarations
   */
  private regionSource = new BehaviorSubject<Region | undefined>(undefined);
  public region$ = this.regionSource.asObservable();

  constructor(
    private readonly apiService: ApiService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['region'].currentValue) {
      this.regionSource.next(changes['region'].currentValue);
    }
  }

  public ngOnInit(): void {
    this.nameFilter.valueChanges.subscribe((name) => {
      this.filterValues.name = name ?? '';
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.upSpeedFilter.valueChanges.subscribe((speed) => {
      this.filterValues.upSpeed = Number(speed) ?? 0;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.downSpeedFilter.valueChanges.subscribe((speed) => {
      this.filterValues.downSpeed = Number(speed) ?? 0;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.tariffValueFilter.valueChanges.subscribe((value) => {
      this.filterValues.tariffValue = Number(value) ?? 0;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.subscribeOnScreenSizeUpdates();
  }

  /**
   * subscribe on changes for screen sizes
   * handset hides benefit column
   * desktop displays all columns
   * desktop, Handset
   * @private
   * @memberof TariffListViewComponent
   */
  private subscribeOnScreenSizeUpdates(): void {
    this.screenSizeSubscription = this.breakpointObserver
      .observe([Breakpoints.Web, Breakpoints.Handset])
      .subscribe((size) => {
        const breakpoints = size.breakpoints;
        if (
          breakpoints[Breakpoints.HandsetPortrait] ||
          breakpoints[Breakpoints.HandsetLandscape]
        ) {
          this.displayedColumns = [
            'name',
            'upSpeed',
            'downSpeed',
            'tariffValue',
            'goTariff',
          ];
          this.showProgressBars = false;
        } else if (
          breakpoints[Breakpoints.WebPortrait] ||
          breakpoints[Breakpoints.WebLandscape]
        ) {
          this.displayedColumns = [
            'name',
            'upSpeed',
            'downSpeed',
            'benefits',
            'tariffValue',
            'monthlyCancellable',
            'goTariff',
          ];
          this.showProgressBars = true;
        }
      });
  }

  public ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sortingSubscription = this.sort.sortChange.subscribe(
      () => (this.paginator.pageIndex = 0)
    );

    this.tariffSubscription = merge(this.region$, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const selectedCity =
            this.regionSource.getValue()?.city.toLocaleLowerCase() ?? '';
          return this.apiService
            .getAllRegionalTariffs(selectedCity)
            .pipe(catchError(() => of([])));
        }),
        map((data) => {
          const tariffs = data as RegionalTariff[];
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (tariffs === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = tariffs?.length;
          return tariffs;
        })
      )
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data[0].tariffs);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.createFilter();
      });
  }

  /**
   * Filters all columns with searched string
   *
   * @param {Event} event
   * @memberof TariffListViewComponent
   */
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getMonthlyCancellable(row: Tariff): boolean {
    return row.details.contractTerms.monthlyCancellable;
  }

  /**
   * filters specific column with searched string
   * supported columns => name, upSpeed, downSpeed
   * @return {*}  {(data: any, filter: string) => boolean}
   * @memberof TariffListViewComponent
   */
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = (data: Tariff, filter: any): boolean => {
      let searchTerms = JSON.parse(filter);
      if (searchTerms.name !== '') {
        return data.name.toLowerCase().indexOf(searchTerms.name) !== -1;
      } else if (searchTerms.upSpeed !== 0) {
        return data.upSpeed === searchTerms.upSpeed;
      } else if (searchTerms.downSpeed !== 0) {
        return data.downSpeed === searchTerms.downSpeed;
      } else if (searchTerms.tariffValue !== 0) {
        return data.tariffValue === searchTerms.tariffValue;
      }
      return true;
    };
    return filterFunction;
  }

  goTariffDialog(row: Tariff) {
    const ref: MatDialogRef<DialogComponent> = this.dialog.open(
      DialogComponent,
      {
        data: row,
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
  }

  public ngOnDestroy(): void {
    this.tariffSubscription.unsubscribe();
    this.screenSizeSubscription.unsubscribe();
    this.sortingSubscription.unsubscribe();
  }
}
