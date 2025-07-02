import { Component, OnInit, computed, effect, inject, input } from '@angular/core';

import { IFormConfig } from '@clarium/ngce-components';
import { InvoiceData } from '../../model/invoice.model';
import { InvoiceCardFormComponent } from '../../../shared/component/invoice-card-form/invoice-card-form.component';

@Component({
  selector: 'IOP-invoice-details',
  imports: [InvoiceCardFormComponent],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss',
})
export class InvoiceDetailsComponent {
  title = 'Invoice Details';
  formConfig !:IFormConfig;
  readonly invoiceDetailsData = input.required<InvoiceData>();
  readonly data = computed(()=>this.invoiceDetailsData());
  constructor() {
    effect(() => {
      const data = this.data();
      if (data) {
        this.formInitialization(data);
      }
    });
  }
 

  formInitialization(data: InvoiceData){
    this.formConfig={
      layout: 'horizontal',
      columns:2,
      customStyles: {
        padding: '20px',
        gap: '14px',
       
      },
      
      fields: [
        {
          type: 'text',
          name: 'invoiceNo',
          label: 'Invoice No',
          value: this.data().invoice.invoice_number,
          
        },
        {
          type: 'date',
          name: 'invoiceDate',
          label: 'Invoice Date',
          value: new Date( this.data().invoice.invoice_date),
          format: 'yyyy-MM-dd',
        },
        {
          type: 'text',
          name: 'irn_number',
          label: 'IRN No',
          value: this.data().invoice.irn_number,
        },
        {
          type: 'text',
          name: 'acknowledgement_no',
          label: 'Acknowledgement No',
          value: this.data().invoice.acknowledgement_no,
        },
        {
          type: 'text',
          name: 'acknowledgement_data',
          label: 'Acknowledgement Data',
          value: this.data().invoice.acknowledgement_data,
        },
        {
          type: 'text',
          name: 'e_way_bill_no',
          label: 'E-Way Bill No',
          value: this.data().invoice.e_way_bill_no,
        }
      ],
      buttons: [
      ],
    };

  }
}
