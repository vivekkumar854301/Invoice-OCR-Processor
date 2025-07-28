import { Routes } from '@angular/router';
import { UploadComponent } from './screens/upload-screen/upload.page';
import { InvoicesDisplayComponent } from './screens/invoices-display-screen/invoices-display.page';
import { InvoiceComponent } from './screens/invoice-details-screen/invoice.page';
import { LandingComponent } from './screens/landing-screen/landing.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'invoices', component: InvoicesDisplayComponent },
  { path: 'invoice-details', component: InvoiceComponent },
];
