import { Routes } from '@angular/router';
import { UploadComponent } from './upload-screen/upload/upload.page';
import { InvoicesDisplayComponent } from './invoices-display-screen/invoices-display/invoices-display.component';
import { InvoiceComponent } from './feature/page/invoice.page';

export const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'display-invoices', component: InvoicesDisplayComponent },
  { path: 'invoice-details', component: InvoiceComponent },
];
