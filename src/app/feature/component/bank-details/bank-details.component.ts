import { Component, computed, effect, input } from '@angular/core';
import { InvoiceCardFormComponent } from '../../../shared/component/invoice-card-form/invoice-card-form.component';
import { IFormConfig } from '@clarium/ngce-components';
import { InvoiceData } from '../../model/invoice.model';

@Component({
  selector: 'IOP-bank-details',
  imports: [InvoiceCardFormComponent],
  templateUrl: './bank-details.component.html',
  styleUrl: './bank-details.component.scss'
})
export class BankDetailsComponent {
  title = 'Bank Details';
  formConfig !:IFormConfig;
  readonly bankDetailsData = input.required<InvoiceData>();
  readonly data = computed(()=>this.bankDetailsData());
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
          name: 'billed_to',
          label: 'Billed To',
          value: this.data().billing.billed_to,
          
        },
        {
          type: 'text',
          name: 'bank_name',
          label: 'Bank Name',
          value: this.data().billing.bank_name,
        },
        {
          type: 'text',
          name: ' bank_branch',
          label: 'Branch',
          value: this.data().invoice.acknowledgement_no,
        },
        {
          type: 'text',
          name: ' account_name',
          label: ' Account Name',
          value: this.data().billing.account_name,
        },
        {
          type: 'text',
          name: 'account_no',
          label: 'Account No',
          value: this.data().billing.account_no,
        },
        {
          type: 'text',
          name: 'IFSC_code',
          label: 'IFSC Code',
          value: this.data().billing.IFSC_code,
        }
      ],
      buttons: [
      ],
    };

  }
}
