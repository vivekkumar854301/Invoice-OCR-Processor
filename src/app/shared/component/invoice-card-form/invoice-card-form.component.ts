import { Component, input } from '@angular/core';
import { NgceComponentsModule, IFormConfig } from '@clarium/ngce-components';
import { NgceIconModule } from '@clarium/ngce-icon';
import { HeaderComponent } from '../../../shared/component/header/header.component';

@Component({
  selector: 'IOP-invoice-card-form',
  imports: [NgceComponentsModule,NgceIconModule,HeaderComponent],
  templateUrl: './invoice-card-form.component.html',
  styleUrl: './invoice-card-form.component.scss'
})
export class InvoiceCardFormComponent {
  title = input.required<string>();
  formConfig = input.required<IFormConfig>();
  
  invoiceDetails = {
    width: '100%',
    border: 'none',
    'margin-top': '2rem',
    padding: '1.5rem',
    'background-color':' #ffffff',
    'border-radius':'0.5rem',
    'box-shadow': '0 0 0 1px rgba(0, 0, 0, 0.1)',

  };


}
