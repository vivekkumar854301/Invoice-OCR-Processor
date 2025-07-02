import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTransportDetailsComponent } from './purchase-transport-details.component';

describe('PurchaseTransportDetailsComponent', () => {
  let component: PurchaseTransportDetailsComponent;
  let fixture: ComponentFixture<PurchaseTransportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseTransportDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseTransportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
