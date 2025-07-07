import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, Output, EventEmitter, TemplateRef, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { GridConfig } from '../../models/shared.model';
import {NgceComponentsModule } from '@clarium/ngce-components'
import {NgceIconModule } from '@clarium/ngce-icon'

@Component({
  selector: 'IOP-grid',
  imports: [CommonModule, NgFor, NgIf, FormsModule, NgceComponentsModule, NgceIconModule, NgTemplateOutlet],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  @Input() config!: GridConfig; 
  focusedColumnKey: string | null = null;

  editingRow: any = null;
  editCopy: any = {};

  startEdit(row: any) {
    this.editingRow = row;
    this.editCopy = { ...row };
    // this.config.rowActions.edit(row);
  }

  saveEdit() {
    this.config.rowActions.save(this.editCopy);
    this.editingRow = null;
  }

  cancelEdit() {
    // this.config.rowActions.cancel();
    this.editingRow = null;
  }

  isEditing(row: any): boolean {
    return this.editingRow === row;
  }

  isColumnEditable(columnKey: string): boolean {
    const col = this.config.columns.find((c: { key: string; }) => c.key === columnKey);
    return !col?.disabled;
  }

  onCellDblClick(row:any, columnKey: string){
    this.focusedColumnKey = columnKey;
    this.startEdit(row);
  }

  @ViewChildren('inputElement') inputElements!: QueryList<ElementRef<HTMLInputElement>>;

ngAfterViewChecked() {
  if (this.focusedColumnKey && this.editingRow) {
    const inputToFocus = this.inputElements.find(
      (el) => el.nativeElement.getAttribute('data-col-key') === this.focusedColumnKey
    );

    if (inputToFocus) {
      inputToFocus.nativeElement.focus();
      this.focusedColumnKey = null; // Reset after focusing
    }
  }
}

}
