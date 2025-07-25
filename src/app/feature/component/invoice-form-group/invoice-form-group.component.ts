import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from '../../model/invoice.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'IOP-invoice-form-group',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './invoice-form-group.component.html',
  styleUrl: './invoice-form-group.component.scss',
})
export class InvoiceFormGroupComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;
  @Input() fields: FieldConfig[] = [];
}
