import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsSummaryComponent } from './totals-summary.component';

describe('TotalsSummaryComponent', () => {
  let component: TotalsSummaryComponent;
  let fixture: ComponentFixture<TotalsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalsSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
