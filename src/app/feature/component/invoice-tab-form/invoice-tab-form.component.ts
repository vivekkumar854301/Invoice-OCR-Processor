import { Component, effect, input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgceComponentsModule } from '@clarium/ngce-components';
import { NgceIconModule } from '@clarium/ngce-icon';
import { InvoiceData } from '../../model/invoice.model';
import { ProductLineComponent } from '../product-line/product-line.component';

@Component({
  selector: 'IOP-invoice-tab-form',
  imports: [
    NgceComponentsModule,
    NgceIconModule,
    ReactiveFormsModule,
    ProductLineComponent,
  ],
  templateUrl: './invoice-tab-form.component.html',
  styleUrl: './invoice-tab-form.component.scss',
})
export class InvoiceTabFormComponent {
  // Styles
  tabContentStyles = {
    'margin-top': '2rem',
    overflow: 'auto',
    height: '100%',
  };

  invoiceForm!: FormGroup;

  invoiceData = input<any>();

  constructor(private fb: FormBuilder) {
    effect(() => {
      const data = this.invoiceData();
      if (data && this.invoiceForm) {
        this.invoiceForm.patchValue(data);
      }
    });
  }
  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
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
        billed_to: this.fb.group({
          customer_name: [''],
          address_line1: [''],
          address_line2: [''],
          address_line3: [''],
          address_line4: [''],
          state_country: [''],
          distance_level_km: [''],
          phone: [''],
          state_code: [''],
          gstin_no_customer: [''],
        }),
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
  }

  // Getter for product items FormArray
  get items(): FormArray {
    return this.invoiceForm.get('product_details.items') as FormArray;
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      alert('Form submitted! Check console.');
    } else {
      alert('Please fill the required fields.');
    }
  }
}
