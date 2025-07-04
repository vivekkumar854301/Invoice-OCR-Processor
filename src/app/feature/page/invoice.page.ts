import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Renderer2, TemplateRef, inject, signal, viewChild } from '@angular/core';
import { InvoiceStoreService } from '../store/invoice-store.service';
import { InvoiceData } from '../model/invoice.model';
import { InvoiceDetailsComponent } from '../component/invoice-details/invoice-details.component';
import { SupplierInformationComponent } from '../component/supplier-information/supplier-information.component';
import { TotalsSummaryComponent } from '../component/totals-summary/totals-summary.component';
import { NgceIconModule } from '@clarium/ngce-icon';
import { NgceComponentsModule, DialogService, DialogConfig } from '@clarium/ngce-components';
import { ProductLineComponent } from '../component/product-line/product-line.component';
import { BankDetailsComponent } from '../component/bank-details/bank-details.component';
import { PurchaseTransportDetailsComponent } from '../component/purchase-transport-details/purchase-transport-details.component';

@Component({
  selector: 'IOP-invoice',
  imports: [
    InvoiceDetailsComponent,
    SupplierInformationComponent,
    TotalsSummaryComponent,
    NgceIconModule,
    NgceComponentsModule,
    ProductLineComponent,
    BankDetailsComponent,
    PurchaseTransportDetailsComponent
  ],
  templateUrl: './invoice.page.html',
  styleUrl: './invoice.page.scss',
})
export class InvoiceComponent {
  private readonly invoiceStore = inject(InvoiceStoreService);
  private readonly dialogService =inject(DialogService);
  readonly invoiceData = signal<InvoiceData>(
    this.invoiceStore.invoiceDataStore()
  );

  dialogHeaderTemplate = viewChild<TemplateRef<any>>('dialogHeader');
  dialogcontentTemplate = viewChild<TemplateRef<any>>('dialogContent');
  zoomableImage = viewChild<ElementRef<HTMLImageElement>>('zoomableImage');
  viewImage() {
    const dialogConfig: DialogConfig = {
      header: this.dialogHeaderTemplate(),
      content: this.dialogcontentTemplate()!,
      dialogType:'sideDrawer',
      closeOnBackdropClick: false,
      accessibility: true,
      draggable: false,
      closeButton: true,
      styles:this.DIALOGBOX_STYLES
    };
    this.dialogService.openDialog(dialogConfig);
  }
  DIALOGBOX_STYLES = {
  dialog: {
    padding: '0',
    width: '55vw !important',
  },
  header: {
    backgroundColor: 'rgba(217, 225, 236, 0.5)',
    padding: '0.5rem',
  },
  body: {
    padding: '1.5rem',
    backgroundColor: 'white',
    width: '55vw',
  },
};
  ngcebutton={
    'background-color':'#ffffffe6',
     color:'black',
    'padding-left': '.75rem',
    'padding-right': '.75rem',
    'font-size': '.875rem',
    'line-height': '1.25rem',
    'justify-content': 'center',
    'align-items': 'center',
    'cursor':'pointer',
    display: 'inline-flex',



  }
  rerunOCR() {
    console.log('Re-run OCR clicked');
  }
  private readonly renderer = inject(Renderer2)
  scale: number = 1;

  zoomIn(): void {
    this.scale += 0.1;
    this.applyTransform();
  }

  zoomOut(): void {
    this.scale = Math.max(0.1, this.scale - 0.1);
    this.applyTransform();
  }

  resetZoom(): void {
    this.scale = 1;
    this.applyTransform();
  }

  private applyTransform(): void {
    const image = this.zoomableImage();
    if (image && image.nativeElement) {
      this.renderer.setStyle(image.nativeElement, 'transform', `scale(${this.scale})`);
      this.renderer.setStyle(image.nativeElement, 'transition', 'transform 0.2s');
    }
  }
}
