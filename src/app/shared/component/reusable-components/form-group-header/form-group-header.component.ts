import { Component, computed, effect, input, output } from '@angular/core';
import { NgceIconModule } from '@clarium/ngce-icon';
import { IFormHeader } from '../../../models/invoice.model';
@Component({
  selector: 'IOP-form-group-header',
  imports: [NgceIconModule],
  templateUrl: './form-group-header.component.html',
  styleUrl: './form-group-header.component.scss',
})
export class FormGroupHeaderComponent {
  header = input<IFormHeader>();
  isContentExpanded: boolean = true;
  isExpanded = output<boolean>();

  constructor() {
    effect(() => {
      this.isContentExpanded = this.header()!.isExpanded!;
    });
  }

  onToggleClicked() {
    if (this.header()) {
      this.isContentExpanded = !this.isContentExpanded;
      this.isExpanded.emit(this.isContentExpanded);
    }
  }
}
