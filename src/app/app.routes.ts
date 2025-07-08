import { Routes } from '@angular/router';
import { UploadComponent } from './upload-screen/upload/upload.page';
import { InvoicesDisplayComponent } from './invoices-display-screen/invoices-display/invoices-display.component';
import { InvoiceComponent } from './feature/page/invoice.page';
import { LandingComponent } from './feature/page/landing/landing.component';

export const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'home', component: LandingComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'invoices', component: InvoicesDisplayComponent },
  { path: 'invoice-details', component: InvoiceComponent },
];
