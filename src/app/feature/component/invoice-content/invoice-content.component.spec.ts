import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceContentComponent } from './invoice-content.component';

describe('InvoiceContentComponent', () => {
  let component: InvoiceContentComponent;
  let fixture: ComponentFixture<InvoiceContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
