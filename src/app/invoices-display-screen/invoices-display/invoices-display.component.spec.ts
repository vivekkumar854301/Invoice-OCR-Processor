import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesDisplayComponent } from './invoices-display.component';

describe('InvoicesDisplayComponent', () => {
  let component: InvoicesDisplayComponent;
  let fixture: ComponentFixture<InvoicesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
