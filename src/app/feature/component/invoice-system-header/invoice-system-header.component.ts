import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgceComponentsModule } from '@clarium/ngce-components';

@Component({
  selector: 'IOP-invoice-system-header',
  imports: [RouterLink, NgceComponentsModule],
  templateUrl: './invoice-system-header.component.html',
  styleUrl: './invoice-system-header.component.scss',
})
export class InvoiceSystemHeaderComponent {
  private readonly router = inject(Router);
  onUploadClick() {
    this.router.navigate(['upload']);
  }
}
