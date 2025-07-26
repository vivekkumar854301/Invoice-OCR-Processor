import { Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[iOPAutoFragment]',
  standalone: true,
})
export class AutoFragmentDirective {
  @Input() iOPAutoFragment!: string;

  private observer!: IntersectionObserver;
  private hasBeenVisible = false;
  private static currentFragment = '';

  constructor(
    @Inject(ElementRef) private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (
          isVisible &&
          AutoFragmentDirective.currentFragment !== this.iOPAutoFragment
        ) {
          AutoFragmentDirective.currentFragment = this.iOPAutoFragment;

          this.renderer.addClass(this.el.nativeElement, 'active-section');

          // Update URL fragment using history API (no router navigation)
          // history.replaceState(null, '', `#${this.iOPAutoFragment}`);
          const baseUrl =
            window.location.origin +
            window.location.pathname +
            window.location.search;
          console.log(window.location);

          history.replaceState(null, '', `${baseUrl}#${this.iOPAutoFragment}`);
        } else if (
          !isVisible &&
          AutoFragmentDirective.currentFragment === this.iOPAutoFragment
        ) {
          this.renderer.removeClass(this.el.nativeElement, 'active-section');
        }
      },
      {
        threshold: 0.6, // Adjust based on UX
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
