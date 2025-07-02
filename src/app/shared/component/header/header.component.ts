import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {NgceIconModule} from '@clarium/ngce-icon'

@Component({
  selector: 'IOP-header',
  imports: [NgceIconModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly data = input.required<string>();
  readonly title = computed(()=>this.data());

  readonly status = computed(() => {
    const value = this.title().toLowerCase();
    if (value.includes('supplier')) return 'high';
    if (value.includes('invoice')) return 'medium';
    if(value.includes('tax')) return 'high';
    return null;
  });
}
