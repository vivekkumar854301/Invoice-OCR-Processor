import { Component, effect, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig, IFormHeader } from '../../model/invoice.model';
import { CommonModule } from '@angular/common';
import { NgceIconModule } from '@clarium/ngce-icon';

import { NgceComponentsModule } from '@clarium/ngce-components';
import { SharedService } from '../../../shared/service/shared-service/shared.service';
import { FormGroupHeaderComponent } from '../form-group-header/form-group-header.component';

@Component({
  selector: 'IOP-invoice-form-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgceIconModule,
    NgceComponentsModule,
    FormGroupHeaderComponent,
  ],
  templateUrl: './invoice-form-group.component.html',
  styleUrl: './invoice-form-group.component.scss',
})
export class InvoiceFormGroupComponent {
  title = input<string>();
  formGroup = input<FormGroup>();
  fields = input<FieldConfig[]>();
  isExpansionNeeded = input<boolean>();

  formHeaderConfig!: IFormHeader;

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

  constructor() {
    effect(() => {
      if (this.title()) {
        this.formHeaderConfig = {
          title: this.title()!,
          isExpansionNeed: this.isExpansionNeeded()!,
          headerIcon: 'ngce-doc-text',
          isExpanded: this.isExpansionNeeded() ? true : false,
        };
      }
    });
  }

  onToggleClick(event: boolean) {
    this.isExpanded = event;
  }
}
