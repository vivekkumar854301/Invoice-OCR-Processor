import { Component, computed, effect, input } from '@angular/core';
import { InvoiceCardFormComponent } from '../../../shared/component/invoice-card-form/invoice-card-form.component';
import { IFormConfig } from '@clarium/ngce-components';
import { InvoiceData } from '../../model/invoice.model';

@Component({
  selector: 'IOP-purchase-transport-details',
  imports: [InvoiceCardFormComponent],
  templateUrl: './purchase-transport-details.component.html',
  styleUrl: './purchase-transport-details.component.scss'
})
export class PurchaseTransportDetailsComponent {
  title = 'Purchase & Transport Details';
  formConfig !:IFormConfig;
  readonly PurchaseTransportDetails = input.required<InvoiceData>();
  readonly data = computed(()=>this.PurchaseTransportDetails());
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
          name: 'order_no',
          label: 'Order No',
          value: this.data().purchase.order_no,
          
        },
        {
          type: 'date',
          name: 'order_date',
          label: 'Order Date',
          value: new Date(this.data().purchase.order_date),
          format: 'yyyy-MM-dd',
        },
        {
          type: 'text',
          name: 'transport_name',
          label: 'Transport Name',
          value: this.data().purchase.transport_name,
        },
        {
          type: 'text',
          name: 'agent_name',
          label: 'Agent Name',
          value: this.data().purchase.agent_name,
        },
        {
          type: 'text',
          name: 'LR_no',
          label: 'LR No',
          value: this.data().purchase.LR_no,
        },
        {
          type: 'date',
          name: 'LR_date',
          label: 'LR Date',
          value: new Date(this.data().purchase.LR_date),
          format: 'yyyy-MM-dd',
        },
        {
          type: 'text',
          name: 'merchandiser_name',
          label: 'Merchandiser Name',
          value: this.data().purchase.merchandiser_name,
        }
      ],
      buttons: [
      ],
    };

  }
}
