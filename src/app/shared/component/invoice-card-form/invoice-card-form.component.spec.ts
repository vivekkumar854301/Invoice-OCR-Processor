import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCardFormComponent } from './invoice-card-form.component';

describe('InvoiceCardFormComponent', () => {
  let component: InvoiceCardFormComponent;
  let fixture: ComponentFixture<InvoiceCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceCardFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
