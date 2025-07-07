import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NgceComponentsModule } from '@clarium/ngce-components';

import { NgceIconModule } from '@clarium/ngce-icon';
import { FileManagementService } from '../service/file-management.service';
import { InvoiceSystemHeaderComponent } from '../../feature/component/invoice-system-header/invoice-system-header.component';
@Component({
  selector: 'IOP-upload',
  imports: [NgceComponentsModule, NgceIconModule, InvoiceSystemHeaderComponent],
  providers: [FileManagementService],
  templateUrl: './upload.page.html',
  styleUrl: './upload.page.scss',
})
export class UploadComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly fileManagmentService = inject(FileManagementService);
  customStyles = {
    width: '48.5vw',
  };
  isFileUploaded: boolean = true;
  fileName: string = '';

  files: File[] = [];

  selectedFileCustomStyles = {
    width: '48.5vw',
  };

  ngOnInit(): void {
    this.isFileUploaded = false;
  }
  OnFileSelect(event: File[]) {
    console.log(event);
    this.isFileUploaded = true;
    this.fileName = event[0].name;
    this.files = event;
  }
  // onUpload() {
  //   this.convertFileToBase64(this.files)
  //   this.fileManagmentService.onUploadInvoice(this.files).subscribe({
  //     next: (data) => {},
  //   });
  //   this.router.navigate(['display-invoices']);
  // }
  onUpload(): void {
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
              this.router.navigate(['display-invoices']);
            },
            error: (err) => {
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

  onDelete() {
    this.isFileUploaded = false;
    console.log(this.isFileUploaded);
  }
}
