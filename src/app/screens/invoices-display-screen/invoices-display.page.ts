import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgceComponentsModule } from '@clarium/ngce-components';
import { NgceIconModule } from '@clarium/ngce-icon';
import { FileManagementService } from '../../shared/service/file-management/file-management.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/service/shared/shared.service';
@Component({
  selector: 'IOP-invoices-display',
  imports: [NgceComponentsModule, NgceIconModule, CommonModule],
  providers: [FileManagementService],
  templateUrl: './invoices-display.page.html',
  styleUrl: './invoices-display.page.scss',
})
export class InvoicesDisplayComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly sharedService = inject(SharedService);
  private readonly fileManangementService = inject(FileManagementService);
  apiResponse!: any;

  ngOnInit(): void {
    this.fileManangementService.getAllInvoices().subscribe({
      next: (data) => {
        this.apiResponse = data;
        console.log(this.apiResponse);
      },
    });
  }

  onInvoiceClick(invoiceNumber: string, binaryData: string) {
    this.sharedService.setSelectedImage(binaryData);
    this.router.navigate(['invoice-details'], {
      queryParams: { invoiceNumber },
    });
  }

  onUpload() {
    this.router.navigate(['./upload']);
  }

  onInputChange(searchText: any) {
    //to search in all fields of api resposne
    // const filtered = this.apiResponse.filter((item: any) => Object.values(item).some(value=>
    //   typeof value ==='string'  && value.toLowerCase().startsWith(searchText)
    // ))

    //to search particualr fields of api response
    const filtered = this.apiResponse.filter((item: any) =>
      ['invoices'].some((key) =>
        item[key]?.toString().toLowerCase().startsWith(searchText)
      )
    );
  }
}
