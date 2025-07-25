import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFormGroupComponent } from './invoice-form-group.component';

describe('InvoiceFormGroupComponent', () => {
  let component: InvoiceFormGroupComponent;
  let fixture: ComponentFixture<InvoiceFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceFormGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
