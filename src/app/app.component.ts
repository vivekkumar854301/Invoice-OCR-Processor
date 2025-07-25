import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
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

  layoutOption(option: string) {
    this.sharedService.changeSelector(option);
  }

  isLayoutDropdownVisible!: boolean;

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        // Now `event` is properly typed as NavigationEnd

        // 1. Scroll to fragment if it exists
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          setTimeout(() => {
            const element = document.getElementById(fragment);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 50);
        }

        // 2. Set layout option visibility based on current route path
        const currentPath = event.urlAfterRedirects;
        this.isLayoutDropdownVisible = currentPath.includes('/invoice-details'); // adjust condition as needed
      });
  }
}
