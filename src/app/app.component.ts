import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { InvoiceComponent } from './feature/page/invoice.page';
import { ThemeService, THEME_CONFIG } from '@clarium/ngce-components';
import { InvoiceSystemHeaderComponent } from './feature/component/invoice-system-header/invoice-system-header.component';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';
import { SharedService } from './shared/service/shared.service';

@Component({
  selector: 'IOP-root',
  imports: [RouterOutlet, InvoiceSystemHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Invoice-OCR-Processor';
  private readonly sharedService = inject(SharedService);

  private themeService = inject(ThemeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private viewportScroller = inject(ViewportScroller);

  constructor() {
    this.themeService.setTypography({
      'font-family': 'ui-sans-serif, system-ui, sans-serif',
    });

    this.themeService.applyTheme('light-theme');
    this.themeService.setCustomProperties({});
  }

  layoutOption(option: string){
    this.sharedService.changeSelector(option);
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          // Wait for the DOM to update/render
          setTimeout(() => {
            const element = document.getElementById(fragment);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 50);
        }
      });
  }
}
