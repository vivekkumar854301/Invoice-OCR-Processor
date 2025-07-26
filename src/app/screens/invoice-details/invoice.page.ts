import { NgceIconModule } from '@clarium/ngce-icon';
import {
  NgceComponentsModule,
  DialogService,
  DialogConfig,
} from '@clarium/ngce-components';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  inject,
  computed,
  signal,
  viewChild,
  TemplateRef,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceInfoFormComponent } from '../../feature/component/invoice-info-form/invoice-info-form.component';
import { InvoiceTabFormComponent } from '../../feature/component/invoice-tab-form/invoice-tab-form.component';
import { ProductLineComponent } from '../../feature/component/product-line/product-line.component';
import { InvoiceInfo } from '../../feature/model/invoice.model';
import { InvoiceService } from '../../feature/service/invoice.service';
import { InvoiceStoreService } from '../../feature/store/invoice-store.service';
import { DIALOGBOX_STYLES } from '../../shared/commonCss/common.style';
import { SharedService } from '../../shared/service/shared.service';
import { FileManagementService } from '../upload-screen/service/file-management.service';

@Component({
  selector: 'IOP-invoice',
  imports: [
    NgceIconModule,
    NgceComponentsModule,
    CommonModule,
    InvoiceInfoFormComponent,
    InvoiceTabFormComponent,
  ],
  providers: [FileManagementService],
  templateUrl: './invoice.page.html',
  styleUrl: './invoice.page.scss',
})
export class InvoiceComponent implements OnInit {
  private readonly invoiceStore = inject(InvoiceStoreService);
  private readonly route = inject(ActivatedRoute);
  private readonly sharedService = inject(SharedService);
  private readonly renderer = inject(Renderer2);
  private readonly invoiceService = inject(InvoiceService);

  scale: number = 1;
  showImagePanel = true;

  option = computed(() => this.sharedService.getSelector());

  readonly invoiceData = signal<InvoiceInfo>(
    this.invoiceStore.invoiceDataStore1()
  );

  zoomableImage = viewChild<ElementRef<HTMLImageElement>>('zoomableImage');

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const invoiceNumber = params.get('invoiceNumber');
      // this.invoiceService.getInvoiceData(invoiceNumber!).subscribe({
      //   next:(res)=>{
      //     this.invoiceData.set(res);
      //   }
      // })
      this.invoiceData.set(this.invoiceStore.invoiceDataStore1());
    });
  }

  toggleImagePanel() {
    this.showImagePanel = !this.showImagePanel;
  }

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
