import { Routes } from '@angular/router';
import { UploadComponent } from './upload-screen/upload/upload.page';
import { InvoicesDisplayComponent } from './invoices-display-screen/invoices-display/invoices-display.component';
import { InvoiceComponent } from './invoice-details-screen/invoice.page';
import { LandingComponent } from './landing-screen/landing.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'invoices', component: InvoicesDisplayComponent },
  { path: 'invoice-details', component: InvoiceComponent },
];
