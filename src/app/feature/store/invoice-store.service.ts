import { Injectable, inject } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { InvoiceData, InvoiceInfo } from '../model/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceStoreService {
  private readonly invoiceService = inject(InvoiceService);

  initialInvoiceData: InvoiceInfo = {
    invoice: {
      invoice_number: '',
      invoice_date: '',
      irn_number: '',
      acknowledgement_no: '',
      acknowledgement_date: '',
      e_way_bill_no: '',
    },
    supplier: {
      supplier_name: '',
      supplier_address: {
        address: '',
        email: '',
        mobile: '',
      },
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
      billed_to: {
        customer_name: '',
        address_line1: '',
        address_line2: '',
        address_line3: '',
        address_line4: '',
        state_country: '',
        distance_level_km: '',
        phone: '',
        state_code: '',
        gstin_no_customer: '',
      },
      bank_name: '',
      bank_branch: '',
      account_name: '',
      account_no: '',
      IFSC_code: '',
    },
    product_details: {
      items: [
        {
          s_no: '',
          category: '',
          description: '',
          design_code: '',
          size: {
            size: Array(16).fill(''),
            color: '',
            UOM: '',
            pieces: Array(16).fill(''),
            quantity: Array(16).fill(''),
            rate: Array(16).fill(''),
            MRP_rate: Array(16).fill(''),
            GST: '',
            discount_percentage: '',
            discount_amount: '',
            product_valued: '',
            HSN: '',
            tax_percentage: '',
            tax_amount: '',
          },
        },
      ],
      total_quantity: 0,
      total_net_Amount: 0,
    },
    image_binary_data: '',
  };

  readonly invoiceDataStore1 = toSignal(
    this.invoiceService.getInvoiceMockData(),
    {
      initialValue: this.initialInvoiceData,
    }
  );
}
