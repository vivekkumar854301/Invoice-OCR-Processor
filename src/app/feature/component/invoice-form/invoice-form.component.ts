import { Component, EffectRef, computed, effect, input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgceComponentsModule} from '@clarium/ngce-components'
import { InvoiceData } from '../../model/invoice.model';

@Component({
  selector: 'IOP-invoice-form',
  imports: [ReactiveFormsModule,NgceComponentsModule],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.scss'
})
export class InvoiceFormComponent {
  readonly invoiceData = input.required<InvoiceData>();
  readonly data = computed(()=>this.invoiceData());

  readonly syncFormEffect: EffectRef = effect(() => {
    const invoice = this.data().invoice;
    const supplier = this.data().supplier;
  
    if (invoice) {
      this.form.get('invoice')?.patchValue({
        invoice_number: invoice.invoice_number,
        invoice_date: invoice.invoice_date,
        irn_number: invoice.irn_number,
        acknowledgement_no: invoice.acknowledgement_no,
        acknowledgement_data: invoice.acknowledgement_data,
        e_way_bill_no: invoice.e_way_bill_no,
        supplier_code: supplier.pan_no,
        supplier_details: supplier.suplier_name + ',' + supplier.supplier_address,
        supplier_gst_no: supplier.supplier_gst_no,
        msme_no: supplier.msme_no,
        pan_no: supplier.pan_no
      });
    }
  });
  
  form = new FormGroup({
    invoice: new FormGroup({
      invoice_number: new FormControl(''),
      invoice_date: new FormControl('01/05/25'),
      irn_number: new FormControl('f5eaba8ba61e2dcb566111065b655f147705e35e47289454bef3878eebb8ebe4e'),
      acknowledgement_no: new FormControl(''),
      acknowledgement_data: new FormControl(''),
      e_way_bill_no: new FormControl('201953632779'),
    
      supplier_code: new FormControl('L0030313'),
      supplier_details: new FormControl('ZEAL APPAREL,234, ASHISH INDUSTRIAL ESTATE, DADAR WEST, MUMBAI'),
      supplier_gst_no: new FormControl('27AALPI1722H1ZM'),
      msme_no: new FormControl(''),
      pan_no: new FormControl('')
    })
  });
  


  onSubmit() {
    console.log('Form Submitted:', this.form.value);
  }
  
}
