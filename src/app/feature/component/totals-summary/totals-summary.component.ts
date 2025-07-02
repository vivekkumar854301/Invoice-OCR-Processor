import { Component, computed, effect, input } from '@angular/core';
import { IFormConfig } from '@clarium/ngce-components';
import { InvoiceData } from '../../model/invoice.model';
import { InvoiceCardFormComponent } from '../../../shared/component/invoice-card-form/invoice-card-form.component';

@Component({
  selector: 'IOP-totals-summary',
  imports: [InvoiceCardFormComponent],
  templateUrl: './totals-summary.component.html',
  styleUrl: './totals-summary.component.scss'
})
export class TotalsSummaryComponent {
  title = 'Tax, Discount, and Amounts';
  formConfig!:IFormConfig;
  readonly summaryData = input.required<InvoiceData>();
  readonly data = computed(()=>this.summaryData());
  constructor() {
    effect(() => {
      const data = this.data();
      if (data) {
        this.formInitialization(data);
      }
    });
  }
  formInitialization(data :InvoiceData){
    this.formConfig ={
      "layout": "horizontal",
      "customStyles": {
        "padding": "20px",
        "gap": "14px",
      },
      "fields": [
        {
          "type": "text",
          "name": "taxable_value",
          "label": "Taxable Value",
          "value": this.data().taxes.taxable_value
        },
        {
          "type": "text",
          "name": "CGST_amount",
          "label": "CGST Amount",
          "value": this.data().taxes.CGST_amount
        },
        {
          "type": "text",
          "name": "SGST_amount",
          "label": "SGST Amount",
          "value": this.data().taxes.SGST_amount
        },
        {
          "type": "text",
          "name": "IGST_amount",
          "label": "IGST Amount",
          "value": this.data().taxes.IGST_amount
        },
        {
          "type": "text",
          "name": "total_tax_amount",
          "label": "Total Tax Amount",
          "value": this.data().taxes.total_tax_amount
        },
        {
          "type": "text",
          "name": "discount_percentage",
          "label": "Discount(%)",
          "value": this.data().discount.discount_percentage
        },
        {
          "type": "text",
          "name": "discount_amount",
          "label": "Discount Amount",
          "value": this.data().discount.discount_amount
        },
        {
          "type": "text",
          "name": "freight_charges",
          "label": "Freight Charges",
          "value": this.data().charges.freight_charges
        },
        {
          "type": "text",
          "name": "other_charges",
          "label": "Other Charges",
          "value": this.data().charges.other_charges
        },
        {
          "type": "text",
          "name": "other_deductions",
          "label": "Other Deductions",
          "value": this.data().charges.other_deductions
        },
        {
          "type": "number",
          "name": "invoice_amount",
          "label": "Final Invoice Amount",
          "format": "C-2",
          "locale": "en-IN",
          "value": Number(this.data().amount.invoice_amount)
        },
        {
          "type": "number",
          "name": "round_off_amount",
          "label": "Round Off",
          "format": "C-2",
          "value": Number(this.data().amount.round_off_amount)
        },
        {
          "type": "text",
          "name": "invoice_amount",
          "label": "Invoice Amount (Words)",
          "value": this.data().amount.amount_in_words
        },

        
        

      ],
      "buttons": []
    };
  }
}
