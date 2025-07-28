import { Component, EventEmitter, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgceComponentsModule } from '@clarium/ngce-components';

@Component({
  selector: 'IOP-invoice-system-header',
  imports: [RouterLink, NgceComponentsModule, FormsModule],
  templateUrl: './invoice-system-header.component.html',
  styleUrl: './invoice-system-header.component.scss',
})
export class InvoiceSystemHeaderComponent {
  isLayoutDropdownVisible = input<boolean>();
  private readonly router = inject(Router);
  layoutOption = output<string>();
  onUploadClick() {
    this.router.navigate(['upload']);
  }

  layoutOptions: string[] = ['Scroll View', 'Accordian View', 'Tab View'];
  option: string = this.layoutOptions[0];

  layoutOptionChanged(event: any) {
    this.layoutOption.emit(event);
    this.option = event;
  }
}
