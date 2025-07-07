import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgceComponentsModule } from '@clarium/ngce-components';

import { NgceIconModule } from '@clarium/ngce-icon';
import { FileManagementService } from '../../upload-screen/service/file-management.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'IOP-invoices-display',
  imports: [NgceComponentsModule, NgceIconModule, CommonModule],
  providers: [FileManagementService],
  templateUrl: './invoices-display.component.html',
  styleUrl: './invoices-display.component.scss',
})
export class InvoicesDisplayComponent implements OnInit {
  private readonly router = inject(Router);
  fileManangementService = inject(FileManagementService);
  apiResponse!: any;
  customStyles = {
    width: '10rem',
    height: '10rem',
    border: '1px solid grey',
  };

  ngOnInit(): void {
    this.fileManangementService.getAllInvoices().subscribe({
      next: (data) => {
        this.apiResponse = data;
      },
    });
  }

  onInvoiceClick(invoiceNumber: string) {
    console.log(invoiceNumber);

    this.router.navigate(['invoice-details'], {
      queryParams: { invoiceNumber },
    });
  }
  onUpload() {
    this.router.navigate(['./upload']);
  }
}
