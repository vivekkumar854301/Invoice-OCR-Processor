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
@Component({
  selector: 'IOP-upload',
  imports: [NgceComponentsModule, NgceIconModule],
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

  OnFileSelect(event: File[]) {
    console.log(event);
    this.files = event;
  }

  onUpload(): void {
    if (this.files.length === 0) {
      this.snackbarService.show('Please add files to upload', 'danger', {
        vertical: 'top',
        horizontal: 'right',
      });
      return;
    }
    const base64Files: string[] = [];
    let filesProcessed = 0;

    this.files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        base64Files.push(reader.result as string);
        filesProcessed++;

        if (filesProcessed === this.files.length) {
          // All files converted
          console.log(base64Files);

          this.fileManagmentService.onUploadInvoice(base64Files).subscribe({
            next: (data) => {
              console.log(data);
              this.snackbarService.show(
                'File uploaded successfully',
                'success',
                {
                  vertical: 'top',
                  horizontal: 'right',
                }
              );
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
      };

      reader.onerror = (err) => {
        console.error('File conversion failed:', err);
      };

      reader.readAsDataURL(file);
    });
  }
}
