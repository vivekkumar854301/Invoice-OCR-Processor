import { Component } from '@angular/core';
import {NgceComponentsModule} from '@clarium/ngce-components'
import {NgceIconModule} from '@clarium/ngce-icon'


@Component({
  selector: 'IOP-invoice-tab-form',
  imports: [NgceComponentsModule, NgceIconModule],
  templateUrl: './invoice-tab-form.component.html',
  styleUrl: './invoice-tab-form.component.scss'
})
export class InvoiceTabFormComponent {

}
