import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceInfoFormComponent } from './invoice-info-form.component';

describe('InvoiceInfoFormComponent', () => {
  let component: InvoiceInfoFormComponent;
  let fixture: ComponentFixture<InvoiceInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
