import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgceComponentsModule,
  SnackbarService,
} from '@clarium/ngce-components';

import { NgceIconModule } from '@clarium/ngce-icon';
import { FileManagementService } from '../../shared/service/file-management/file-management.service';
import { LoadingComponent } from '../../shared/component/reusable-components/loading/loading.component';
@Component({
  selector: 'IOP-upload',
  imports: [NgceComponentsModule, NgceIconModule, LoadingComponent],
  providers: [FileManagementService],
  templateUrl: './upload.page.html',
  styleUrl: './upload.page.scss',
})
export class UploadComponent {
  private readonly router = inject(Router);
  private readonly fileManagmentService = inject(FileManagementService);
  private readonly snackbarService = inject(SnackbarService);

  customStyles = {
    width: '48.5vw',
  };

  files: File[] = [];

  selectedFileCustomStyles = {
    width: 'inherit',
  };

  isLoading = false;

  OnFileSelect(event: File[]) {
    this.files = event;
  }

  onUpload(): void {
    if (this.files.length === 0) {
      this.snackbarService.show('Please add file to upload', 'danger', {
        vertical: 'top',
        horizontal: 'right',
      });
      return;
    }

    const formData = new FormData();
    this.files.forEach((file, index) => {
      formData.append('files', file); // Change 'files' to expected backend field name
    });

    this.isLoading = true;

    this.fileManagmentService.onUploadInvoice(formData).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.snackbarService.show('Extracted successfully', 'success', {
          vertical: 'top',
          horizontal: 'right',
        });
        this.router.navigate(['invoices']);
        const invoiceNumber =
          data.files_processed[0].result.invoice.invoice_number;
        // this.router.navigate(['invoice-details', {queryParams: { data.invoice.invoiceNumber },}]);
        this.router.navigate(['invoice-details'], {
          queryParams: { invoiceNumber },
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.snackbarService.show('File upload failed', 'danger', {
          vertical: 'top',
          horizontal: 'right',
        });
      },
    });
  }
}
