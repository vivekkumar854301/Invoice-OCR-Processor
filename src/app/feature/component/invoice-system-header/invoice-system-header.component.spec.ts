import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSystemHeaderComponent } from './invoice-system-header.component';

describe('InvoiceSystemHeaderComponent', () => {
  let component: InvoiceSystemHeaderComponent;
  let fixture: ComponentFixture<InvoiceSystemHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceSystemHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceSystemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
