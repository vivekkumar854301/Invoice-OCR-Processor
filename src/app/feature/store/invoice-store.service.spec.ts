import { TestBed } from '@angular/core/testing';

import { InvoiceStoreService } from './invoice-store.service';

describe('InvoiceStoreService', () => {
  let service: InvoiceStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
