import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffListViewComponent } from './tariff-list-view.component';

describe('TariffListViewComponent', () => {
  let component: TariffListViewComponent;
  let fixture: ComponentFixture<TariffListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TariffListViewComponent]
    });
    fixture = TestBed.createComponent(TariffListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
