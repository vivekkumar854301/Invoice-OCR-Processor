import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  NgceComponentsModule,
  SnackbarService,
} from '@clarium/ngce-components';

import { NgceIconModule } from '@clarium/ngce-icon';
import { FileManagementService } from '../service/file-management.service';
import { InvoiceSystemHeaderComponent } from '../../feature/component/invoice-system-header/invoice-system-header.component';
import { LoaderComponent } from '../../shared/component/loader/loader.component';
@Component({
  selector: 'IOP-upload',
  imports: [NgceComponentsModule, NgceIconModule, LoaderComponent],
  providers: [FileManagementService],
  templateUrl: './upload.page.html',
  styleUrl: './upload.page.scss',
})
export class UploadComponent {
  private readonly router = inject(Router);
  private readonly fileManagmentService = inject(FileManagementService);
  private readonly snackbarService = inject(SnackbarService);
  isLoading: boolean = false;

  customStyles = {
    width: '48.5vw',
  };

  files: File[] = [];

  selectedFileCustomStyles = {
    width: 'inherit',
  };

  OnFileSelect(event: File[]) {
    console.log(event);
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
        console.log(data);
        this.snackbarService.show('Extracted successfully', 'success', {
          vertical: 'top',
          horizontal: 'right',
        });
        this.router.navigate(['invoices']);
      },
      error: (err) => {
        this.snackbarService.show('File upload failed', 'danger', {
          vertical: 'top',
          horizontal: 'right',
        });
        console.error('Upload failed:', err);
      },
    });
  }
  
}
