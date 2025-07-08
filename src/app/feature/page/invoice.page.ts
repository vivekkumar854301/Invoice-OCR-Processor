import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  TemplateRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { InvoiceStoreService } from '../store/invoice-store.service';
import { InvoiceData } from '../model/invoice.model';
import { InvoiceDetailsComponent } from '../component/invoice-details/invoice-details.component';
import { SupplierInformationComponent } from '../component/supplier-information/supplier-information.component';
import { TotalsSummaryComponent } from '../component/totals-summary/totals-summary.component';
import { NgceIconModule } from '@clarium/ngce-icon';
import {
  NgceComponentsModule,
  DialogService,
  DialogConfig,
} from '@clarium/ngce-components';
import { ProductLineComponent } from '../component/product-line/product-line.component';
import { BankDetailsComponent } from '../component/bank-details/bank-details.component';
import { PurchaseTransportDetailsComponent } from '../component/purchase-transport-details/purchase-transport-details.component';
import { DIALOGBOX_STYLES } from '../../shared/commonCss/common.style';
import { InvoiceFormComponent } from '../component/invoice-form/invoice-form.component';
import { PaymentComponent } from '../component/payment/payment.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FileManagementService } from '../../upload-screen/service/file-management.service';
import { InvoiceService } from '../service/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'IOP-invoice',
  imports: [
    InvoiceFormComponent,
    TotalsSummaryComponent,
    NgceIconModule,
    NgceComponentsModule,
    ProductLineComponent,
    BankDetailsComponent,
    PaymentComponent,
    CommonModule,
  ],
  providers: [FileManagementService,InvoiceComponent],
  templateUrl: './invoice.page.html',
  styleUrl: './invoice.page.scss',
})
export class InvoiceComponent implements OnInit {
  private readonly invoiceStore = inject(InvoiceStoreService);
  private readonly invoiceService = inject(InvoiceService);
  private readonly dialogService = inject(DialogService);
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly fileManagementService = inject(FileManagementService);

  EMPTY_INVOICE_DATA: InvoiceData = {
    invoice: {
      invoice_number: '',
      invoice_date: '',
      irn_number: '',
      acknowledgement_no: '',
      acknowledgement_data: '',
      e_way_bill_no: '',
    },
    supplier: {
      supplier_name: '',
      supplier_address: '',
      supplier_gst_no: '',
      msme_no: '',
      pan_no: '',
    },
    purchase: {
      order_no: '',
      order_date: '',
      transport_name: '',
      agent_name: '',
      LR_no: '',
      LR_date: '',
      merchandiser_name: '',
    },
    taxes: {
      taxable_value: '',
      CGST_amount: '',
      SGST_amount: '',
      IGST_amount: '',
      total_tax_amount: '',
    },
    discount: {
      discount_percentage: '',
      discount_amount: '',
    },
    charges: {
      other_deductions: '',
      freight_charges: '',
      other_charges: '',
    },
    amount: {
      round_off_amount: '',
      invoice_amount: '',
      amount_in_words: '',
    },
    billing: {
      billed_to: '',
      bank_name: '',
      bank_branch: '',
      account_name: '',
      account_no: '',
      IFSC_code: '',
    },
    product_details: {
      items: [],
      total_quantity: 0,
      total_net_Amount: 0,
    },
  };
  readonly invoiceData = signal<InvoiceData>(
    this.invoiceStore.invoiceDataStore()
  );

  invoiceId: string = '';
  imageUrl: string = '';
  invoiceInfo: any;

  showImagePanel = true;

  toggleImagePanel() {
    this.showImagePanel = !this.showImagePanel;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const invoiceNumber = params.get('invoiceNumber');
      console.log(invoiceNumber);
      // this.fileManagementService.getInvoiceDetails(invoiceNumber!).subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     // this.invoiceData.set(res)
      //     this.invoiceInfo = res;
      //   },
      // });
      this.invoiceService.getInvoiceData(invoiceNumber!).subscribe({
        next: (res) => {
          console.log(res);

          //this.invoiceData.set(res)
        },
      });
    });
  }

  dialogHeaderTemplate = viewChild<TemplateRef<any>>('dialogHeader');
  dialogcontentTemplate = viewChild<TemplateRef<any>>('dialogContent');
  zoomableImage = viewChild<ElementRef<HTMLImageElement>>('zoomableImage');
  viewImage() {
    const dialogConfig: DialogConfig = {
      header: this.dialogHeaderTemplate(),
      content: this.dialogcontentTemplate()!,
      dialogType: 'classic',
      closeOnBackdropClick: false,
      accessibility: true,
      draggable: true,
      closeButton: true,
      styles: DIALOGBOX_STYLES,
      resizable: true,
    };
    this.dialogService.openDialog(dialogConfig);
  }
  ngcebutton = {
    'background-color': '#ffffffe6',
    color: 'black',
    'padding-left': '.75rem',
    'padding-right': '.75rem',
    'font-size': '.875rem',
    'line-height': '1.25rem',
    'justify-content': 'center',
    'align-items': 'center',
    cursor: 'pointer',
    display: 'inline-flex',
  };
  invoiceDetails = {
    border: 'none',
    'margin-top': '2rem',
    padding: '1.5rem',
    width: 'auto',
    cursor: 'default',
  };
  rerunOCR() {
    console.log('Re-run OCR clicked');
  }
  private readonly renderer = inject(Renderer2);
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
      this.renderer.setStyle(
        image.nativeElement,
        'transform',
        `scale(${this.scale})`
      );
      this.renderer.setStyle(
        image.nativeElement,
        'transition',
        'transform 0.2s'
      );
    }
  }
}
