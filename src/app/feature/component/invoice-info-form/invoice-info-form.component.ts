import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { NgceComponentsModule, IGridConfig } from '@clarium/ngce-components';
import { NgceIconModule } from '@clarium/ngce-icon';
import { ProductLineComponent } from '../product-line/product-line.component';
import { InvoiceData } from '../../model/invoice.model';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'IOP-invoice-info-form',
  imports: [
    ReactiveFormsModule,
    NgceIconModule,
    CommonModule,
    NgceComponentsModule,
    ProductLineComponent,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './invoice-info-form.component.html',
  styleUrl: './invoice-info-form.component.scss',
  standalone: true,
})
export class InvoiceInfoFormComponent {
  invoiceForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.invoiceForm = this.fb.group({
      invoice: this.fb.group({
        invoice_number: ['', Validators.required],
        invoice_date: ['', Validators.required],
        irn_number: [''],
        acknowledgement_no: [''],
        acknowledgement_data: [''],
        e_way_bill_no: [''],
      }),
      supplier: this.fb.group({
        supplier_name: ['', Validators.required],
        supplier_address: [''],
        supplier_gst_no: [''],
        msme_no: [''],
        pan_no: [''],
      }),
      purchase: this.fb.group({
        order_no: [''],
        order_date: [''],
        transport_name: [''],
        agent_name: [''],
        LR_no: [''],
        LR_date: [''],
        merchandiser_name: [''],
      }),
      taxes: this.fb.group({
        taxable_value: [''],
        CGST_amount: [''],
        SGST_amount: [''],
        IGST_amount: [''],
        total_tax_amount: [''],
      }),
      discount: this.fb.group({
        discount_percentage: [''],
        discount_amount: [''],
      }),
      charges: this.fb.group({
        other_deductions: [''],
        freight_charges: [''],
        other_charges: [''],
      }),
      amount: this.fb.group({
        round_off_amount: [''],
        invoice_amount: [''],
        amount_in_words: [''],
      }),
      billing: this.fb.group({
        billed_to: [''],
        bank_name: [''],
        bank_branch: [''],
        account_name: [''],
        account_no: [''],
        IFSC_code: [''],
      }),
      product_details: this.fb.group({
        items: this.fb.array([]),
        total_quantity: [0],
        total_net_Amount: [0],
      }),
    });

    // Initialize one product item for demo
    // this.addProductItem();
  }

  // Getter for product items FormArray
  get items(): FormArray {
    return this.invoiceForm.get('product_details.items') as FormArray;
  }

  // addProductItem() {
  //   const productItemGroup = this.fb.group({
  //     name: ['', Validators.required],
  //     quantity: [1, Validators.required],
  //     price: [0, Validators.required],
  //   });
  //   this.items.push(productItemGroup);
  // }

  // removeProductItem(index: number) {
  //   this.items.removeAt(index);
  // }

  onSubmit() {
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.value);
      alert('Form submitted! Check console.');
    } else {
      alert('Please fill the required fields.');
    }
  }

  invoiceData: InvoiceData = {
    invoice: {
      invoice_number: 'INV-001',
      invoice_date: '2025-07-25',
      irn_number: 'IRN1234567890',
      acknowledgement_no: 'ACK9876543210',
      acknowledgement_data: '2025-07-25',
      e_way_bill_no: 'EWB123456',
    },
    supplier: {
      supplier_name: 'Sai Textiles Ltd.',
      supplier_address: '123 MG Road, Bengaluru, Karnataka',
      supplier_gst_no: '29ABCDE1234F1Z5',
      msme_no: 'MSME123456',
      pan_no: 'ABCDE1234F',
    },
    purchase: {
      order_no: 'PO-20250725',
      order_date: '2025-07-20',
      transport_name: 'ABC Logistics',
      agent_name: 'Ravi Kumar',
      LR_no: 'LR-789456',
      LR_date: '2025-07-23',
      merchandiser_name: 'Sita Reddy',
    },
    taxes: {
      taxable_value: '50000',
      CGST_amount: '4500',
      SGST_amount: '4500',
      IGST_amount: '0',
      total_tax_amount: '9000',
    },
    discount: {
      discount_percentage: '5',
      discount_amount: '2500',
    },
    charges: {
      other_deductions: '500',
      freight_charges: '1000',
      other_charges: '300',
    },
    amount: {
      round_off_amount: '-1',
      invoice_amount: '52000',
      amount_in_words: 'Fifty-Two Thousand Rupees Only',
    },
    billing: {
      billed_to: 'KLM Retail Pvt. Ltd.',
      bank_name: 'HDFC Bank',
      bank_branch: 'Indiranagar Branch',
      account_name: 'Sai Textiles Ltd.',
      account_no: '123456789012',
      IFSC_code: 'HDFC0000123',
    },
    product_details: {
      items: [
        {
          s_no: 1,
          category: 'Shirts',
          description: 'Cotton Shirt - Full Sleeve',
          design_code: 'DS101',
          size: 'L',
          color: 'Blue',
          UOM: 'PCS',
          pieces: '10',
          quantity: '10',
          rate: '1000',
          MRP_rate: '1200',
          item_discount_percentage: '5',
          item_discount_amount: '500',
          product_valued: '9500',
          HSN: '6105',
          tax_percentage: '18',
          tax_amount: '1710',
        },
        {
          s_no: 2,
          category: 'Trousers',
          description: 'Formal Trouser - Slim Fit',
          design_code: 'DT202',
          size: '32',
          color: 'Black',
          UOM: 'PCS',
          pieces: '5',
          quantity: '5',
          rate: '1500',
          MRP_rate: '1800',
          item_discount_percentage: '5',
          item_discount_amount: '375',
          product_valued: '7125',
          HSN: '6103',
          tax_percentage: '18',
          tax_amount: '1282.5',
        },
      ],
      total_quantity: 15,
      total_net_Amount: 16625,
    },
  };
}
