import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponent } from './feature/page/invoice.page';
import {ThemeService, THEME_CONFIG} from '@clarium/ngce-components'

@Component({
  selector: 'IOP-root',
  imports: [RouterOutlet,InvoiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Invoice-OCR-Processor';
  private themeService = inject(ThemeService);

  constructor() {
    this.themeService.setTypography({
      'font-family': 'ui-sans-serif, system-ui, sans-serif',
    });

    this.themeService.applyTheme('light-theme');
    this.themeService.setCustomProperties({});
  }
}
