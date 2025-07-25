import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTabFormComponent } from './invoice-tab-form.component';

describe('InvoiceTabFormComponent', () => {
  let component: InvoiceTabFormComponent;
  let fixture: ComponentFixture<InvoiceTabFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceTabFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceTabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
