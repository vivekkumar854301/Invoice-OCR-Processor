import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'IOP-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  form = new FormGroup({
    invoice: new FormGroup({
      // Section 1
      totalPcs: new FormControl(60),
      freightCharges: new FormControl(0),
      masterDiscount: new FormControl(0),
      cgst: new FormControl(6),
      cgstRounded: new FormControl(0),
      totalAmount: new FormControl({ value: 0, disabled: true }),

      // Section 2
      productTotal: new FormControl(25000.00),
      miscAdditions: new FormControl(0),
      specialDiscount: new FormControl(0),
      sgst: new FormControl(6),
      sgstRounded: new FormControl(0),

      // Section 3
      discount: new FormControl(0),
      miscDeductions: new FormControl(0),
      creditDays: new FormControl(15),
      tcs: new FormControl(0),
      tcsRounded: new FormControl(0),
      irn: new FormControl('25abcd9f0d9f4a20f17b32f4sed5c0a7b7aa0078f9e7a2ed695'),

      // Section 4
      discRounded: new FormControl(0),
      taxableValue: new FormControl(25000.00),
      tradingNotes: new FormControl('-Select-')
    })
  });




  onExit(): void {
    console.log('Exit clicked');
  }

}
