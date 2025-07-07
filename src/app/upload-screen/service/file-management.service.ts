import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retryWhen } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileManagementService {
  private readonly http = inject(HttpClient);
  private baseUrl = 'http://10.3.0.49:8000';

  onUploadInvoice(invoices: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, invoices);
  }

  getAllInvoices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices`);
  }

  getInvoiceDetails(invoiceNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices/number/${invoiceNumber}`);
  }
}
