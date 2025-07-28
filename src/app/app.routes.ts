import { Routes } from '@angular/router';
import { UploadComponent } from './screens/upload-screen/upload.page';
import { InvoicesDisplayComponent } from './screens/invoices-display/invoices-display.component';
import { InvoiceComponent } from './screens/invoice-details/invoice.page';
import { LandingComponent } from './screens/landing-screen/landing.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'invoices', component: InvoicesDisplayComponent },
  { path: 'invoice-details', component: InvoiceComponent },
];
