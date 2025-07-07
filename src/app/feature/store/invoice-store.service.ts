import { Injectable, inject } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { InvoiceData } from '../model/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStoreService {
  // private readonly invoiceService= inject(InvoiceService);
  EMPTY_INVOICE_DATA: InvoiceData = {
    invoice: {
      invoice_number: "",
      invoice_date: "",
      irn_number: "",
      acknowledgement_no: "",
      acknowledgement_data: "",
      e_way_bill_no: ""
    },
    supplier: {
      suplier_name: "",
      supplier_address: "",
      supplier_gst_no: "",
      msme_no: "",
      pan_no: ""
    },
    purchase: {
      order_no: "",
      order_date: "",
      transport_name: "",
      agent_name: "",
      LR_no: "",
      LR_date: "",
      merchandiser_name: ""
    },
    taxes: {
      taxable_value: "",
      CGST_amount: "",
      SGST_amount: "",
      IGST_amount: "",
      total_tax_amount: ""
    },
    discount: {
      discount_percentage: "",
      discount_amount: ""
    },
    charges: {
      other_deductions: "",
      freight_charges: "",
      other_charges: ""
    },
    amount: {
      round_off_amount: "",
      invoice_amount: "",
      amount_in_words: ""
    },
    billing: {
      billed_to: "",
      bank_name: "",
      bank_branch: "",
      account_name: "",
      account_no: "",
      IFSC_code: ""
    },
    product_details: {
      items: [],
      total_quantity: 0,
      total_net_Amount: 0
    }
  };
  
  
  // readonly invoiceDataStore= toSignal(this.invoiceService.getMockData(),{
  //   initialValue: this.EMPTY_INVOICE_DATA
  // });
  
}
