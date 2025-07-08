import { Component, EffectRef, computed, effect, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgceComponentsModule} from "@clarium/ngce-components"
import {NgceIconModule} from "@clarium/ngce-icon"
import { InvoiceData } from '../../model/invoice.model';
@Component({
  selector: 'IOP-payment',
  imports: [NgceComponentsModule,NgceIconModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  readonly paymantData = input.required<InvoiceData>();
  readonly data = computed(()=>this.paymantData());

  readonly syncFormEffect: EffectRef = effect(() => {
    const { discount, invoice, taxes, charges, amount } = this.data();
  
    if (discount && invoice && taxes && charges && amount) {
      this.form.get('invoice')?.patchValue({
        invoice_amount: amount.invoice_amount ?? '',
        round_off_amount: amount.round_off_amount,
        amount_in_words: amount.amount_in_words,
        freight_charges: charges.freight_charges,
        other_deductions: charges.other_deductions,
        other_charges: charges.other_charges,
        discount_percentage: discount.discount_percentage,
        discount_amount: discount.discount_amount,
        CGST_amount: taxes.CGST_amount,
        SGST_amount: taxes.SGST_amount,
        IGST_amount: taxes.IGST_amount,
        total_tax_amount: taxes.total_tax_amount,
        taxable_value: taxes.taxable_value,
        irn_number: invoice.irn_number ?? '',
      });
    }
  });
  
  
  form = new FormGroup({
    invoice: new FormGroup({
      invoice_amount: new FormControl(''),
      freight_charges: new FormControl(''),
      CGST_amount: new FormControl(''),
      total_tax_amount: new FormControl(''),
      discount_amount: new FormControl(''),
      discount_percentage: new FormControl(''),
      SGST_amount: new FormControl(''),
      IGST_amount: new FormControl(''),
      other_deductions: new FormControl(''),
      other_charges: new FormControl(''),
      amount_in_words: new FormControl(''),
      irn_number: new FormControl(''),
      round_off_amount: new FormControl(''),
      taxable_value: new FormControl('')
    })
  });
  




  onExit(): void {
    console.log('Exit clicked');
  }

}
