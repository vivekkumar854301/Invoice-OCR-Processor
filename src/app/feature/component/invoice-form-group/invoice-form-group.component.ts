import { Component, Input, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from '../../model/invoice.model';
import { CommonModule } from '@angular/common';
import { NgceIconModule } from '@clarium/ngce-icon';

import { NgceComponentsModule } from '@clarium/ngce-components';
import { SharedService } from '../../../shared/service/shared.service';

@Component({
  selector: 'IOP-invoice-form-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgceIconModule,
    NgceComponentsModule,
  ],
  templateUrl: './invoice-form-group.component.html',
  styleUrl: './invoice-form-group.component.scss',
})
export class InvoiceFormGroupComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;
  @Input() fields: FieldConfig[] = [];

  isExpanded!: boolean;

  private sharedService = inject(SharedService);
  onExpansionToggle() {
    this.sharedService.toggleCardExpansion(
      !this.sharedService.getIsExpandedState()
    );
    this.isExpanded = this.sharedService.getIsExpandedState();
  }

  ngOnInit() {
    this.isExpanded = this.sharedService.getIsExpandedState();
  }

  inputStyles = {
    width: 'auto',
    'font-size': '0.9rem',
  };
}
