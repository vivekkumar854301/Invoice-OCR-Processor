import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { InvoiceComponent } from './feature/page/invoice.page';
import { ThemeService, THEME_CONFIG } from '@clarium/ngce-components';
import { InvoiceSystemHeaderComponent } from './feature/component/invoice-system-header/invoice-system-header.component';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'IOP-root',
  imports: [RouterOutlet, InvoiceSystemHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Invoice-OCR-Processor';

  private themeService = inject(ThemeService);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);

  constructor() {
    this.themeService.setTypography({
      'font-family': 'ui-sans-serif, system-ui, sans-serif',
    });

    this.themeService.applyTheme('light-theme');
    this.themeService.setCustomProperties({});
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        const tree = this.router.parseUrl(event.urlAfterRedirects);
        if (tree.fragment) {
          this.viewportScroller.scrollToAnchor(tree.fragment);
        } else {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }
}
