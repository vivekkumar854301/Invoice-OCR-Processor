import { Component, computed, effect, input } from '@angular/core';
import {NgceComponentsModule , IFormConfig} from "@clarium/ngce-components"
import {NgceIconModule} from '@clarium/ngce-icon'
import { HeaderComponent } from '../../../shared/component/header/header.component';
import { InvoiceData } from '../../model/invoice.model';
import { InvoiceCardFormComponent } from '../../../shared/component/invoice-card-form/invoice-card-form.component';

@Component({
  selector: 'IOP-supplier-information',
  imports: [InvoiceCardFormComponent],
  templateUrl: './supplier-information.component.html',
  styleUrl: './supplier-information.component.scss'
})
export class SupplierInformationComponent {
  title= 'Supplier Information';
  formConfig !:IFormConfig;
  readonly SupplierData = input.required<InvoiceData>();
  readonly data = computed(()=>this.SupplierData());
  constructor() {
    effect(() => {
      const data = this.data();
      if (data) {
        this.formInitialization(data);
      }
    });
  }
  formInitialization(data : InvoiceData){
    this.formConfig={
      layout: 'horizontal',
      columns:2,
      "customStyles": {
        "padding": "20px",
        "gap": "14px",
      },
      "fields": [
        {
          "type": "text",
          "name": "supplierName",
          "label": "Supplier Name",
          "value": this.data().supplier.suplier_name,
        },
        {
          "type": "email",
          "name": "supplier.supplier_address",
          "label": "Supplier Address",
          "value": this.data().supplier.supplier_address,
        },
        {
          "type": "text",
          "name": "gstin",
          "label": "Gstin",
          "value": this.data().supplier.supplier_gst_no,
        },
        {
          "type": "text",
          "name": "msmeStatus",
          "label": "Msme",
          "value": this.data().supplier.msme_no
        },
        {
          "type": "text",
          "name": "supplier.pan_no",
          "label": "Pan",
          "value": this.data().supplier.pan_no,
        },
        
      ],
      "buttons": [
      ]
    }
  }

  Information={
    width: '100%',
    border: 'none',
    'margin-top': '2rem',
    padding: '1.5rem',
    'background-color':' #ffffff',
    'border-radius':'0.5rem',
    'box-shadow': '0 0 0 1px rgba(0, 0, 0, 0.1)',
  } 

}
