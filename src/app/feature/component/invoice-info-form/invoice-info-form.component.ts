import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RouterLink, RouterModule } from '@angular/router';
import { NgceComponentsModule } from '@clarium/ngce-components';
import { NgceIconModule } from '@clarium/ngce-icon';
import { SharedService } from '../../../shared/service/shared-service/shared.service';
import { AutoFragmentDirective } from '../../directives/auto-fragment.directive';
import { IFormHeader, InvoiceInfo } from '../../model/invoice.model';
import { FormGroupHeaderComponent } from '../form-group-header/form-group-header.component';
import { InvoiceFormGroupComponent } from '../invoice-form-group/invoice-form-group.component';
import { ProductLineComponent } from '../product-line/product-line.component';

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
    AutoFragmentDirective,
    InvoiceFormGroupComponent,
    FormGroupHeaderComponent,
  ],
  templateUrl: './invoice-info-form.component.html',
  styleUrl: './invoice-info-form.component.scss',
  standalone: true,
})
export class InvoiceInfoFormComponent {
  private readonly sharedService = inject(SharedService);
  private readonly fb = inject(FormBuilder);

  isExpansionNeeded = input<boolean>();
  invoiceForm!: FormGroup;
  invoiceData = input<InvoiceInfo>();
  isProductsSectionExpanded: boolean = true;
  inputStyles = {
    width: 'auto',
    'font-size': '0.9rem',
  };
  sectionsConfig: any;

  option = computed(() => this.sharedService.getSelector());

  constructor() {
    effect(() => {
      const data = this.invoiceData();
      if (data && this.invoiceForm) {
        let normalizedData = { ...data };
        if (
          normalizedData.supplier &&
          typeof normalizedData.supplier.supplier_address === 'string'
        ) {
          normalizedData.supplier = {
            ...normalizedData.supplier,
            supplier_address: {
              address: normalizedData.supplier.supplier_address,
              email: '',
              mobile: '',
            },
          };
        }

        const transformedData = {
          ...normalizedData,
          invoice: {
            ...normalizedData.invoice,
            invoice_date: this.convertToDateObject(
              normalizedData.invoice.invoice_date
            ),
          },
          purchase: {
            ...normalizedData.purchase,
            LR_date: this.convertToDateObject(normalizedData.purchase.LR_date),
          },
        };
        this.invoiceForm.patchValue(transformedData);
      }

      this.productDetailsHeader = {
        ...this.productDetailsHeader,
        isExpansionNeed: this.isExpansionNeeded()!,
        isExpanded: this.isExpansionNeeded() ? true : false,
      };
    });
  }

  getFormGroup(groupName: string): FormGroup {
    return this.invoiceForm.get(groupName) as FormGroup;
  }

  convertToDateObject(dateStr: string): Date | null {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/').map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

    const fullYear = year < 100 ? 2000 + year : year; // handle 2-digit years
    return new Date(fullYear, month - 1, day); // month is 0-based
  }

  ngOnInit() {
    this.buildForm();
    this.createSectionsConfig();
  }

  productDetailsHeader: IFormHeader = {
    title: 'Product Details',
    headerIcon: 'ngce-doc-text',
    isExpansionNeed: this.isExpansionNeeded()!,
    isExpanded: this.isExpansionNeeded() ? true : false,
  };

  onProductDetailsToggle(expanded: boolean) {
    this.isProductsSectionExpanded = expanded;
    this.productDetailsHeader.isExpanded = expanded; // Keep in sync
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
        supplier_address: this.fb.group({
          address: [''],
          email: [''],
          mobile: [''],
        }),
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

  createSectionsConfig() {
    this.sectionsConfig = [
      {
        id: 'invoice-section',
        title: 'Invoice Details',
        groupName: 'invoice',
        fields: [
          {
            label: 'Invoice Number',
            controlName: 'invoice_number',
            type: 'text',
          },
          { label: 'Invoice Date', controlName: 'invoice_date', type: 'date' },
          { label: 'IRN Number', controlName: 'irn_number', type: 'text' },
          {
            label: 'Acknowledgement No',
            controlName: 'acknowledgement_no',
            type: 'text',
          },
          {
            label: 'Acknowledgement Date',
            controlName: 'acknowledgement_data',
            type: 'text',
          },
          {
            label: 'E-Way Bill No',
            controlName: 'e_way_bill_no',
            type: 'text',
          },
        ],
      },
      {
        id: 'supplier-section',
        title: 'Supplier Details',
        groupName: 'supplier',
        fields: [
          {
            label: 'Supplier Name',
            controlName: 'supplier_name',
            type: 'text',
          },

          { label: 'GST No', controlName: 'supplier_gst_no', type: 'text' },
          { label: 'MSME No', controlName: 'msme_no', type: 'text' },
          { label: 'PAN No', controlName: 'pan_no', type: 'text' },
          { label: 'Email', controlName: 'email', type: 'email' },
          { label: 'Mobile', controlName: 'mobile', type: 'text' },
          {
            label: 'Supplier Address',
            groupName: 'supplier_address', // nested group for address fields
            type: 'group', // specify this is a group
            fields: [
              {
                label: 'Supplier Address',
                controlName: 'address',
                type: 'text-area',
              },
            ],
          },
        ],
      },

      {
        id: 'purchase-section',
        title: 'Purchase Details',
        groupName: 'purchase',
        fields: [
          { label: 'Order No', controlName: 'order_no', type: 'text' },
          { label: 'Order Date', controlName: 'order_date', type: 'date' },
          {
            label: 'Transport Name',
            controlName: 'transport_name',
            type: 'text',
          },
          { label: 'Agent Name', controlName: 'agent_name', type: 'text' },
          { label: 'LR No', controlName: 'LR_no', type: 'text' },
          { label: 'LR Date', controlName: 'LR_date', type: 'date' },
          {
            label: 'Merchandiser Name',
            controlName: 'merchandiser_name',
            type: 'text',
          },
        ],
      },
      {
        id: 'taxes-section',
        title: 'Taxes',
        groupName: 'taxes',
        fields: [
          {
            label: 'Taxable Value',
            controlName: 'taxable_value',
            type: 'text',
          },
          { label: 'CGST Amount', controlName: 'CGST_amount', type: 'text' },
          { label: 'SGST Amount', controlName: 'SGST_amount', type: 'text' },
          { label: 'IGST Amount', controlName: 'IGST_amount', type: 'text' },
          {
            label: 'Total Tax Amount',
            controlName: 'total_tax_amount',
            type: 'text',
          },
        ],
      },
      {
        id: 'discount-section',
        title: 'Discounts',
        groupName: 'discount', // fixed (was plural)
        fields: [
          {
            label: 'Discount %',
            controlName: 'discount_percentage',
            type: 'text',
          },
          {
            label: 'Discount Amount',
            controlName: 'discount_amount',
            type: 'text',
          },
        ],
      },
      {
        id: 'charges-section',
        title: 'Additional Charges',
        groupName: 'charges',
        fields: [
          {
            label: 'Other Deductions',
            controlName: 'other_deductions',
            type: 'text',
          },
          {
            label: 'Freight Charges',
            controlName: 'freight_charges',
            type: 'text',
          },
          {
            label: 'Other Charges',
            controlName: 'other_charges',
            type: 'text',
          },
        ],
      },
      {
        id: 'amount-section',
        title: 'Amount Summary',
        groupName: 'amount',
        fields: [
          {
            label: 'Round Off Amount',
            controlName: 'round_off_amount',
            type: 'text',
          },
          {
            label: 'Invoice Amount',
            controlName: 'invoice_amount',
            type: 'text',
          },
          {
            label: 'Amount in Words',
            controlName: 'amount_in_words',
            type: 'text',
          },
        ],
      },

      {
        id: 'billing-section',
        title: 'Billing Details',
        groupName: 'billing',
        fields: [
          {
            label: 'Billed To',
            groupName: 'billed_to', // nested group for billed_to fields
            type: 'group',
            fields: [
              {
                label: 'Customer Name',
                controlName: 'customer_name',
                type: 'text',
              },

              {
                label: 'Address Line 1',
                controlName: 'address_line1',
                type: 'text-area',
              },
              {
                label: 'Address Line 2',
                controlName: 'address_line2',
                type: 'text-area',
              },
              {
                label: 'Address Line 3',
                controlName: 'address_line3',
                type: 'text',
              },
              {
                label: 'Address Line 4',
                controlName: 'address_line4',
                type: 'text',
              },
              {
                label: 'State / Country',
                controlName: 'state_country',
                type: 'text',
              },
              {
                label: 'Distance (km)',
                controlName: 'distance_level_km',
                type: 'text',
              },
              { label: 'State Code', controlName: 'state_code', type: 'text' },
              {
                label: 'GSTIN No',
                controlName: 'gstin_no_customer',
                type: 'text',
              },
            ],
          },
          {
            label: 'Bank Name',
            controlName: 'bank_name',
            type: 'text',
          },
          { label: 'Bank Branch', controlName: 'bank_branch', type: 'text' },
          { label: 'Account No', controlName: 'account_no', type: 'text' },
          { label: 'Account Name', controlName: 'account_name', type: 'text' },
          { label: 'IFSC Code', controlName: 'IFSC_code', type: 'text' },
        ],
      },
    ];
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.value);
      // alert('Form submitted! Check console.');
    } else {
      // alert('Please fill the required fields.');
    }
  }
}
