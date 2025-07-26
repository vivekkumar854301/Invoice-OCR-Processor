import {
  Component,
  OnInit,
  inject,
  computed,
  signal,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgceIconModule } from '@clarium/ngce-icon';
import { NgceComponentsModule } from '@clarium/ngce-components';
import { CommonModule } from '@angular/common';
import { InvoiceInfoFormComponent } from '../../feature/component/invoice-info-form/invoice-info-form.component';
import { InvoiceTabFormComponent } from '../../feature/component/invoice-tab-form/invoice-tab-form.component';
import { InvoiceInfo } from '../../feature/model/invoice.model';
import { InvoiceService } from '../../feature/service/invoice.service';
import { InvoiceStoreService } from '../../feature/store/invoice-store.service';
import { SharedService } from '../../shared/service/shared.service';
import { FileManagementService } from '../upload-screen/service/file-management.service';

@Component({
  selector: 'IOP-invoice',
  standalone: true,
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

  scale = 1;
  offsetX = 0;
  offsetY = 0;
  isPanning = false;
  startX = 0;
  startY = 0;
  imgStartX = 0;
  imgStartY = 0;
  showImagePanel = true;

  option = computed(() => this.sharedService.getSelector());

  readonly invoiceData = signal<InvoiceInfo>(
    this.invoiceStore.invoiceDataStore1()
  );

  @ViewChild('zoomableImage') zoomableImage!: ElementRef<HTMLImageElement>;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const invoiceNumber = params.get('invoiceNumber');
      // If needed, replace mocked invoice with actual service fetch.
      // this.invoiceService.getInvoiceData(invoiceNumber!).subscribe({
      //   next: (res) => this.invoiceData.set(res),
      // });
      this.invoiceData.set(this.invoiceStore.invoiceDataStore1());
    });
  }

  toggleImagePanel(): void {
    this.showImagePanel = !this.showImagePanel;
  }

  zoomIn(): void {
    this.scale += 0.1;
    if (this.scale - 0.1 <= 1) {
      // First zoom: re-center any pan
      this.offsetX = 0;
      this.offsetY = 0;
    }
    this.applyTransform();
  }

  zoomOut(): void {
    this.scale = Math.max(1, this.scale - 0.1);
    if (this.scale === 1) {
      this.offsetX = 0;
      this.offsetY = 0;
    }
    this.applyTransform();
  }

  resetZoom(): void {
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.applyTransform();
  }

  startPan(event: MouseEvent | TouchEvent) {
    if (this.scale <= 1) return; // Only allow panning if zoomed in
    event.preventDefault();
    this.isPanning = true;
    const e = (event instanceof TouchEvent ? event.touches[0] : event) as
      | MouseEvent
      | Touch;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.imgStartX = this.offsetX;
    this.imgStartY = this.offsetY;
  }

  onPan(event: MouseEvent | TouchEvent) {
    if (!this.isPanning || this.scale <= 1) return; // No drag unless zoomed
    const e = (event instanceof TouchEvent ? event.touches[0] : event) as
      | MouseEvent
      | Touch;
    this.offsetX = this.imgStartX + (e.clientX - this.startX);
    this.offsetY = this.imgStartY + (e.clientY - this.startY);
    this.applyTransform();
  }

  endPan() {
    this.isPanning = false;
  }

  private applyTransform(): void {
    if (this.zoomableImage && this.zoomableImage.nativeElement) {
      this.renderer.setStyle(
        this.zoomableImage.nativeElement,
        'transform',
        `translate(-50%, -50%) translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`
      );
      this.renderer.setStyle(
        this.zoomableImage.nativeElement,
        'transition',
        'transform 0.2s'
      );
    }
  }
}
